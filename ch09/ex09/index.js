// S
// 満たさない例
class User {
  sendEmail() {
    // メール送信
  }
  saveUserInfo() {
    // DBにUserの情報を保存する
  }
}
// 満たす例
class User {
  constructor(id, name) {
    this.id = id;
    this.name = name;
  } // あくまでユーザーとしての情報を持つという責務だけ
}
class EmailService {
  send(user, send, message) {
    // メール送信
  } // メール送信の責務は別にする
}
class UserRepository {
  save(userId) {
    // DBにUserの情報を保存する
  } // DBへの保存の責務も別にする
}

// O
// 満たさない例
class CalcArea {
  // 図形の面積を算出する
  constructor(type, ...params) {
    // typeは図形の種類とする(適当)
  }
  getArea() {
    // 面積を計算する
    switch (type) {
      case Circle: // 円なら・・
        break;
      case Square: // 正方形なら・・
        break;
      // ★なにか新たに図形の種類を足したいとなったときに、既存の処理に影響を及ぼしてしまう
    }
  }
}
// 満たす例
class Shape {
  // 基底クラスでI/Fだけ定義しとくといいのかな
}
class Circle extends Shape {
  getArea() {
    // 円の面積を出す
  }
}
class Square extends Shape {
  getArea() {
    // 正方形の面積を出す
  }
}
// これなら台形を新たに作りたいときに新たにクラスを定義するだけでよい。既存コードを変更する必要はなくなる。

// L
// 満たさない例
// 参考：https://qiita.com/k2491p/items/d442344a462d3a574acc
class Rectangle {
  // 長方形
  constructor() {
    this.height = height;
    this.width = width;
  }
  setHeight(height) {
    this.height = height;
  }
  setWidth(width) {
    this.width = width;
  }
}
class Square extends Rectangle {
  setHeight(height) {
    // 正方形の場合は高さを設定すると幅にも反映される＝基底クラスの事後条件を変えてしまっている(Widthは変わってはいけない)
    this.height = height;
    this.width = height;
  }
}
// 満たす例 長方形と正方形は性質が違うので、継承のさせ方も変えた
class Shape {}
class Rectangle extends Shape {
  constructor(height, width) {
    super();
    this.height = height;
    this.width = width;
  }
  setHeight(height) {
    this.height = height;
  }
  setWidth(width) {
    this.width = width;
  }
}
class Square extends Shape {
  constructor(side) {
    super();
    this.side = side;
  }
  setSide(side) {
    this.side = side;
  }
}

// I
// 満たさない例　printだけしたいクライアントも、scanとかfaxとか必要ない機能にも依存してしまう
class MFP {
  print() {
    // 印刷する
  }
  scan() {
    // スキャンする
  }
  copy() {
    this.scan();
    this.print();
  }
  fax() {
    // faxおくる
  }
}

// 満たす例(これが適切な例で適切な解かは微妙なところだが雰囲気で)
class Printer {
  print() {
    // 印刷する
  }
}
class Fax {
  fax() {
    // 印刷する
  }
}

// D
// 満たさない例 BにAが依存する
class A {
  do() {
    const obj = new B(); // Bの具象クラスを作っているのでAはBに依存していることになる
    obj.action();
  }
}
class B {
  action() {
    // なんか処理(Aから呼びたい)
  }
}

// 満たす例 インターフェースにだけ依存させる
class AbstractB {
  action() {
    throw new Error("Abstract Method");
    定義が必要;
  }
}
class B extends AbstractB {
  // Bはインターフェースを継承する
  action() {
    // なんか処理(Aから呼びたい)
  }
}
class A {
  do() {
    const obj = new AbstractB(); // 抽象クラスを使って生成することでBへの依存をしないように
    obj.action();
  }
}
