import * as pdfjs from 'pdfjs-dist';
import workerUrl from 'pdfjs-dist/build/pdf.worker.min.mjs?url';
import { getAirportCity } from '../lib/airports';

pdfjs.GlobalWorkerOptions.workerSrc = workerUrl;

const VERSION = '6.0-flight-other';
const MONTHS = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
];
const TIME = /^[SA]?(\d{2}):(\d{2})$/;
const SIMULATOR_TIME = /^[BD](\d{2}:\d{2})$/;
const FLIGHT = /^\d{3,4}$/;
const AIRPORT = /^\*?[A-Z]{3,4}$/;
const AIRCRAFT = /^\(([^)]+)\)$/;
const clean = (s) => s.replace(/\s+/g, ' ').trim();
const iso = (y, m, d) =>
  `${y}-${String(m + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}`;
const minutes = (s) => {
  const m = s?.match(TIME);
  return m ? +m[1] * 60 + +m[2] : null;
};

const stripTimePrefix = (v) => v.replace(/^[SABD]/, '');
const timeKind = (v) =>
  v.startsWith('S') ? 'scheduled' : v.startsWith('A') ? 'actual' : 'plain';
function mergeSemanticTokens(tokens) {
  const out = [];
  for (let i = 0; i < tokens.length; i++) {
    const t = tokens[i];
    if (t.startsWith('(') && !t.endsWith(')')) {
      const p = [t];
      while (i + 1 < tokens.length && !p.at(-1).endsWith(')'))
        p.push(tokens[++i]);
      out.push(p.join(' '));
    } else out.push(t);
  }
  return out;
}
function normalizeText(content) {
  return content.items
    .filter((v) => 'str' in v && Boolean(clean(v.str)))
    .flatMap((item) => {
      const source = item.str;
      const parts = [...source.matchAll(/\S+/g)];
      const height = item.height || Math.abs(item.transform[3]) || 0;
      if (parts.length <= 1 || !item.width)
        return [
          {
            text: clean(source),
            x: item.transform[4],
            y: item.transform[5],
            width: item.width || 0,
            height,
          },
        ];
      return parts.map((part) => {
        const start = part.index ?? 0;
        return {
          text: part[0],
          x: item.transform[4] + item.width * (start / source.length),
          y: item.transform[5],
          width: item.width * (part[0].length / source.length),
          height,
        };
      });
    });
}

function metadata(items) {
  const text = [...items]
    .sort((a, b) => b.y - a.y || a.x - b.x)
    .map((v) => v.text)
    .join(' ')
    .replace(/[\u00a0\u202f]+/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
  const periodPattern =
    /\bFROM\s+(\d{1,2})\/(\d{1,2})\/(\d{4})\s+TO\s+(\d{1,2})\/(\d{1,2})\/(\d{4})\b/i;
  const rawText = items.map((v) => v.text).join(' ').replace(/\s+/g, ' ');
  const r = text.match(periodPattern) || rawText.match(periodPattern);
  const c = text.match(
    /NAME\s*:\s*([A-ZÁÉÍÓÚÜÑ ]+?)\s+ID\s*:\s*(\d+)\s*\(([^)]+)\)/i
  );
  if (!r) throw new Error('No se encontró el periodo FROM/TO');
  return {
    year: +r[3],
    month: +r[1] - 1,
    from: `${r[3]}-${String(r[1]).padStart(2, '0')}-${String(r[2]).padStart(2, '0')}`,
    to: `${r[6]}-${String(r[4]).padStart(2, '0')}-${String(r[5]).padStart(2, '0')}`,
    crew: c ? { name: clean(c[1]), id: c[2], baseAndRole: clean(c[3]) } : null,
  };
}

