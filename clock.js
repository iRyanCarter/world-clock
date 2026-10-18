// Pure helpers (shared by the browser and Node tests).
(function (root) {
  function formatTime(date, timeZone, hour12) {
    return new Intl.DateTimeFormat("en-US", {
      timeZone, hour: "2-digit", minute: "2-digit", second: "2-digit", hour12: !!hour12,
    }).format(date);
  }
  function formatDate(date, timeZone) {
    return new Intl.DateTimeFormat("en-US", { timeZone, weekday: "short", month: "short", day: "numeric" }).format(date);
  }
  // Offset of timeZone from UTC, in minutes, at the given instant.
  function utcOffsetMinutes(date, timeZone) {
    const p = Object.fromEntries(new Intl.DateTimeFormat("en-US", {
      timeZone, hourCycle: "h23", year: "numeric", month: "2-digit", day: "2-digit",
      hour: "2-digit", minute: "2-digit", second: "2-digit",
    }).formatToParts(date).map((x) => [x.type, x.value]));
    const asUtc = Date.UTC(+p.year, +p.month - 1, +p.day, +p.hour, +p.minute, +p.second);
    return Math.round((asUtc - Math.floor(date.getTime() / 1000) * 1000) / 60000);
  }
  function formatOffset(min) {
    const s = min < 0 ? "-" : "+", a = Math.abs(min);
    return `UTC${s}${Math.floor(a / 60)}${a % 60 ? ":" + String(a % 60).padStart(2, "0") : ""}`;
  }
  function isValidZone(tz) {
    try { new Intl.DateTimeFormat("en-US", { timeZone: tz }); return true; } catch { return false; }
  }
  const api = { formatTime, formatDate, utcOffsetMinutes, formatOffset, isValidZone };
  if (typeof module !== "undefined") module.exports = api; else root.Clock = api;
})(this);
