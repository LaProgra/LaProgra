import { jsPDF } from "jspdf";
import { getAirportCity } from "./airports";
import { formatEventTimeRange, getEventDayIndicator } from "./timeZone";

const MONTHS = [
  "enero",
  "febrero",
  "marzo",
  "abril",
  "mayo",
  "junio",
  "julio",
  "agosto",
  "septiembre",
  "octubre",
  "noviembre",
  "diciembre",
];

function cleanFilePart(value) {
  return (
    String(value || "usuario")
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^a-z0-9_-]+/gi, "_")
      .replace(/^_|_$/g, "") || "usuario"
  );
}

function isFlight(event) {
  return (
    Boolean(event.flightNumber) ||
    /^[A-Z]{3}-[A-Z]{3}\b/.test(event.label || "")
  );
}

function flightCodes(event) {
  const match = String(event.label || "").match(/\b([A-Z]{3})-([A-Z]{3})\b/);
  return match ? match.slice(1) : [];
}

function eventText(event, timeZone) {
  const label = event.situated
    ? `[${event.label}]`
    : event.label || event.desc || "Evento";
  const time =
    event.startsAt || event.time ? formatEventTimeRange(event, timeZone) : "";
  const indicator = getEventDayIndicator(event, timeZone);
  return `${label}${time && time !== "Todo el día" ? ` ${time}` : ""}${indicator ? ` ${indicator}` : ""}`;
}

export function downloadCalendarPdf({
  username,
  month,
  year,
  timeZone,
  monthDays,
  eventsByVisibleDay,
  includeManualEventsInPdf = true,
}) {
  const pdf = new jsPDF({ orientation: "landscape", unit: "mm", format: "a4" });
  const pageWidth = 297;
  const pageHeight = 210;
  const margin = 9;
  const titleY = 13;
  const gridTop = 25;
  const footerHeight = 20;
  const headerHeight = 7;
  const gridHeight = pageHeight - gridTop - footerHeight - 4;
  const rows = monthDays.length / 7;
  const cellWidth = (pageWidth - margin * 2) / 7;
  const cellHeight = (gridHeight - headerHeight) / rows;
  const monthLabel = `${MONTHS[month - 1]} ${year}`;
  const filtered = eventsByVisibleDay || {};
  const eventList = (date) =>
    (filtered[`${date.year}-${date.month}-${date.day}`] || []).filter(
      (event) => includeManualEventsInPdf || event.source !== "manual",
    );

  pdf.setTextColor(0, 0, 0);
  pdf.setFont("helvetica", "bold");
  pdf.setFontSize(12);
  pdf.text(`${monthLabel} - ${username || "usuario"}`, margin, titleY);
  pdf.setFont("helvetica", "normal");
  pdf.setFontSize(7);
  pdf.text(timeZone || "UTC", pageWidth - margin, titleY, { align: "right" });

  const weekdays = ["Lun", "Mar", "Mié", "Jue", "Vie", "Sáb", "Dom"];
  pdf.setDrawColor(0);
  pdf.setLineWidth(0.25);
  pdf.rect(margin, gridTop, pageWidth - margin * 2, gridHeight);
  weekdays.forEach((day, index) => {
    const x = margin + index * cellWidth;
    pdf.line(x, gridTop, x, gridTop + gridHeight);
    pdf.setFont("helvetica", "bold");
    pdf.setFontSize(7);
    pdf.text(day, x + cellWidth / 2, gridTop + 4.8, { align: "center" });
  });
  pdf.line(
    pageWidth - margin,
    gridTop,
    pageWidth - margin,
    gridTop + gridHeight,
  );
  pdf.line(
    margin,
    gridTop + headerHeight,
    pageWidth - margin,
    gridTop + headerHeight,
  );

  monthDays.forEach((date, index) => {
    const column = index % 7;
    const row = Math.floor(index / 7);
    const x = margin + column * cellWidth;
    const y = gridTop + headerHeight + row * cellHeight;
    if (column === 0) pdf.line(margin, y, pageWidth - margin, y);
    if (row === rows - 1)
      pdf.line(margin, y + cellHeight, pageWidth - margin, y + cellHeight);
    const events = eventList(date);
    pdf.setFont("helvetica", "bold");
    pdf.setFontSize(6.5);
    pdf.text(String(date.day), x + 2, y + 4.5);
    const lineHeight = 3.25;
    const maxLines = Math.max(0, Math.floor((cellHeight - 7) / lineHeight));
    const shown = events.slice(0, maxLines);
    pdf.setFont("helvetica", "normal");
    pdf.setFontSize(5.6);
    shown.forEach((event, eventIndex) => {
      const text = pdf.splitTextToSize(
        eventText(event, timeZone),
        cellWidth - 3.5,
      )[0];
      pdf.text(text, x + 2, y + 8 + eventIndex * lineHeight);
    });
    if (events.length > shown.length) {
      pdf.setFont("helvetica", "bold");
      pdf.text(
        `+ ${events.length - shown.length} ocultos`,
        x + 2,
        y + 8 + shown.length * lineHeight,
      );
    }
  });

  const airports = new Map();
  const descriptions = new Map();
  monthDays.flatMap((date) => eventList(date)).forEach((event) => {
      if (isFlight(event))
        flightCodes(event).forEach((iata) =>
          airports.set(iata, getAirportCity(iata) || iata),
        );
      else if (event.desc?.trim()) {
        const slab = event.situated
          ? `[${event.label}]`
          : event.label || "Evento";
        descriptions.set(`${slab} - ${event.desc.trim()}`, true);
      }
    });
  const legend = [...airports]
    .map(([iata, city]) => `${iata} - ${city}`)
    .concat([...descriptions.keys()]);
  if (legend.length) {
    const legendTop = pageHeight - footerHeight + 2;
    const legendRows = 3;
    const columns = Math.ceil(legend.length / legendRows);
    const legendWidth = pageWidth - margin * 2;
    const columnWidth = legendWidth / columns;
    const rowHeight = 5.2;
    pdf.setFont("helvetica", "normal");
    pdf.setFontSize(5.2);
    legend.forEach((item, index) => {
      const column = Math.floor(index / legendRows);
      const row = index % legendRows;
      const lines = pdf.splitTextToSize(item, columnWidth - 2);
      pdf.text(
        lines[0],
        margin + column * columnWidth,
        legendTop + row * rowHeight,
      );
    });
  }
  pdf.setFont("helvetica", "italic");
  pdf.setFontSize(5.5);
  pdf.text("Generado por laprogra.app", 4, pageHeight / 2,{ angle: 90 });
  pdf.save(
    `${cleanFilePart(username)}_${cleanFilePart(MONTHS[month - 1])}.pdf`,
  );
}
