export function removeOddProp(obj) {
  if (typeof obj !== "object") {
    return obj;
  }
  const retObj = {};
  for (const prop in obj) {
    const value = obj[prop];
    if (value !== null && typeof value === "number" && value % 2 === 0) {
      retObj[prop] = value;
    }
  }
  return retObj;
}
