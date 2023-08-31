import { useEffect, useState } from 'react';
import ccxt from 'ccxt';

import SymbolSearch from './components/SymbolSearch';

function App() {
    const [availableTradingPairs, setAvailableTradingPairs] = useState([]);

    useEffect(() => {
        async function fetchTradingPairs() {
            try {
                const exchange = new ccxt.binance();
                //  console.log(exchange); /* exchange sturcture in docs */
                const markets = await exchange.fetchMarkets();
                console.log(markets);
                /*                
                 https://github.com/ccxt/ccxt/wiki/Manual#market-structure
                https://docs.ccxt.com/#/README?id=market-structure
                 */
                const tradingPairs = markets.map(({ id, symbol, base, lowercaseId }) => {
                    return { id, symbol, base, lowercaseId };
                });
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
        <div className="min-h-screen bg-red flex items-start justify-center">
            <SymbolSearch markets={availableTradingPairs} />
        </div>
    );
}

export default App;
