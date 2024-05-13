const data = [
  { name: "Alice", class: "A", math: 10, chemistry: 30, geography: 20 },
  { name: "Bob", class: "A", math: 50, chemistry: 50, geography: 60 },
  { name: "Carol", class: "A", math: 70, chemistry: 55, geography: 30 },
  { name: "Dave", class: "B", math: 40, chemistry: 20, geography: 60 },
  { name: "Ellen", class: "B", math: 60, chemistry: 70, geography: 40 },
  { name: "Frank", class: "B", math: 90, chemistry: 70, geography: 80 },
  { name: "Isaac", class: "C", math: 70, chemistry: 40, geography: 50 },
  { name: "Justin", class: "C", math: 80, chemistry: 40, geography: 30 },
  { name: "Mallet", class: "C", math: 60, chemistry: 70, geography: 90 },
];

// reduceでmathの点数を合算 : 530
console.log(
  "1.  mathの全員の合計点",
  data.reduce((x, y) => (x += y.math), 0),
  "点"
);

// filterでAクラスに絞ったあとreduceでchemistryの点数を合算し平均を出す : 45
const dataClassA = data.filter((x) => x.class === "A");
console.log(
  "2. クラスAのchemistryの平均点",
  dataClassA.reduce((x, y) => (x += y.chemistry), 0) / dataClassA.length,
  "点"
);

// filterでCクラスに絞ったあと、reduceで全科目の点数を合算し平均を出す : 176.6666...
const dataClassC = data.filter((x) => x.class === "C");
console.log(
  "3. 3科目合計点のクラスC内での平均点",
  dataClassC.reduce((x, y) => (x += y.math + y.chemistry + y.geography), 0) /
    dataClassC.length
);

// mapでまず合計点を持ったオブジェクトに作りかえて、reduceでscoreが最大のオブジェクトを返す : Mallet
const sumData = data.map((x) => {
  return {
    name: x.name,
    class: x.class,
    totalScore: x.math + x.chemistry + x.geography,
  };
});
console.log(
  "4. 3科目合計点が最も高い人のname : ",
  sumData.reduce((x, y) => (x.score > y.score ? x : y)).name
);

// 平均値を求める
const avgGeography = data.reduce((x, y) => x + y.geography, 0) / data.length;

// 各要素について平均値との差の2乗を求めて、それの合計を平均で割って平方根をとる :  22.3330569358242 (ExcelのSTDEV.Pで算出した値と一致)
console.log(
  "5. 全体のgeographyの標準偏差",
  Math.sqrt(
    data
      .map((x) => (x.geography - avgGeography) ** 2)
      .reduce((x, y) => x + y, 0) / data.length
  )
);
