export function isEmailAddress(email) {
  if (typeof email !== "string") {
    return false;
  }

  // 長さチェック
  if (email.split("@")[0].length > 64 || email.length > 254) {
    return false;
  }

  // 正規表現でメールの形式をチェック
  const pattern = "[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+"; // まとめた文字セット
  const emailRegex = new RegExp(
    `^${pattern}(\\.${pattern})*@${pattern}(\\.${pattern})*$`
  );

  return emailRegex.test(email);
}
