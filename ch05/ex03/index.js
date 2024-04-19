export function isHolidayIfElse(day) {
  const holidays = ["土", "日"];
  if (holidays.includes(day)) {
    return true;
  } else {
    return false;
  }
}
export function isHolidaySwitch(day) {
  switch (day) {
    case "土":
    case "日":
      return true;

    case "月":
    case "火":
    case "水":
    case "木":
    case "金":
    default:
      return false;
  }
}
