export class C {
  // 静的メソッド
  static method() {
    return 1;
  }
  // インスタンスのメソッド
  method() {
    return 2;
  }

  // Cの静的プロパティCクラス
  static C = class {
    // 静的メソッド
    static method() {
      return 3;
    }
    // インスタンスのメソッド
    method() {
      return 4;
    }
  };
  // CのプロパティCクラス
  C = class {
    // 静的メソッド
    static method() {
      return 5;
    }
    // インスタンスのメソッド
    method() {
      return 6;
    }
  };
}
