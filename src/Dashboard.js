import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Dashboard.css";
import { API_BASE_URL } from "./apiConfig";

const Dashboard = () => {
    const [tradeParameters, setTradeParameters] = useState({
        stopLoss: 0,
        entryPrice: 0,
        takeProfit: 0,
        biasTrend: "Notrend",
    });
    const [prompt, setPrompt] = useState("");
    const [message, setMessage] = useState("");

    // Fetch data on mount
    useEffect(() => {
        const fetchData = async () => {
            try {
                const tradeResponse = await axios.get(`${API_BASE_URL}/api/trade-parameters`);
                setTradeParameters(tradeResponse.data);
                const promptResponse = await axios.get(`${API_BASE_URL}/api/prompt`);
                setPrompt(promptResponse.data.content);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
    }, []);

    // Handle trade parameters change
    const handleTradeChange = (e) => {
        setTradeParameters({
            ...tradeParameters,
            [e.target.name]: e.target.value,
        });
    };

    // Handle form submission for trade parameters and sending signal to Discord
    const handleTradeSubmit = async () => {
        try {
            // Save trade parameters to the backend
            const response = await axios.put(
                `${API_BASE_URL}/api/trade-parameters`,
                tradeParameters
            );

            // If successful, send the data to the Discord webhook
            if (response.status === 200) {
                const discordResponse = await axios.post(
                    `${API_BASE_URL}/api/discord-signal`,
                    {
                        stopLoss: tradeParameters.stopLoss,
                        entryPrice: tradeParameters.entryPrice,
                        takeProfit: tradeParameters.takeProfit,
                        biasTrend: tradeParameters.biasTrend,
                    }
                );

                if (discordResponse.status === 200) {
                    setMessage("Trade parameters updated and signal sent to Discord!");
                } else {
                    setMessage("Trade parameters updated but failed to send signal to Discord.");
                }
            }
        } catch (error) {
            console.error("Error updating trade parameters or sending signal:", error);
            setMessage("Failed to update trade parameters and send signal.");
        }
    };

    // Handle prompt update
    const handlePromptChange = (e) => {
        setPrompt(e.target.value);
    };

    const handlePromptSubmit = async () => {
        try {
            await axios.put(`${API_BASE_URL}/api/prompt`, { content: prompt });
            setMessage("Prompt updated successfully!");
        } catch (error) {
            console.error("Error updating prompt:", error);
            setMessage("Failed to update prompt.");
        }
    };

    return (
        <div className="dashboard-background">
            <div className="dashboard-container">
                <h1 className="dashboard-title">Admin Dashboard</h1>
                {message && <p className="dashboard-message">{message}</p>}

                <div className="dashboard-section">
                    <h2 className="section-title">Trade Parameters</h2>
                    <div className="input-group">
                        <label>Stop Loss:</label>
                        <input
                            type="number"
                            name="stopLoss"
                            value={tradeParameters.stopLoss}
                            onChange={handleTradeChange}
                        />
                    </div>
                    <div className="input-group">
                        <label>Entry Price:</label>
                        <input
                            type="number"
                            name="entryPrice"
                            value={tradeParameters.entryPrice}
                            onChange={handleTradeChange}
                        />
                    </div>
                    <div className="input-group">
                        <label>Take Profit:</label>
                        <input
                            type="number"
                            name="takeProfit"
                            value={tradeParameters.takeProfit}
                            onChange={handleTradeChange}
                        />
                    </div>
                    <div className="input-group">
                        <label>Bias Trend:</label>
                        <input
                            type="text"
                            name="biasTrend"
                            value={tradeParameters.biasTrend}
                            onChange={handleTradeChange}
                        />
                    </div>
                    <button className="dashboard-button" onClick={handleTradeSubmit}>
                        Save Trade Parameters
                    </button>
                </div>

                <div className="dashboard-section">
                    <h2 className="section-title">Prompt</h2>
                    <textarea
                        className="prompt-input"
                        value={prompt}
                        onChange={handlePromptChange}
                    ></textarea>
                    <button className="dashboard-button" onClick={handlePromptSubmit}>
                        Save Prompt
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
