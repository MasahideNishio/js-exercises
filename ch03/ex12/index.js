const obj1 = { x: 1 };
obj1.y = 2;
const obj2 = { x: 1, y: 2 };
console.log('obj1 === obj2 : ', obj1 === obj2); // false

export function equals(obj1, obj2) {
    const keys1 = Object.keys(obj1);
    const keys2 = Object.keys(obj2);
    // キーの数が異なるか
    if (keys1.length !== keys2.length)
    {
        return false;
    }
    // 各キーの値が等しいか
    for (const key of keys1) {
        if (obj1[key] !== obj2[key]) {
            return false;
        }
    }
    // すべての条件を満たせば等しい
    return true;
}