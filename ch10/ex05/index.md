# 結果(ex03/04に手を加えた場合)

- ES Modulesの方はvs codeのRename Symbol機能でクラス・メソッド名ともにExport側を修正するとImport側にも反映された。
- CommonJSの方は、メソッド名は反映されたが、requireで読み込んでいるクラス名は反映されなかった(newも)

# 結果(デフォルトエクスポート)

- 上記と同じ

# 結果(名前変更を伴うインポート)

- Export側を変更してもImport側にはクラス名、メソッド名ともに反映されず

# 結果(再エクスポート)

- 一番大元のExportのクラス名、メソッド名を変えても、再エクスポートしさらにインポートした側には反映されなかった。
- 再エクスポートするところでクラス名を変えると、それはさらにインポートする側には反映された