function columns(items, month, pageWidth) {
  const rx = new RegExp(`^${MONTHS[month]}(\\d{2})$`, `i`);
  const h = items
    .map((v) => ({ v, m: v.text.match(rx) }))
    .filter((x) => x.m)
    .map((x) => ({ day: +x.m[1], center: x.v.x + x.v.width / 2, y: x.v.y }))
    .sort((a, b) => a.center - b.center);
  if (h.length < 28)
    throw new Error(`Solo se detectaron ${h.length} cabeceras de día`);
  return h.map((v, i) => ({
    ...v,
    left: i
      ? (h[i - 1].center + v.center) / 2
      : Math.max(0, v.center - (h[1].center - v.center) / 2),
    right:
      i < h.length - 1
        ? (v.center + h[i + 1].center) / 2
        : Math.min(pageWidth, v.center + (v.center - h[i - 1].center) / 2),
  }));
}

async function detectBoxes(
  page,
  cols,
  headerY
) {
  const scale = 3,
    viewport = page.getViewport({ scale }),
    canvas = document.createElement('canvas');
  canvas.width = Math.ceil(viewport.width);
  canvas.height = Math.ceil(viewport.height);
  const ctx = canvas.getContext('2d', { willReadFrequently: true });
  if (!ctx) throw new Error('Canvas no disponible');
  await page.render({ canvasContext: ctx, viewport }).promise;
  const image = ctx.getImageData(0, 0, canvas.width, canvas.height),
    { data, width, height } = image;
  const dark = (x, y) => {
    if (x < 0 || y < 0 || x >= width || y >= height) return false;
    const i = (Math.floor(y) * width + Math.floor(x)) * 4;
    return data[i] + data[i + 1] + data[i + 2] < 390 && data[i + 3] > 100;
  };
  const raw = [];
  const cw = cols.reduce((s, c) => s + c.right - c.left, 0) / cols.length,
    min = cw * scale * 0.55,
    max = cw * scale * 1.5,
    startY = Math.max(0, Math.floor(height - headerY * scale));
  for (let y = startY; y < height; y++) {
    let start = -1;
    for (let x = 0; x <= width; x++) {
      const on = x < width && dark(x, y);
      if (on && start < 0) start = x;
      if ((!on || x === width) && start >= 0) {
        const end = x - 1,
          len = end - start + 1;
        if (len >= min && len <= max) raw.push({ x0: start, x1: end, y });
        start = -1;
      }
    }
  }
  const lines = [];
  for (const line of raw) {
    const found = [...lines]
      .reverse()
      .find(
        (v) =>
          Math.abs(line.y - v.y) <= 2 &&
          Math.abs(line.x0 - v.x0) <= 4 &&
          Math.abs(line.x1 - v.x1) <= 4
      );
    if (found) {
      found.x0 = Math.round((found.x0 + line.x0) / 2);
      found.x1 = Math.round((found.x1 + line.x1) / 2);
      found.y = Math.round((found.y + line.y) / 2);
    } else lines.push({ ...line });
  }
  lines.sort((a, b) => a.y - b.y || a.x0 - b.x0);
  const hit = (x, y) =>
    dark(x - 2, y) ||
    dark(x - 1, y) ||
    dark(x, y) ||
    dark(x + 1, y) ||
    dark(x + 2, y);
  const coverage = (x, a, b) => {
    if (b < a) return 0;
    let count = 0;
    for (let y = a; y <= b; y++) if (hit(x, y)) count++;
    return count / (b - a + 1);
  };
  const boxes = [],
    xTol = Math.max(5, cw * scale * 0.08);
  for (let i = 0; i < lines.length; i++) {
    const top = lines[i];
    // Only the first valid lower edge is allowed. This prevents nested combinations.
    for (let j = i + 1; j < lines.length; j++) {
      const bottom = lines[j],
        boxHeight = bottom.y - top.y;
      if (boxHeight < 18) continue;
      if (boxHeight > height * 0.75) break;
      if (
        Math.abs(top.x0 - bottom.x0) > xTol ||
        Math.abs(top.x1 - bottom.x1) > xTol
      )
        continue;
      const x0 = Math.round((top.x0 + bottom.x0) / 2),
        x1 = Math.round((top.x1 + bottom.x1) / 2),
        probe = Math.min(10, Math.max(3, Math.floor(boxHeight / 5)));
      const local = Math.min(
        coverage(x0, top.y + 2, top.y + probe),
        coverage(x1, top.y + 2, top.y + probe),
        coverage(x0, bottom.y - probe, bottom.y - 2),
        coverage(x1, bottom.y - probe, bottom.y - 2)
      );
      if (
        local < 0.8 ||
        coverage(x0, top.y, bottom.y) < 0.72 ||
        coverage(x1, top.y, bottom.y) < 0.72
      )
        continue;
      const box = {
        id: `box-${boxes.length + 1}`,
        left: x0 / scale,
        right: x1 / scale,
        bottom: (height - bottom.y) / scale,
        top: (height - top.y) / scale,
      };
      if (
        !boxes.some(
          (v) =>
            Math.abs(v.left - box.left) < 2 &&
            Math.abs(v.right - box.right) < 2 &&
            Math.abs(v.bottom - box.bottom) < 2 &&
            Math.abs(v.top - box.top) < 2
        )
      )
        boxes.push(box);
      break;
    }
  }
  canvas.width = canvas.height = 1;
  return boxes.sort((a, b) => b.top - a.top || a.left - b.left);
}

