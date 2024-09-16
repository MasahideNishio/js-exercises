export function getTemplateLiteralType(strings, ...values) {
  return strings.reduce((result, string, i) => {
    const value = values[i];

    const valueType = i < values.length ? typeof value : "";
    return result + string + (valueType || "");
  }, "");
}
