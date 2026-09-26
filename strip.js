// strip.js：剥一段（开头或结尾命中才剥，否则原样返回）
export function stripAffix(text, affix) {
  const source = String(text);
  const piece = String(affix);
  if (piece === "") {
    const error = new Error("affix must not be empty");
    error.code = "E_BAD_AFFIX";
    throw error;
  }
  if (source.startsWith(piece)) {
    return source.slice(piece.length);
  }
  if (source.endsWith(piece)) {
    return source.slice(0, source.length - piece.length);
  }
  return source;
}
