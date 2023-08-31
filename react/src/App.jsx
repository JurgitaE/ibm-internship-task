import { useEffect, useState } from 'react';
import ccxt from 'ccxt';

import './App.css';

function App() {
    const [availableTradingPairs, setAvailableTradingPairs] = useState([]);

    useEffect(() => {
        async function fetchTradingPairs() {
            try {
                const exchange = new ccxt.binance();
                const markets = await exchange.fetchMarkets();

                const tradingPairs = markets.map(market => market.symbol);
                setAvailableTradingPairs(tradingPairs);
                console.log(tradingPairs);
            } catch (error) {
                console.error('Error fetching trading pairs:', error);
                setAvailableTradingPairs([]);
            }
        }

        fetchTradingPairs();
    }, []);

    console.log('Available Trading Pairs:', availableTradingPairs);
    return (
        <>
            {availableTradingPairs.map((pair, index) => {
                return <p key={index}>{pair}</p>;
            })}
        </>
    );
}

export default App;
