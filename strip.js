// strip.js：剥一段（以该段开头或结尾才剥，否则原样返回；单次扫描，不做反复拼接）
export const AFFIX_BUDGET = 50000;

export function badAffixError() {
  const error = new Error("affix must be a non-empty string");
  error.code = "E_BAD_AFFIX";
  return error;
}

export function stripAffix(text, affix) {
  const value = String(text);
  const segment = String(affix);
  if (segment === "") throw badAffixError();
  if (value.startsWith(segment)) return value.slice(segment.length);
  if (value.endsWith(segment)) return value.slice(0, value.length - segment.length);
  return value;
}
