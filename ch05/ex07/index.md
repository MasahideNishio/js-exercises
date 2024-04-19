# 予想

- falseが表示される
- tryブロックでreturn trueが実行されるが、その直後にfinallyブロックも必ず実行されてreturn falseが実行され、関数としてはfalseが返る。

# 結果

- falseが表示された
