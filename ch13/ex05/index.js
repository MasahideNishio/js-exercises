import { wait } from "../util.js";

function g1() {
  // TODO: then のネストを無くしなさい → thenのチェーンを使って解消
  return wait(1000)
    .then(() => {
      console.log("A");
      return wait(2000);
    })
    .then(() => {
      console.log("B");
      return wait(3000);
    })
    .then(() => {
      console.log("C");
    });
}

function g2() {
  // TODO: new Promise を使わないように書き換えなさい → new Promiseではなくthenチェーンを返す
  return wait(1000)
    .then(() => {
      console.log("A");
      return wait(2000);
    })
    .then(() => {
      console.log("B");
      return wait(3000);
    })
    .then(() => {
      console.log("C");
    });
}

function g3() {
  // 以下2つの関数が存在するとします (中身は適当)
  function fetchUser() {
    return Promise.resolve({ id: 42, name: "John" });
  }
  function fetchUserFriends(user) {
    return Promise.resolve([
      { name: "Sam", id: 100 },
      { name: "Bob", id: 1 },
    ]);
  }

  // TODO: var, let, const による変数宣言を無くしなさい。async/awaitは使用しないこと。
  // →thenの値をそのまま使うように修正
  return fetchUser()
    .then(
      (user) => fetchUserFriends(user).then((friends) => ({ user, friends })) // fetchUserから返ったPromiseの結果をそのままfetchUserFriendに渡す
    )
    .then(({ user, friends }) => {
      // fetchUserFriendから返ったPromiseの結果を使ってログを出す
      console.log(`${user.name} has ${friends.length} friends!`);
    });
}

function g4() {
  function someFunction() {
    return 42;
  }

  // NOTE: この関数 g4 は Promise を返す必要があるものとする
  // (利用しているフレームワークはライブラリがそういう関数を要求するとでも思って下さい)
  // TODO: new Promise を使わないように書き換えなさい。async/awaitは使用しないこと。
  //   return new Promise((resolve) => {
  //     const value = someFunction();
  //     return value;
  //   });

  return Promise.resolve(someFunction()); // Promise.resolve()でラップする
}
