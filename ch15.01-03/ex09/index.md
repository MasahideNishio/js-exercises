# ReactのXSS対策

- デフォルトで、自動エスケープ処理がされる。JSX内に挿入されたデータはデフォルトでエスケープされ、scriptタグやJavascriptのイベントハンドラが実行されることはないようになっている。
- https://ja.legacy.reactjs.org/docs/jsx-in-depth.html#string-literals

# ReactのXSS脆弱性

1. dangerouslySetInnerHTML というプロパティを使うとHTMLをエスケープ処理せずそのまま埋め込むため、XSSを引き起こしてしまう。

```const html = '<script>alert("XSS")</script>';

const App = () => {
return <div dangerouslySetInnerHTML={{ __html: html }} />;
};
```

2. href属性は先頭がjavascript:から始まる場合はそれ以降の文字列をjavascriptとして実行される。

```
const App = () => {
  const userInputText1 = `javascript: alert('Warning!')`;

  // locationオブジェクトへの操作も同様
  // window.location.href = userInputText1;

  return (
    <div>
      <a href={`${userInputText1}/edit`}>link</a>
    </div>
  );
};
```

- https://azukiazusa.dev/blog/react-javascript-xss/
- https://qiita.com/kazzzzzz/items/897f8ed89ca36a0734de
