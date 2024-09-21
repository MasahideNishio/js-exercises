// 要素の取得
const editorDiv = document.getElementById("editor-front"); // editorDiv要素
const editorInput = document.getElementById("editor-back"); // editorInput要素

// div要素をクリックするとinput要素にフォーカス
editorDiv.addEventListener("click", () => {
  editorInput.focus();
});

// input要素にフォーカスが当たったとき、divの背景色を変更
editorInput.addEventListener("focus", () => {
  editorDiv.style.backgroundColor = "silver";
});

// input要素からフォーカスが外れたとき、divの背景色を元に戻す
editorInput.addEventListener("blur", () => {
  editorDiv.style.backgroundColor = "white";
});

// input要素に入力されたテキストをdiv要素に反映
editorInput.addEventListener("input", (event) => {
  editorDiv.innerText = event.target.value;
});
