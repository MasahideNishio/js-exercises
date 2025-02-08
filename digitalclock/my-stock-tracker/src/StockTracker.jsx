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

const Clock = () => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  return <h2>{time.toLocaleString("ja-JP", { hour12: false })}</h2>;
};

const StockPanel = ({ symbol, onRemove }) => {
  const [stockData, setStockData] = useState(null);
  const [historicalData, setHistoricalData] = useState([]);

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

  useEffect(() => {
    fetchStockData(symbol);
    fetchHistoricalData(symbol);
  }, [symbol]);

  return (
    <div className="stock-panel">
      <h3>{symbol}</h3>
      {stockData ? (
        <div>
          <p>価格: {stockData.regularMarketPrice} 円</p>
          <p>
            前日比: {stockData.regularMarketChange} 円 (
            {stockData.regularMarketChangePercent.toFixed(2)}%)
          </p>
          <button onClick={() => onRemove(symbol)}>削除</button>
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
    </div>
  );
};

const StockTracker = () => {
  const [stocks, setStocks] = useState(() => {
    const savedStocks = JSON.parse(localStorage.getItem(STOCK_KEY));
    return savedStocks ? savedStocks : ["^N225"];
  });
  const [newStock, setNewStock] = useState("");
  const [updateInterval, setUpdateInterval] = useState(() => {
    return Number(localStorage.getItem(UPDATE_KEY)) || DEFAULT_UPDATE_INTERVAL;
  });

  useEffect(() => {
    localStorage.setItem(STOCK_KEY, JSON.stringify(stocks));
  }, [stocks]);

  useEffect(() => {
    localStorage.setItem(UPDATE_KEY, updateInterval);
  }, [updateInterval]);

  const addStock = () => {
    if (newStock && !stocks.includes(newStock)) {
      setStocks([...stocks, newStock]);
      setNewStock("");
    }
  };

  const removeStock = (symbol) => {
    setStocks(stocks.filter((stock) => stock !== symbol));
  };

  return (
    <div>
      <Clock />
      <div>
        <input
          value={newStock}
          onChange={(e) => setNewStock(e.target.value)}
          placeholder="ティッカーコード (例: AAPL, TSLA, ^N225)"
        />
        <button onClick={addStock}>追加</button>
        <p>例: トヨタ `7203.T`, S&P500 `^GSPC`, Apple `AAPL`</p>
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
          <StockPanel key={symbol} symbol={symbol} onRemove={removeStock} />
        ))}
      </div>
    </div>
  );
};

export default StockTracker;
