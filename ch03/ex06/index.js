export function substring(str, indexStart, indexEnd) {
  if (indexEnd === undefined) indexEnd = str.length;
  if (isNaN(indexStart) || indexStart < 0) indexStart = 0;
  if (isNaN(indexEnd) || indexEnd < 0) indexEnd = 0;
  if (indexStart > str.length) indexStart = str.length;
  if (indexEnd > str.length) indexEnd = str.length;
  if (indexStart > indexEnd) {
    const temp = indexStart;
    indexStart = indexEnd;
    indexEnd = temp;
  }
  indexStart = Math.floor(indexStart);
  indexEnd = Math.floor(indexEnd);

  let retval = "";
  for (let i = indexStart; i < indexEnd; i++) {
    retval += str[i];
  }
  return retval;
}

export function slice(str, indexStart, indexEnd) {
  if (indexStart === undefined || isNaN(indexStart)) indexStart = 0;
  if (indexEnd === undefined) indexEnd = str.length;
  if (isNaN(indexEnd)) indexEnd = 0;
  if (indexStart < 0) indexStart = Math.max(indexStart + str.length, 0);
  if (indexEnd < 0) indexEnd = Math.max(indexEnd + str.length, 0);
  if (indexStart >= str.length) return "";
  if (indexEnd >= str.length) indexEnd = str.length;
  if (indexStart > indexEnd) {
    return "";
  }
  indexStart = Math.floor(indexStart);
  indexEnd = Math.floor(indexEnd);

  let retval = "";
  for (let i = indexStart; i < indexEnd; i++) {
    retval += str[i];
  }
  return retval;
}

export function padStart(str, targetLength, padString) {
  if (str.length >= targetLength) return str;
  if (padString === undefined) padString = " ";
  const padLength = targetLength - str.length;
  let paddedString = "";
  if (padLength >= padString.length) {
    const repeatCount = Math.ceil(padLength / padString.length);
    paddedString = padString.repeat(repeatCount).substring(0, padLength);
  } else {
    paddedString = padString.substring(0, padLength);
  }
  return paddedString + str;
}

export function trim(str) {
  let indexStart = 0;
  let indexEnd = str.length - 1;
  while (indexStart < str.length && str[indexStart] === " ") {
    indexStart++;
  }
  while (indexEnd >= 0 && str[indexEnd] === " ") {
    indexEnd--;
  }
  return str.substring(indexStart, indexEnd + 1);
}