const center = (v) => ({
  x: v.x + v.width / 2,
  y: v.y + v.height / 2,
});
function assign(items, boxes) {
  const map = new Map(boxes.map((b) => [b.id, []]));
  for (const item of items) {
    const p = center(item),
      candidate = boxes
        .filter(
          (b) =>
            p.x >= b.left - 1.25 &&
            p.x <= b.right + 1.25 &&
            p.y >= b.bottom - 1.25 &&
            p.y <= b.top + 1.25
        )
        .sort(
          (a, b) =>
            (a.right - a.left) * (a.top - a.bottom) -
            (b.right - b.left) * (b.top - b.bottom)
        )[0];
    if (candidate) map.get(candidate.id).push(item);
  }
  return map;
}
function lines(items) {
  const out = [];
  for (const item of [...items].sort((a, b) => b.y - a.y || a.x - b.x)) {
    let row = out.find((v) => Math.abs(v.y - item.y) <= 3.5);
    if (!row) {
      row = { y: item.y, items: [] };
      out.push(row);
    }
    row.items.push(item);
  }
  return out
    .sort((a, b) => b.y - a.y)
    .map((v) => v.items.sort((a, b) => a.x - b.x).map((x) => x.text));
}

function parseFlight(tokens, allowPartial = false) {
  const flightIndex = tokens.findIndex((token) => FLIGHT.test(token));
  if (flightIndex === -1) return null;
  tokens = tokens.slice(flightIndex);
  let i = 1,
    reportTime = null;
  if (TIME.test(tokens[i] || '') && TIME.test(tokens[i + 1] || ''))
    reportTime = stripTimePrefix(tokens[i++]);
  if (!TIME.test(tokens[i] || '')) return null;
  const rawDeparture = tokens[i++];
  if (!AIRPORT.test(tokens[i] || '')) return null;
  const rawOrigin = tokens[i++];
  let rawDestination = '';
  if (AIRPORT.test(tokens[i] || '')) rawDestination = tokens[i++];
  let rawArrival = '';
  if (TIME.test(tokens[i] || '')) rawArrival = tokens[i++];
  let aircraft = null;
  if (AIRCRAFT.test(tokens[i] || ''))
    aircraft = tokens[i++].match(AIRCRAFT)[1];
  if (!allowPartial && (!rawDestination || !rawArrival)) return null;
  if (i !== tokens.length) return null;
  const departureTime = stripTimePrefix(rawDeparture),
    arrivalTime = stripTimePrefix(rawArrival),
    dep = minutes(departureTime),
    arr = minutes(arrivalTime);
  return {
    type: 'flight',
    flightNumber: tokens[0],
    reportTime,
    departureTime,
    departureTimeKind: timeKind(rawDeparture),
    origin: rawOrigin.replace(/^\*/, ''),
    destination: rawDestination.replace(/^\*/, ''),
    arrivalTime,
    arrivalTimeKind: rawArrival ? timeKind(rawArrival) : 'plain',
    aircraft,
    positioned: rawOrigin.startsWith('*') || rawDestination.startsWith('*'),
    arrivalDayOffset: dep != null && arr != null && arr < dep ? 1 : 0,
  };
}
function parseOther(tokens) {
  if (!tokens.length) return null;
  if (tokens[0].toUpperCase() === 'TAXI') {
    const values = tokens.slice(1),
      times = values.filter((t) => TIME.test(t)),
      airports = values.filter((t) => AIRPORT.test(t));
    if (times.length >= 3 && airports.length >= 2) {
      const startTime = stripTimePrefix(times[1]),
        endTime = stripTimePrefix(times.at(-1)),
        startMinutes = minutes(startTime),
        endMinutes = minutes(endTime);
      return {
        type: 'other',
        code: 'TAXI',
        reportTime: stripTimePrefix(times[0]),
        startTime,
        endTime,
        endDayOffset: startMinutes != null && endMinutes != null && endMinutes < startMinutes ? 1 : 0,
        origin: airports[0].replace(/^\*/, ''),
        destination: airports[1].replace(/^\*/, ''),
        positioned: true,
        details: [],
      };
    }
  }
  const values = tokens.slice(1),
    simulatorTimes = values.filter((t) => SIMULATOR_TIME.test(t)),
    isSimulator = simulatorTimes.some((t) => t.startsWith('B')) &&
      simulatorTimes.some((t) => t.startsWith('D')),
    times = values.filter((t) => TIME.test(t) || SIMULATOR_TIME.test(t)),
    startTime = isSimulator
      ? simulatorTimes.find((t) => t.startsWith('B')).slice(1)
      : times[0]
        ? stripTimePrefix(times[0])
        : undefined,
    endTime = isSimulator
      ? times.at(-1).replace(/^[SABD]/, '')
      : times[1]
        ? stripTimePrefix(times[1])
        : undefined,
    a = startTime ? minutes(startTime) : null,
    b = endTime ? minutes(endTime) : null;
  return {
    type: 'other',
    code: tokens[0],
    startTime,
    endTime,
    endDayOffset: a != null && b != null && b < a ? 1 : 0,
    details: values.filter((t) => !TIME.test(t) && !SIMULATOR_TIME.test(t)),
  };
}
function parseEvent(items, box) {
  const rows = lines(items),
    all = mergeSemanticTokens(
      rows.flat().filter((v) => !/^(Mon|Tue|Wed|Thu|Fri|Sat|Sun)$/i.test(v))
    ),
    starts = all.includes('→'),
    ends = all.includes('↓'),
    tokens = all.filter((v) => v !== '→' && v !== '↓'),
    activity = parseFlight(tokens, starts) ?? parseOther(tokens);
  return {
    box,
    activities: activity ? [activity] : [],
    unknown: [],
    rawLines: rows.map((r) => r.join(' ')),
    continuation: starts ? 'starts' : ends ? 'ends' : 'none',
    continuesNextDay: starts,
  };
}
function mergeCrossDayContinuations(days) {
  for (let n = 0; n < days.length - 1; n++) {
    const from = days[n],
      to = days[n + 1],
      source = from.events.findLast((e) => e.continuation === 'starts'),
      target = to.events.find((e) => e.continuation === 'ends');
    if (!source || !target) continue;
    const id = `continuation-${from.date}-${source.box?.id ?? 'event'}`;
    source.continuationEventId = id;
    target.continuationEventId = id;
    target.continuedFromDate = from.date;
    target.continuedFromEventId = source.box?.id;
    const a = source.activities.at(-1),
      t = mergeSemanticTokens(
        target.rawLines.flatMap((x) => x.split(/\s+/))
      ).filter((x) => x && x !== '↓');
    if (a?.type === 'other') {
      const end = t.find((x) => TIME.test(x));
      if (end) {
        a.endTime = stripTimePrefix(end);
        const x = a.startTime ? minutes(a.startTime) : null,
          y = minutes(a.endTime);
        a.endDayOffset = x != null && y != null && y < x ? 1 : 0;
      }
    } else if (a?.type === 'flight') {
      let i = 0;
      if (AIRPORT.test(t[i] || '')) a.destination = t[i++].replace(/^\*/, '');
      if (TIME.test(t[i] || '')) {
        const raw = t[i++];
        a.arrivalTime = stripTimePrefix(raw);
        a.arrivalTimeKind = timeKind(raw);
      }
      if (AIRCRAFT.test(t[i] || '')) a.aircraft = t[i].match(AIRCRAFT)[1];
      const x = minutes(a.departureTime),
        y = minutes(a.arrivalTime);
      a.arrivalDayOffset = x != null && y != null && y < x ? 1 : 0;
    }
    target.activities = [];
    target.unknown = [];
  }
  for (const d of days) {
    d.activities = d.events.flatMap((e) => e.activities);
    d.unknown = [];
  }
}
async function extractCrewSchedulePdf(file) {
  const pdf = await pdfjs.getDocument({
      data: new Uint8Array(await file.arrayBuffer()),
    }).promise,
    days = [],
    diagnostics = [];
  let meta = null,
    total = 0;
  for (let n = 1; n <= pdf.numPages; n++) {
    const page = await pdf.getPage(n),
      viewport = page.getViewport({ scale: 1 }),
      items = normalizeText(await page.getTextContent());
    meta ??= metadata(items);
    const cols = columns(items, meta.month, viewport.width),
      headerY = Math.min(...cols.map((c) => c.y));
    let boxes = [];
    try {
      boxes = await detectBoxes(page, cols, headerY);
    } catch (e) {
      diagnostics.push(`Página ${n}: ${String(e)}`);
    }
    total += boxes.length;
    const assigned = assign(items, boxes);
    for (const col of cols) {
      const dayBoxes = boxes
        .filter((b) => {
          const x = (b.left + b.right) / 2;
          return x >= col.left && x < col.right;
        })
        .sort((a, b) => b.top - a.top);
      let mode = 'rectangles',
        events = dayBoxes
          .map((b) => parseEvent(assigned.get(b.id) ?? [], b))
          .filter((e) => e.activities.length || e.unknown.length);
      // Page-wide fallback only. Never reread one empty day if boxes exist elsewhere.
      if (!boxes.length) {
        mode = 'page-fallback';
        const fallback = items.filter((v) => {
          const p = center(v);
          return p.x >= col.left && p.x < col.right && p.y < headerY - 2;
        });
        const e = parseEvent(fallback, null);
        events = e.activities.length || e.unknown.length ? [e] : [];
      }
      days.push({
        date: iso(meta.year, meta.month, col.day),
        extractionMode: mode,
        events,
        activities: events.flatMap((e) => e.activities),
        unknown: events.flatMap((e) => e.unknown),
      });
    }
    diagnostics.push(
      `Página ${n}: ${boxes.length} rectángulos elementales detectados.`
    );
  }
  if (!meta) throw new Error('PDF vacío');
  mergeCrossDayContinuations(days);
  const all = days.flatMap((d) => d.activities);
  return {
    parserVersion: VERSION,
    sourceFile: file.name,
    ...meta,
    summary: {
      days: days.length,
      eventBoxes: total,
      duties: days.filter((d) => d.activities.some((a) => a.type === 'flight'))
        .length,
      flights: all.filter((a) => a.type === 'flight').length,
      unknownTokens: days.reduce((s, d) => s + d.unknown.length, 0),
      fallbackDays: days.filter((d) => d.extractionMode === 'page-fallback')
        .length,
    },
    diagnostics,
    days,
  };
}

