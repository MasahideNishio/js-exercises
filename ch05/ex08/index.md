# 予想

- consoleに5が表示される
- tryブロックの中でthrowされ、catchブロックに入る。
- catchブロックでbreakが実行されて、catchブロックを抜ける。
- try～catchでは必ず実行されるfinallyブロックが実行されてcontinueが実行され、当該forループが終わり次のループに進む。
- それが繰り返されてループが終わるi === 5 まで進んでループが終わり、console.logが実行される。

# 結果

- 5が表示された
- lintでfinallyブロックがUnreachable codeと警告された(到達できないというのは予想と違った)
