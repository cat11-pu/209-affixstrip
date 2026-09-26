// report.js：剥前后缀（先在前缀上判，再在剥完前缀的正文上判后缀）
import { badAffixError } from "./strip.js";

export function stripBoth(text, prefix, suffix) {
  const value = String(text);
  const head = String(prefix);
  const tail = String(suffix);
  if (head === "" || tail === "") throw badAffixError();

  let body = value;
  const prefix_hit = body.startsWith(head);
  if (prefix_hit) body = body.slice(head.length);

  const suffix_hit = body.endsWith(tail);
  if (suffix_hit) body = body.slice(0, body.length - tail.length);

  return { body: body, prefix_hit: prefix_hit, suffix_hit: suffix_hit };
}