function parseIsoDate(value) {
  const [year, month, day] = value.split('-').map(Number);
  return { year, month, day };
}
function utcInstant(date, time, dayOffset = 0) {
  const match = time.match(/^(\d{2}):(\d{2})$/);
  if (!match) return null;
  return new Date(Date.UTC(date.year, date.month - 1, date.day + dayOffset, Number(match[1]), Number(match[2]))).toISOString();
}
function classifyOther(code) {
  const value = code.toUpperCase();
  if (/^(?:OFF|AOFF|SROF|XSOF|NROF|ZPER|FR|VAC|PAT)/.test(value)) return 'rest';
  if (/(?:SBY|RES|RVA|IMAG)/.test(value)) return 'reserve';
  if (/^(?:LM|TRN|SIM|LPC|OPC|REU|VICC|EVAL|SBT)/.test(value)) return 'training';
  return 'duty';
}

export function mergeConsecutiveOtherActivities(activities) {
  const merged = [];
  for (const activity of activities) {
    const previous = merged.at(-1);
    if (
      previous?.type === 'other' &&
      activity.type === 'other' &&
      previous.code === activity.code
    ) {
      const details = [...previous.details, ...activity.details].filter(
        (detail, index, values) => values.indexOf(detail) === index,
      );
      previous.endTime = activity.endTime ?? previous.endTime;
      previous.endDayOffset = activity.endDayOffset ?? previous.endDayOffset;
      previous.details = details;
      continue;
    }
    merged.push({
      ...activity,
      details: activity.type === 'other' ? [...activity.details] : activity.details,
    });
  }
  return merged;
}

