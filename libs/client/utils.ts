export function cls(...classnames: string[]) {
  // ["a", "b", "c"].join(" ") == "a b c";
  return classnames.join(" ");
}
