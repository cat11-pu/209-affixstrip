// report.js：先剥前缀，再在剩下的正文上剥后缀
export function stripBoth(text, prefix, suffix) {
  const source = String(text);
  const head = String(prefix);
  const tail = String(suffix);
  if (head === "" || tail === "") {
    const error = new Error("prefix and suffix must not be empty");
    error.code = "E_BAD_AFFIX";
    throw error;
  }
  const prefixHit = source.startsWith(head);
  let body = prefixHit ? source.slice(head.length) : source;
  const suffixHit = body.endsWith(tail);
  if (suffixHit) {
    body = body.slice(0, body.length - tail.length);
  }
  return { body: body, prefix_hit: prefixHit, suffix_hit: suffixHit };
}
