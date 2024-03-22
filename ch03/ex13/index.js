class Example {
  valueOf() {
      return 123;
  }
  toString() {
      return 'World!';
  }
}

const obj = new Example();
console.log(obj + 1); // Called ValueOf
console.log(`Hello ${obj}`); // Called toString
