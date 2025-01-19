import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom"; // Import for navigation
import axios from "axios";
import "./TradingAssistant.css"; // Custom CSS for styling
import TradeParameters from "./TradeParameters"; // Import the new component

const App = () => {
  const [analysis, setAnalysis] = useState("");
  const [audioUrl, setAudioUrl] = useState("");
  const [tradeParams, setTradeParams] = useState({
    stopLoss: "100.00",
    entryPrice: "150.00",
    takeProfit: "200.00",
  });
  const audioPlayerRef = useRef(null);
  const widgetContainerRef = useRef(null);
  const navigate = useNavigate(); // Hook for navigation

  const fetchAnalysis = async () => {
    try {
      const response = await axios.get("http://91.107.226.186:5000/ai-mentor");
      const updatedAudioUrl = `http://91.107.226.186:5000/analysis.mp3?t=${Date.now()}`;
      setAnalysis(response.data.analysis);
      setAudioUrl(updatedAudioUrl);
    } catch (error) {
      console.error("Error fetching analysis:", error.message);
    }
  };

  const handleLogout = () => {
    // Clear user data from localStorage
    localStorage.removeItem("authToken");
    localStorage.removeItem("hasActiveSubscription");

    // Redirect to the login page
    navigate("/login");
  };

  useEffect(() => {
    fetchAnalysis();
    const intervalId = setInterval(fetchAnalysis, 60000);
    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    if (audioUrl && audioPlayerRef.current) {
      audioPlayerRef.current.src = audioUrl;
      audioPlayerRef.current.load();
      audioPlayerRef.current.play().catch((err) => {
        console.error("Error playing audio:", err.message);
      });
    }
  }, [audioUrl]);

  useEffect(() => {
    if (widgetContainerRef.current) {
      new window.TradingView.widget({
        container_id: "tradingview-widget",
        autosize: true,
        symbol: "BLACKBULL:NAS100",
        interval: "15",
        timezone: "America/New_York",
        theme: "dark",
        style: "1",
        locale: "en",
        toolbar_bg: "#1e1e1e",
        enable_publishing: false,
        allow_symbol_change: true,
        hideideas: true,
        studies: [],
      });
    }
  }, []);

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <h1>AI Mentor Trading Assistant</h1>
        <p>Your Intelligent Trading Partner</p>
        {/* Logout Button */}
        <button onClick={handleLogout} className="logout-button">
          Logout
        </button>
      </div>

      <div className="dashboard-body">
        <div className="analysis-section">
          <h2>Analysis</h2>
          <p>{analysis || "Loading analysis..."}</p>
        </div>

        <div className="audio-section">
          <h2>Audio Guidance</h2>
          <audio ref={audioPlayerRef} controls>
            <source src={audioUrl} type="audio/mpeg" />
            Your browser does not support the audio element.
          </audio>
        </div>

        <div className="tradingview-section">
          <h2>Trading Chart</h2>
          <div ref={widgetContainerRef} id="tradingview-widget" className="tradingview-widget"></div>
        </div>

        {/* Trade Parameters */}
        <TradeParameters
          stopLoss={tradeParams.stopLoss}
          entryPrice={tradeParams.entryPrice}
          takeProfit={tradeParams.takeProfit}
        />
      </div>

      <div className="dashboard-footer">
        <p>
          Powered by <span className="brand">UpsellFX</span>
        </p>
      </div>
    </div>
  );
};

export default App;
