// アップロードボタンがクリックされたときの処理
document.getElementById("uploadButton").addEventListener("click", async () => {
  // アクセストークンとファイルを取得
  const accessToken = document.getElementById("accessToken").value;
  const fileInput = document.getElementById("fileInput");
  const result = document.getElementById("result");

  // 結果表示をリセット
  result.textContent = "";

  // 入力値チェック
  if (!accessToken) {
    result.textContent = "アクセストークンを入力してください";
    return;
  }
  if (!fileInput.files.length) {
    result.textContent = "アップロードするファイルを選択してください";
    return;
  }

  // ファイルの取得
  const file = fileInput.files[0];
  const fileName = file.name;

  try {
    // 1. ドライブ情報を取得して drive-id を特定
    const driveResponse = await fetch(
      "https://graph.microsoft.com/v1.0/me/drive",
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    if (!driveResponse.ok) {
      const error = await driveResponse.json();
      result.textContent = `ドライブ情報の取得に失敗しました: ${error.error.message}`;
      return;
    }

    const driveData = await driveResponse.json();
    const driveId = driveData.id; // ドライブ ID を取得

    // 2. ファイルをアップロードする URL
    const uploadUrl = `https://graph.microsoft.com/v1.0/me/drives/${driveId}/root:/${fileName}:/content`;

    // 3. ファイルをアップロード
    const uploadResponse = await fetch(uploadUrl, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": file.type,
      },
      body: file,
    });

    // アップロード結果を処理
    if (uploadResponse.ok) {
      result.textContent = `アップロード成功！ ファイル名: ${fileName}`;
    } else {
      const error = await uploadResponse.json();
      result.textContent = `アップロードエラー: ${error.error.message}`;
    }
  } catch (err) {
    result.textContent = `エラーが発生しました: ${err.message}`;
  }
});
