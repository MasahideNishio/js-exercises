- 正規表現でカッコの対応を判定することは無理だと考える。
  カッコがペアになっているかをチェックするには、
  ネストしている場合、開くカッコの出現回数をカウントしそれを記憶したうえで、閉じカッコの出現回数が同じであることを判定する必要があるが、
  その回数を記憶することが正規表現では表現できない。
  また、閉じカッコの後また開くカッコが出現するなど複雑な構成になってくると、開くカッコの数と閉じカッコの対応を正確にパターンで表現することは無理である。