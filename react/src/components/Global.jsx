import { createContext, useEffect, useState } from 'react';
import { format } from 'date-fns';
import ccxt from 'ccxt';
export const Global = createContext();

export const GlobalProvider = ({ children }) => {
    const [availableTradingPairs, setAvailableTradingPairs] = useState([]);
    const [searchSymbol, setSearchSymbol] = useState('');
    const [matchedSymbols, setMatchedSymbols] = useState([]);
    const [inputValid, setInputValid] = useState(true);
    const [historicalData, setHistoricalData] = useState('');
    const [chartSetup, setChartSetup] = useState('');
    const [timer, setTimer] = useState(null);
    //set 3 hours according to picker default
    const [startDate, setStartDate] = useState(new Date(Date.now() - 29 * 24 * 60 * 60 * 1000).setHours(3, 0, 0, 0));
    const [endDate, setEndDate] = useState(Date.now());

    useEffect(() => {
        async function fetchTradingPairs() {
            try {
                const exchange = new ccxt.binance(); //exchange structure in docs
                const market = await exchange.fetchMarkets(); //market structure in docs
                const tradingPairs = market.map(({ id, symbol, base, lowercaseId }) => {
                    return { id, symbol, base, lowercaseId };
                });

                setAvailableTradingPairs(tradingPairs);
            } catch (error) {
                console.error('Error fetching trading pairs:', error);
                setAvailableTradingPairs([]);
            }
        }

        fetchTradingPairs();
    }, []);

    useEffect(() => {
        if (historicalData) {
            const formattedLabels = historicalData.data.map(item => {
                const timestamp = item[0];
                const date = new Date(timestamp);
                return format(date, 'Y-MM-dd');
            });
            const closingPrices = historicalData.data.map(item => item[4]);
            setChartSetup([
                {
                    labels: formattedLabels,
                    datasets: [
                        {
                            label: 'Daily closing prices',
                            data: closingPrices,
                            backgroundColor: 'rgba(135, 206, 236, 0.5)',
                            borderColor: 'blue',
                            borderWidth: 1,
                            tension: 0.1,
                            fill: true,
                            pointStyle: 'rect',
                            pointBorderColor: 'transparent',
                            pointBackgroundColor: 'transparent',
                            showLine: true,
                        },
                    ],
                },
                {
                    maintainAspectRatio: false,
                    responsive: true,
                },
            ]);
        }
    }, [historicalData]);

    return (
        <Global.Provider
            value={{
                availableTradingPairs,
                setAvailableTradingPairs,
                searchSymbol,
                setSearchSymbol,
                matchedSymbols,
                setMatchedSymbols,
                inputValid,
                setInputValid,
                historicalData,
                setHistoricalData,
                chartSetup,
                setChartSetup,
                startDate,
                setStartDate,
                endDate,
                setEndDate,
                timer,
                setTimer,
            }}
        >
            {children}
        </Global.Provider>
    );
};
