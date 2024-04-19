try {
  console.log("try");
  throw new Error();
  console.log("try2"); // 到達できないはず
} catch (e) {
  console.log("catch");
  console.log(e);
} finally {
  console.log("finally");
}
