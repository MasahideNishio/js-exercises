(function updateClock() {
  // SVGの要素を取得
  const clock = document.getElementById("clock");
  let sechand = document.querySelector("#clock .secondhand");

  // 秒針がまだ存在しない場合、動的に作成して追加(初回だけ。2回目以降は取得できる)
  if (!sechand) {
    sechand = document.createElementNS("http://www.w3.org/2000/svg", "line");
    sechand.setAttribute("class", "secondhand hands");
    sechand.setAttribute("x1", "50");
    sechand.setAttribute("y1", "50");
    sechand.setAttribute("x2", "50");
    sechand.setAttribute("y2", "15");
    sechand.setAttribute("stroke", "red");
    clock.appendChild(sechand);
  }

  // 現在時刻を取得
  const now = new Date(); // Current time
  const sec = now.getSeconds(); // 秒
  const min = now.getMinutes() + sec / 60; // 分を小数点で表す
  const hour = (now.getHours() % 12) + min / 60; // 時間を小数点で表す

  const secangle = sec * 6; // 秒針は1秒で6度進む（60秒で360度）
  const minangle = min * 6; // 1分で6度進む
  const hourangle = hour * 30; // 1時間で30度進む

  // 分針と時針の要素も取得
  const minhand = document.querySelector("#clock .minutehand");
  const hourhand = document.querySelector("#clock .hourhand");

  // 秒針、分針、時針の角度を設定
  sechand.setAttribute("transform", `rotate(${secangle},50,50)`);
  minhand.setAttribute("transform", `rotate(${minangle},50,50)`);
  hourhand.setAttribute("transform", `rotate(${hourangle},50,50)`);

  // 毎秒更新
  setTimeout(updateClock, 1000);
})();
