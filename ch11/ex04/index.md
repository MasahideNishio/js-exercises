# 予想

- 型つき配列の方がメモリ効率が良く計算速度も速いため、結果として速くなると予想する。

# 結果

1. デフォルトで行ったが、大した差にはならなかった
   arrayMultiply: 958.2268999999999
   typedArrayMultiply: 955.8705

2. Float32Arrayで試したところ、むしろ遅くなった(最適化の問題？)
   arrayMultiply: 972.2022999999995
   typedArrayMultiply: 2200.6458999999995
3. Uint32Arrayだと少し速くなった
   arrayMultiply: 956.9329000000002
   typedArrayMultiply: 940.9074
