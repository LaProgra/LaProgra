export const activityStyles = {
  duty: { light: "bg-blue-50 border-blue-200 text-blue-900", dark: "bg-blue-950/70 border-blue-800 text-blue-100", dot: "bg-blue-500" },
  rest: { light: "bg-emerald-50 border-emerald-200 text-emerald-900", dark: "bg-emerald-950/70 border-emerald-800 text-emerald-100", dot: "bg-emerald-500" },
  training: { light: "bg-violet-50 border-violet-200 text-violet-900", dark: "bg-violet-950/70 border-violet-800 text-violet-100", dot: "bg-violet-500" },
  reserve: { light: "bg-amber-50 border-amber-200 text-amber-900", dark: "bg-amber-950/70 border-amber-800 text-amber-100", dot: "bg-amber-500" },
};

export const demoSchedule = {
  1: [{ label: "S5", desc: "ALUMNO", time: "07:30–15:10", type: "training" }],
  2: [{ label: "S5", desc: "ALUMNO", time: "07:30–15:10", type: "training" }],
  4: [{ label: "X", desc: "DÍA LIBRE", time: "00:00–23:59", type: "rest" }],
  5: [{ label: "X", desc: "DÍA LIBRE", time: "00:00–23:59", type: "rest" }],
  7: [{ label: "T5", desc: "ALUMNO", time: "12:40–19:55", type: "training" }],
  9: [{ label: "RES", desc: "RESERVA", time: "06:00–14:00", type: "reserve" }],
  10: [{ label: "S5", desc: "ALUMNO", time: "07:30–15:10", type: "training" }],
  12: [{ label: "X", desc: "DÍA LIBRE", time: "00:00–23:59", type: "rest" }],
  13: [{ label: "X", desc: "DÍA LIBRE", time: "00:00–23:59", type: "rest" }],
  15: [{ label: "S5", desc: "ALUMNO", time: "07:30–15:10", type: "training" }, { label: "REF", desc: "REFRESCO", time: "17:00–18:30", type: "duty" }],
  17: [{ label: "RES", desc: "RESERVA", time: "14:00–22:00", type: "reserve" }],
  19: [{ label: "T5", desc: "ALUMNO", time: "12:40–19:55", type: "training" }],
  21: [{ label: "X", desc: "DÍA LIBRE", time: "00:00–23:59", type: "rest" }],
  22: [{ label: "X", desc: "DÍA LIBRE", time: "00:00–23:59", type: "rest" }],
  24: [{ label: "S5", desc: "ALUMNO", time: "07:30–15:10", type: "training" }],
  26: [{ label: "T5", desc: "ALUMNO", time: "12:40–19:55", type: "training" }],
  28: [{ label: "RES", desc: "RESERVA", time: "06:00–14:00", type: "reserve" }],
  30: [{ label: "X", desc: "DÍA LIBRE", time: "00:00–23:59", type: "rest" }],
};
