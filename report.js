// report.js：报表（基线：一律给空串）
import { stripAffix } from "./strip.js";

export function stripBoth(text, prefix, suffix) {
  return { body: "", prefix_hit: false, suffix_hit: false };
}
