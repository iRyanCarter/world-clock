const test = require("node:test");
const assert = require("node:assert");
const C = require("../clock.js");
const t = new Date("2026-01-15T12:00:00Z");
test("Taipei is UTC+8", () => assert.strictEqual(C.utcOffsetMinutes(t, "Asia/Taipei"), 480));
test("DST handled for New York", () => {
  assert.strictEqual(C.utcOffsetMinutes(t, "America/New_York"), -300);
  assert.strictEqual(C.utcOffsetMinutes(new Date("2026-07-15T12:00:00Z"), "America/New_York"), -240);
});
test("half-hour offsets", () => assert.strictEqual(C.formatOffset(C.utcOffsetMinutes(t, "Asia/Kolkata")), "UTC+5:30"));
test("formatOffset", () => { assert.strictEqual(C.formatOffset(480), "UTC+8"); assert.strictEqual(C.formatOffset(-300), "UTC-5"); assert.strictEqual(C.formatOffset(0), "UTC+0"); });
test("formatTime 24h", () => assert.strictEqual(C.formatTime(t, "Asia/Taipei", false), "20:00:00"));
test("formatDate", () => assert.strictEqual(C.formatDate(t, "Asia/Taipei"), "Thu, Jan 15"));
test("isValidZone", () => { assert.ok(C.isValidZone("Europe/Paris")); assert.ok(!C.isValidZone("Mars/Base")); });
