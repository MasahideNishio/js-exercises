// my-stock-trackerフォルダから実行すること

import express from "express";
import cors from "cors";
import yahooFinance from "yahoo-finance2";
//import axios from "axios";
import dotenv from "dotenv";
import { GoogleGenerativeAI } from "@google/generative-ai";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.post("/api/gemini", async (req, res) => {
  try {
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

    const prompt = `${req.body.symbol} ${req.body.name} の今後の株価動向について見解をください。3行、300文字程度に収まるようにしてください。`;
    console.log(prompt);
    const result = await model.generateContent(prompt);

    console.log(result.response.text());
    if (!result) {
      return res.status(500).json({ error: "No response from Gemini" });
    }

    res.json({ analysis: result.response.text() });
  } catch (error) {
    console.error("Gemini API error:", error.response?.data || error.message);
    res.status(500).json({ error: "Failed to fetch AI analysis" });
  }
});

// 株価の最新データ取得
app.get("/api/stock/:symbol", async (req, res) => {
  try {
    const symbol = req.params.symbol;
    console.log(`Fetching stock data for: ${symbol}`);
    const data = await yahooFinance.quote(symbol);

    if (!data || !data.regularMarketPrice) {
      return res.status(404).json({ error: "Symbol not found" });
    }

    res.json(data);
  } catch (error) {
    console.error("Stock fetch error:", error);
    res.status(500).json({ error: "Failed to fetch stock data" });
  }
});

// 履歴データの取得 (新規追加)
app.get("/api/historical/:symbol", async (req, res) => {
  try {
    const symbol = decodeURIComponent(req.params.symbol);
    console.log("Fetching historical data for:", symbol);

    const today = new Date();
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(today.getDate() - 7);

    const result = await yahooFinance.historical(symbol, {
      period1: sevenDaysAgo.toISOString().split("T")[0],
      period2: today.toISOString().split("T")[0],
      interval: "1d",
    });

    if (!result || result.length === 0) {
      return res.status(404).json({ error: "Historical data not found" });
    }

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

// ✅ 為替情報の取得エンドポイント (新規追加)
app.get("/api/exchange", async (req, res) => {
  try {
    console.log("Fetching exchange rate data...");

    const usdJpy = await yahooFinance.quote("USDJPY=X");
    const eurJpy = await yahooFinance.quote("EURJPY=X");

    if (
      !usdJpy ||
      !usdJpy.regularMarketPrice ||
      !eurJpy ||
      !eurJpy.regularMarketPrice
    ) {
      return res.status(404).json({ error: "Exchange rate data not found" });
    }

    res.json({
      USD_JPY: usdJpy.regularMarketPrice,
      EUR_JPY: eurJpy.regularMarketPrice,
    });
  } catch (error) {
    console.error("Error fetching exchange rate data:", error);
    res.status(500).json({ error: "Failed to fetch exchange rates" });
  }
});

const PORT = 3001;
app.listen(PORT, () =>
  console.log(`Server running on http://localhost:${PORT}`)
);
