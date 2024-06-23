class C {
  #x = 42;

  getX() {
    return this.x;
  }
}
const c = new C();
console.log(c.x); // undefined
console.log(c.getX()); // undefined

// クロージャを使ったプライベート変数
function C2() {
  let x = 42;
  this.getX = () => this.x;
}
const c2 = new C2();
console.log(c2.x); // undefined
console.log(c2.getX()); // undefined
