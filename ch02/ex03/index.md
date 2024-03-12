## 濁音や半濁音を含むファイル名のファイルを作ったとき、Windows と macOS では NFC と NFD どちらの形式で保存されるかを調べて記述しなさい。
- WindowsではNFC、MacOSではNFDで保存される。
- 対処方法として、WindowsやLinuxなど、MacOS以外のファイルシステムではNFC方式を採用している事が多いため、NFCへ変換する事が多い。
- JavaScriptではString.prototype.normalize()メソッドが用意されているので簡単にNFCへ変換することができる。
