export function getEventRoute(event) {
  const value = String(event?.label || "").toUpperCase().replace(/\s/g, "");
  return /^[A-Z]{3}-[A-Z]{3}$/.test(value) ? value : null;
}

export function isProgrammedActivity(event) {
  const text = `${event?.label || ""} ${event?.desc || event?.description || ""}`.toUpperCase();
  return Boolean(
    event?.flightNumber ||
      getEventRoute(event) ||
      event?.type === "training" ||
      event?.type === "reserve" ||
      /\b(?:SIM|SIMULADOR|LPC|OPC|IMAG|IMAGINARIA)\b/.test(text),
  );
}
