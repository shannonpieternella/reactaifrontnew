import React, { useState, useEffect } from "react";
import axios from "axios"; // Importeer axios
import "./TradeParameters.css"; // Custom CSS for styling

const TradeParameters = () => {
    const [tradeParams, setTradeParams] = useState({
        stopLoss: 0,
        entryPrice: 0,
        takeProfit: 0,
        biasTrend: "Notrend", // Add initial state for biasTrend
    });
    const [error, setError] = useState(null);

    useEffect(() => {
        // Functie om tradeparameters op te halen van de backend
        const fetchTradeParameters = async () => {
            try {
                const response = await axios.get("http://188.34.157.27:5002/trade-parameters");
                setTradeParams(response.data[0]); // Zet de eerste (en waarschijnlijk enige) tradeparameter in de state
            } catch (error) {
                setError("Fout bij het ophalen van de tradeparameters");
                console.error("Error fetching data:", error);
            }
        };

        // Haal gegevens op bij de eerste render
        fetchTradeParameters();

        // Stel een interval in om de tradeparameters elke 5 seconden opnieuw op te halen
        const intervalId = setInterval(fetchTradeParameters, 5000);

        // Opruimen van het interval wanneer de component unmount (om geheugenlekken te voorkomen)
        return () => clearInterval(intervalId);
    }, []); // Het lege array zorgt ervoor dat de API-aanroep alleen bij de eerste render gebeurt

    return (
        <div className="trade-parameters">
            <h2>Trade Parameters</h2>
            {error && <p className="error">{error}</p>}
            <div className="parameter">
                <span className="label">Stop-Loss:</span>
                <span className="value">{tradeParams.stopLoss}</span>
            </div>
            <div className="parameter">
                <span className="label">Entry Price:</span>
                <span className="value">{tradeParams.entryPrice}</span>
            </div>
            <div className="parameter">
                <span className="label">Take Profit:</span>
                <span className="value">{tradeParams.takeProfit}</span>
            </div>
            <div className="parameter">
                <span className="label">Bias Trend:</span>
                <span className="value">{tradeParams.biasTrend}</span>
            </div>
        </div>
    );
};

export default TradeParameters;
