// Symbol() を使い、同じ文字列から生成された 2 個の Symbol 変数を作成する
const propName = 'propName';
const symbol1 = Symbol(propName);
const symbol2 = Symbol(propName);
// それらをプロパティとして持つオブジェクトを作成し、そのオブジェクトに対して、作成したSymbol変数を使って各プロパティの値を取得する
const obj1 = { [symbol1]: 'aaa', [symbol2]: 35 };
console.log('obj1[symbol1] : ', obj1[symbol1]); // aaa
console.log('obj1[symbol2] : ', obj1[symbol2]); // 35


// Symbol()ではなく、Symbol.for()で同名の変数を作成した場合の挙動を確認する
const symbol3 = Symbol.for(propName);
const symbol4 = Symbol.for(propName);

console.log('symbol3 === symbol4 : ', symbol3 === symbol4); // true

const obj2 = {
  [symbol3]: 'bbb',
  [symbol4]: 15
};
console.log('obj2[symbol3] : ', obj2[symbol3]); // 15
console.log('obj2[symbol4] : ', obj2[symbol4]); // 15