function toImportedEvent(activity, date) {
  if (activity.type === 'flight') {
    const origin = activity.origin.toUpperCase(), destination = activity.destination.toUpperCase();
    return {
      day: date.day, month: date.month, year: date.year,
      label: `${origin}-${destination}`,
      desc: `${getAirportCity(origin) || origin} - ${getAirportCity(destination) || destination}`,
      flightNumber: activity.flightNumber,
      situated: activity.positioned,
      firmaAt: activity.reportTime ? utcInstant(date, activity.reportTime) : null,
      startsAt: utcInstant(date, activity.departureTime),
      endsAt: utcInstant(date, activity.arrivalTime, activity.arrivalDayOffset),
      isAllDay: false,
      type: 'duty',
    };
  }
  if (activity.code === 'TAXI' && activity.origin && activity.destination) {
    const origin = activity.origin.toUpperCase(), destination = activity.destination.toUpperCase();
    return {
      day: date.day, month: date.month, year: date.year,
      label: `${origin}-${destination}`,
      desc: `${getAirportCity(origin) || origin} - ${getAirportCity(destination) || destination}`,
      flightNumber: 'TAXI', situated: true,
      firmaAt: activity.reportTime ? utcInstant(date, activity.reportTime) : null,
      startsAt: activity.startTime ? utcInstant(date, activity.startTime) : null,
      endsAt: activity.endTime ? utcInstant(date, activity.endTime, activity.endDayOffset || 0) : null,
      isAllDay: false,
      type: 'duty',
    };
  }
  const hasTimes = Boolean(activity.startTime || activity.endTime);
  return {
    day: date.day, month: date.month, year: date.year,
    label: (activity.code || 'ACT').slice(0, 8).toUpperCase(),
    desc: [activity.code, ...activity.details].filter(Boolean).join(' '),
    flightNumber: '', situated: false, firmaAt: null,
    startsAt: activity.startTime ? utcInstant(date, activity.startTime) : null,
    endsAt: activity.endTime ? utcInstant(date, activity.endTime, activity.endDayOffset || 0) : null,
    isAllDay: !hasTimes,
    type: classifyOther(activity.code),
  };
}
export async function extractCrewSchedule(file) {
  const extracted = await extractCrewSchedulePdf(file);
  const events = {};
  for (const day of extracted.days) {
    const date = parseIsoDate(day.date);
    const activities = mergeConsecutiveOtherActivities(day.activities);
    const imported = activities.map((activity) => toImportedEvent(activity, date));
    if (imported.length) events[date.day] = imported;
  }
  return { events, period: { month: extracted.month + 1, year: extracted.year } };
}

