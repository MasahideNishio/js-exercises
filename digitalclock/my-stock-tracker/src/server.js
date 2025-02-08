import express from "express";
import cors from "cors";
import yahooFinance from "yahoo-finance2";

const app = express();
app.use(cors()); // CORS を許可
app.use(express.json());

// 株価の最新データ取得
app.get("/api/stock/:symbol", async (req, res) => {
  try {
    const symbol = req.params.symbol;
    console.log(`Fetching stock data for: ${symbol}`);
    const data = await yahooFinance.quote(symbol);
    res.json(data);
  } catch (error) {
    console.error("Stock fetch error:", error);
    res.status(500).json({ error: "Failed to fetch stock data" });
  }
});

// **履歴データの取得 (新規追加)**
app.get("/api/historical/:symbol", async (req, res) => {
  try {
    const symbol = decodeURIComponent(req.params.symbol);
    console.log("Fetching historical data for:", symbol);

    const today = new Date();
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(today.getDate() - 7); // 7日前

    const result = await yahooFinance.historical(symbol, {
      period1: sevenDaysAgo.toISOString().split("T")[0], // 7日前
      period2: today.toISOString().split("T")[0], // 今日
      interval: "1d",
    });

    const formattedData = result.map((entry) => ({
      date:
        entry.date instanceof Date
          ? entry.date.toISOString().split("T")[0]
          : "Invalid Date",
      close: entry.close,
    }));

    res.json(formattedData);
  } catch (error) {
    console.error("Error fetching historical data:", error);
    res.status(500).json({ error: "Failed to fetch historical data" });
  }
});

const PORT = 3001;
app.listen(PORT, () =>
  console.log(`Server running on http://localhost:${PORT}`)
);
