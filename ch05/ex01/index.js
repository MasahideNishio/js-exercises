function printTest() {
  const a = "aaa";
  {
    const a = "bbb";
    {
      const a = "ccc";
      console.log(a);
    }
    console.log(a);
  }
  {
    const a = "ddd";
    console.log(a);
  }
  console.log(a);
}
printTest();

// 結果：
// ccc
// bbb
// ddd
// aaa
