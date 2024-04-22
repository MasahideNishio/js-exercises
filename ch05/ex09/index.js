export function JSONParse(inputStr) {
  const retval = {};
  try {
    const data = JSON.parse(inputStr);
    retval.success = true;
    retval.data = data;
  } catch (e) {
    retval.success = false;
    retval.error = e.message;
  }
  return retval;
}
