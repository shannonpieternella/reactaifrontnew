import React from "react";
import "./NoSubscription.css";

const NoSubscription = () => {
    return (
        <div className="background">
            {/* Bewegende Achtergrondvormen */}
            <div className="shape circle"></div>
            <div className="shape square">
                <div className="triangle"></div>
            </div>

            {/* Inhoud */}
            <div className="container no-subscription">
                <h1 className="title">Subscription Required</h1>
                <p className="subtitle">
                    You don’t have an active subscription. Activate one of our plans to continue enjoying our services.
                </p>
                <div className="buttons">
                    <a
                        href="https://buy.stripe.com/test_fZe3egeBwecYbFS3cc"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="button pay-button"
                    >
                        Activate Subscription
                    </a>
                    
                </div>
                <p className="footer-text">
                    Have questions? Visit our <a href="#" className="link">Help Center</a>.
                </p>
            </div>
        </div>
    );
};

export default NoSubscription;
