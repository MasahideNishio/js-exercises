function newHashTable() {
  return {
    size: 0, // マッピング数を示すプロパティ
    entries: Array(100).fill(null), // マッピングを格納する配列(ハッシュ値の算出のため要素数固定で生成)
    createHash(key) {
      let hash = 0;
      for (let i = 0; i < key.length; i++) {
        hash += key.charCodeAt(i); // 文字コードを加算してテーブルサイズで割った余りをハッシュ値にするという例を参考にした
      }
      return hash % this.entries.length;
    },
    get(key) {
      // keyにマップされた値を取得する
      const hash = this.createHash(key);

      // リンクトリストを辿る
      let curr = this.entries[hash];
      while (curr) {
        if (curr.key === key) {
          return curr.value;
        } else {
          curr = curr.next;
        }
      }
      return undefined;
    },
    put(key, value) {
      // key, valueのマッピングを追加する(keyが存在する場合はvalueを上書きする)
      const hash = this.createHash(key);
      let curr = this.entries[hash];
      // まだそのハッシュ値が登録されていない場合
      if (!curr) {
        // ハッシュ値が重複したときのことを考慮して、リンクトリスト形式で保存する。
        this.entries[hash] = { key: key, value: value, next: null };
        this.size++;
        return;
      }
      // 既にそのハッシュで登録されている場合
      while (curr) {
        if (curr.key === key) {
          curr.value = value;
          return;
        }
        // もし末尾まで見てなかったら新規作成
        if (!curr.next) {
          curr.next = { key: key, value: value, next: null };
          this.size++;
          return;
        }
        curr = curr.next;
      }
    },
    remove(key) {
      // keyのマッピングを削除する
      const hash = this.createHash(key);
      let curr = this.entries[hash];
      // なかったら戻る
      if (!curr) {
        return;
      }
      // リンクトリストの最初のを消す場合はentries[hash]を更新
      if (curr.key === key) {
        this.entries[hash] = curr.next;
        this.size--;
        return;
      }
      // リンクトリストを辿る(前のとつなぐ必要があるのでcurrを維持してnextで比較)
      while (curr.next) {
        if (curr.next.key === key) {
          curr.next = curr.next.next; // 消す場合はそのまた次と繋ぐ
          this.size--;
          return;
        } else {
          curr = curr.next;
        }
      }
      return;
    },
  };
}

function sample() {
  const hashTable = newHashTable();
  hashTable.put("key1", "value1");
  hashTable.put("key2", { value: "value2" });

  console.log(`size=${hashTable.size}`); // => size=2
  console.log(`key1=${hashTable.get("key1")}`); // => key1=value1
  console.log(`key2=${JSON.stringify(hashTable.get("key2"))}`); // => key2={"value":"value2"}

  hashTable.put("key2", "new value");

  console.log(`key2=${hashTable.get("key2")}`); // => key2=new value

  hashTable.remove("key2");

  console.log(`key2=${hashTable.get("key2")}`); // => key2=undefined
  console.log(`size=${hashTable.size}`); // => size=1

  // ハッシュ値が重複するケース
  console.log(hashTable.createHash("a")); // 97
  console.log(hashTable.createHash("aag")); // 97
  hashTable.put("a", "value_a"); // => a=value_a
  hashTable.put("aag", "value_aag"); // => aag=value_aag

  console.log(`a=${hashTable.get("a")}`); // => a=value_a
  console.log(`aag=${hashTable.get("aag")}`); // => aag=value_aag
  console.log(`size=${hashTable.size}`); // => size=3

  // エントリを削除してから get する
  hashTable.remove("aag");
  console.log(`aag=${hashTable.get("aag")}`); // => aag=undefined

  // サイズが戻ったことを確認
  console.log(`size=${hashTable.size}`); // => size=2

  // 重複したハッシュ値で消してない方は残ってることを確認
  console.log(`a=${hashTable.get("a")}`); // => a=value_a
}
sample();
