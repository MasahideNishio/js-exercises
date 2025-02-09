import { useState, useEffect } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import "./StockTracker.css";

const STOCK_KEY = "savedStocks";
const UPDATE_KEY = "updateFrequency";
const DEFAULT_UPDATE_INTERVAL = 60000;
const DEFAULT_STOCKS = ["^N225", "^GSPC"]; // デフォルトの銘柄(削除させない)

const Clock = () => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  return <h1>{time.toLocaleString("ja-JP", { hour12: false })}</h1>;
};

const ExchangeRatePanel = () => {
  const [rates, setRates] = useState(null);

  useEffect(() => {
    const fetchRates = async () => {
      try {
        const response = await fetch("http://localhost:3001/api/exchange");
        if (!response.ok) throw new Error("Failed to fetch exchange rates");
        const data = await response.json();
        setRates(data);
      } catch (error) {
        console.error("Error fetching exchange rates:", error);
      }
    };
    fetchRates();
  }, []);

  return (
    <div className="exchange-panel">
      <h2>為替レート</h2>
      {rates ? (
        <div>
          <p>USD/JPY: {rates.USD_JPY} 円</p>
          <p>EUR/JPY: {rates.EUR_JPY} 円</p>
        </div>
      ) : (
        <p>読み込み中...</p>
      )}
    </div>
  );
};

const StockPanel = ({ symbol, onRemove, isDefault }) => {
  const [stockData, setStockData] = useState(null);
  const [historicalData, setHistoricalData] = useState([]);
  const [aiOpinion, setAiOpinion] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const [loading, setLoading] = useState(false); // 待機状態を示すフラグ

  const fetchStockData = async (symbol) => {
    try {
      const response = await fetch(`http://localhost:3001/api/stock/${symbol}`);
      if (!response.ok) throw new Error("Failed to fetch stock data");
      const data = await response.json();
      setStockData(data);
    } catch (error) {
      console.error("Error fetching stock data:", error);
    }
  };

  const fetchHistoricalData = async (symbol) => {
    try {
      const response = await fetch(
        `http://localhost:3001/api/historical/${symbol}`
      );
      if (!response.ok) throw new Error("Failed to fetch historical data");
      const data = await response.json();
      const formattedData = data.slice(-7).map((entry) => ({
        date: entry.date.split("T")[0],
        price: entry.close,
      }));
      setHistoricalData(formattedData);
    } catch (error) {
      console.error("Error fetching historical data:", error);
    }
  };

  const fetchAiOpinion = async () => {
    if (!stockData) return;
    setLoading(true); // 待機中状態を開始

    try {
      const response = await fetch("http://localhost:3001/api/gemini", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          symbol: stockData.symbol,
          name: stockData.longName,
        }),
      });
      if (!response.ok) throw new Error("Failed to fetch AI opinion");
      const data = await response.json();
      setAiOpinion(data.analysis);
      setShowPopup(true);
    } catch (error) {
      console.error("Error fetching AI opinion:", error);
    } finally {
      setLoading(false); // 待機中状態を終了
    }
  };

  useEffect(() => {
    fetchStockData(symbol);
    fetchHistoricalData(symbol);
  }, [symbol]);

  return (
    <div className="stock-panel">
      <h3>{stockData ? `${stockData.longName} (${symbol})` : symbol}</h3>
      {stockData ? (
        <div>
          <p>
            価格: {stockData.regularMarketPrice}{" "}
            {stockData.currency === "JPY" ? "円" : "USD"}
          </p>
          <p
            style={{
              color: stockData.regularMarketChange >= 0 ? "green" : "red",
            }}
          >
            前日比: {stockData.regularMarketChange}{" "}
            {stockData.currency === "JPY" ? "円" : "USD"} (
            {stockData.regularMarketChangePercent.toFixed(2)}%)
          </p>
          {!isDefault && <button onClick={() => onRemove(symbol)}>削除</button>}
          <button onClick={fetchAiOpinion}>AIアドバイス</button>
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={historicalData}>
              <XAxis dataKey="date" />
              <YAxis domain={["auto", "auto"]} />
              <Tooltip />
              <Line type="monotone" dataKey="price" stroke="#8884d8" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      ) : (
        <p>読み込み中...</p>
      )}

      {/* ポップアップ表示部分 */}
      {showPopup && (
        <div className="popup-overlay">
          <div className="popup-content">
            <p>{aiOpinion}</p>
            <button onClick={() => setShowPopup(false)}>閉じる</button>
          </div>
        </div>
      )}

      {/* 待機中の表示 */}
      {loading && (
        <div className="loading-overlay">
          <p>AIの見解を取得中...</p>
        </div>
      )}
    </div>
  );
};

const StockTracker = () => {
  const [stocks, setStocks] = useState(() => {
    const savedStocks = JSON.parse(localStorage.getItem(STOCK_KEY));
    return savedStocks ? savedStocks : [...DEFAULT_STOCKS];
  });
  const [newStock, setNewStock] = useState("");
  const [updateInterval, setUpdateInterval] = useState(() => {
    return Number(localStorage.getItem(UPDATE_KEY)) || DEFAULT_UPDATE_INTERVAL;
  });
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    localStorage.setItem(STOCK_KEY, JSON.stringify(stocks));
  }, [stocks]);

  useEffect(() => {
    localStorage.setItem(UPDATE_KEY, updateInterval);
  }, [updateInterval]);

  const addStock = async () => {
    if (!newStock || stocks.includes(newStock)) return;

    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 5000);

      const response = await fetch(
        `http://localhost:3001/api/stock/${newStock}`,
        { signal: controller.signal }
      );
      clearTimeout(timeoutId);

      if (!response.ok) {
        throw new Error(`Fetch failed: ${response.status}`);
      }

      setStocks([...stocks, newStock]);
      setNewStock("");
      setErrorMessage("");
    } catch (error) {
      setErrorMessage(
        "銘柄を取得できませんでした。ティッカーコードを確認してください。"
      );
    }
  };

  const removeStock = (symbol) => {
    setStocks(stocks.filter((stock) => stock !== symbol));
  };

  return (
    <div>
      <Clock />
      <ExchangeRatePanel />
      <div>
        <h2>マイ銘柄</h2>
        <input
          value={newStock}
          onChange={(e) => setNewStock(e.target.value)}
          placeholder="ティッカーコード (例: AAPL, TSLA, ^N225)"
        />
        <button onClick={addStock}>追加</button>
        <p>例: トヨタ `7203.T`, Apple `AAPL`</p>
        {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
      </div>
      <div>
        <label>更新頻度: </label>
        <select
          value={updateInterval}
          onChange={(e) => setUpdateInterval(Number(e.target.value))}
        >
          <option value={60000}>1分</option>
          <option value={300000}>5分</option>
          <option value={1800000}>30分</option>
          <option value={3600000}>60分</option>
          <option value={0}>更新しない</option>
        </select>
      </div>
      <div className="stock-container">
        {stocks.map((symbol) => (
          <StockPanel
            key={symbol}
            symbol={symbol}
            onRemove={removeStock}
            isDefault={DEFAULT_STOCKS.includes(symbol)}
          />
        ))}
      </div>
    </div>
  );
};

export default StockTracker;
