export function escapeStringIfElse(inputStr) {
  let escapedStr = "";
  for (const l of inputStr) {
    if (l === "\0") {
      escapedStr += "\\0";
    } else if (l === "\b") {
      escapedStr += "\\b";
    } else if (l === "\t") {
      escapedStr += "\\t";
    } else if (l === "\n") {
      escapedStr += "\\n";
    } else if (l === "\v") {
      escapedStr += "\\v";
    } else if (l === "\f") {
      escapedStr += "\\f";
    } else if (l === "\r") {
      escapedStr += "\\r";
    } else if (l === '"') {
      escapedStr += '\\"';
    } else if (l === "'") {
      escapedStr += "\\'";
    } else if (l === "\\") {
      escapedStr += "\\\\";
    } else {
      escapedStr += l;
    }
  }
  return escapedStr;
}
export function escapeStringSwitch(inputStr) {
  let escapedStr = "";
  for (const l of inputStr) {
    switch (l) {
      case "\0":
        escapedStr += "\\0";
        break;
      case "\b":
        escapedStr += "\\b";
        break;
      case "\t":
        escapedStr += "\\t";
        break;
      case "\n":
        escapedStr += "\\n";
        break;
      case "\v":
        escapedStr += "\\v";
        break;
      case "\f":
        escapedStr += "\\f";
        break;
      case "\r":
        escapedStr += "\\r";
        break;
      case '"':
        escapedStr += '\\"';
        break;
      case "'":
        escapedStr += "\\'";
        break;
      case "\\":
        escapedStr += "\\\\";
        break;
      default:
        escapedStr += l;
        break;
    }
  }
  return escapedStr;
}
