// 極座標 r と theta をプロパティにもち、ゲッターとセッターをもつ読み書き可のアクセサプロパティとしてデカルト座標 x と y をもつオブジェクトを実装しなさい。
// セッターメソッドにおいて x と y それぞれに NaN が設定される場合にはエラーにしなさい。
const obj = {
  r: 5,
  theta: Math.PI / 3, // 60度をラジアン値で
  get x() {
    return this.r * Math.cos(this.theta);
  },
  set x(value) {
    if (typeof value !== "number" || Number.isNaN(value)) {
      throw Error("Invalid Number");
    }
    this.r = Math.hypot(value, this.y);
    this.theta = Math.atan2(this.y, value);
  },
  get y() {
    return this.r * Math.sin(this.theta);
  },
  set y(value) {
    if (typeof value !== "number" || Number.isNaN(value)) {
      throw Error("Invalid Number");
    }
    this.r = Math.hypot(this.x, value);
    this.theta = Math.atan2(value, this.x);
  },
};

try {
  console.log("初期値");
  console.log("r:", obj.r, "theta:", obj.theta, "x:", obj.x, "y:", obj.y);
  console.log("x = 3");
  obj.x = 3;
  console.log("r:", obj.r, "theta:", obj.theta, "x:", obj.x, "y:", obj.y);
  console.log("y = 4");
  obj.y = 4;
  console.log(" r:", obj.r, "theta:", obj.theta, "x:", obj.x, "y:", obj.y);
  console.log("x = hoge(expected Throw Error)");
  obj.x = "hoge";
  console.log("r:", obj.r, "theta:", obj.theta, "x:", obj.x, "y:", obj.y);
} catch (e) {
  console.log(e.message);
}
