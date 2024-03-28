import { parse } from 'acorn';
export function removeSemicolon(input) {
  try {
    parse(input, { ecmaVersion: ('latest') });
  } catch (error) {
    return input;
  }
  const lines = input.split('\n');
  const result = [];

  for (const line of lines) {
    if (line.trimEnd().endsWith(';')) {
      const nextLine = lines[lines.indexOf(line) + 1];
      if (
        nextLine &&
        (nextLine.trimStart().startsWith('(') ||
          nextLine.trimStart().startsWith('[') ||
          nextLine.trimStart().startsWith('/') ||
          nextLine.trimStart().startsWith('+') ||
          nextLine.trimStart().startsWith('-') ||
          nextLine.trimStart().startsWith('`'))
      ) {
        result.push(line);
      } else {
        result.push(line.trimEnd().slice(0, -1));
      }
    } else {
      result.push(line);
    }
  }

  return result.join('\n');
}
