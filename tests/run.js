import assert from "node:assert";
import { stripAffix } from "../strip.js";
import { stripBoth } from "../report.js";
import { render } from "../app.js";

let failed = 0;
function check(name, fn) {
  try { fn(); console.log("ok " + name); } catch (e) { failed += 1; console.log("FAIL " + name + " :: " + e.message); }
}

check("stripAffix returns text", () => {
  assert.strictEqual(typeof stripAffix("abc", "a"), "string");
});

check("stripBoth returns a body", () => {
  assert.strictEqual(typeof stripBoth("abc", "a", "c").body, "string");
});

check("stripBoth returns hit flags", () => {
  assert.strictEqual(typeof stripBoth("abc", "a", "c").prefix_hit, "boolean");
});

check("render counts length", () => {
  assert.strictEqual(typeof render({ text: "abc", prefix: "a", suffix: "c" }).length, "number");
});

check("render exposes restored flag", () => {
  assert.strictEqual(typeof render({ text: "abc", prefix: "a", suffix: "c" }).restored, "boolean");
});

console.log("5 cases, " + failed + " failed");
process.exit(failed === 0 ? 0 : 1);
