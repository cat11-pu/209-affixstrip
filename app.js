// app.js：渲染结果
import { stripAffix } from "./strip.js";
import { stripBoth } from "./report.js";

export function render(spec) {
  const text = String(spec.text === undefined ? "" : spec.text);
  const prefix = String(spec.prefix === undefined ? "" : spec.prefix);
  const suffix = String(spec.suffix === undefined ? "" : spec.suffix);
  const view = stripBoth(text, prefix, suffix);
  const body = String(view.body === undefined ? "" : view.body);
  const restored = (view.prefix_hit ? prefix : "") + body + (view.suffix_hit ? suffix : "");
  return { body: body, prefix_hit: view.prefix_hit === true, suffix_hit: view.suffix_hit === true,
           length: body.length, original: text.length, removed: text.length - body.length,
           restored: restored === text, tail: stripAffix(text, suffix) };
}
