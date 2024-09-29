// 1. nav要素内のリンク(<a>)
const navLinks = document.querySelectorAll("nav a");
console.log("nav要素内のリンク:", navLinks);

// 2. 商品リスト(.product-list)内の最初の商品(.product-item)
const firstProductItem = document.querySelector(".product-list .product-item");
console.log("商品リスト内の最初の商品:", firstProductItem);

// 3. カートアイコンの画像(<img>)
const cartIcon = document.querySelector(".cart img");
console.log("カートアイコンの画像:", cartIcon);

// 4. 商品リスト(.product-list)内の価格(.price)を表示する要素
const productPrices = document.querySelectorAll(".product-list .price");
console.log("商品リスト内の価格要素:", productPrices);

// 5. 商品リスト(.product-list)内の全ての商品(.product-item)の画像(<img>)
const productImages = document.querySelectorAll(
  ".product-list .product-item img"
);
console.log("全ての商品画像:", productImages);

// 6. 検索バー(.search-bar)内の検索ボタン(<button>)
const searchButton = document.querySelector(".search-bar button");
console.log("検索バー内の検索ボタン:", searchButton);

// 7. フッター(footer)内のパラグラフ(<p>)要素
const footerParagraph = document.querySelector("footer p");
console.log("フッター内のパラグラフ:", footerParagraph);

// 8. 商品リスト(.product-list)内の偶数番目の商品(.product-item)
const evenProductItems = document.querySelectorAll(
  ".product-list .product-item:nth-child(even)"
);
console.log("偶数番目の商品:", evenProductItems);

// 9. ヘッダー(header)内のアカウントリンク(.account)の画像(<img>)
const accountImage = document.querySelector(".account img");
console.log("アカウントリンクの画像:", accountImage);

// 10. ナビゲーションリンクのうち、"会社情報"のリンク
const aboutLink = document.querySelector('nav a[href="#about"]');
console.log("会社情報のリンク:", aboutLink);
