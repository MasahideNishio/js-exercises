// "パン"を Unicode エスケープシーケンスで記述した文字列リテラルを NFC と NFD のそれぞれの形式で作ってください
const pan_nfc = "\u30D1" + "\u30f3";
const pan_nfd = "\u30CF" + "\u309A" + "\u30f3";
console.log("NFC : " + pan_nfc);
console.log("NFC : " + pan_nfd);
