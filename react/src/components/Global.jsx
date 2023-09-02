import { createContext, useEffect, useState } from 'react';
import { format } from 'date-fns';
import ccxt from 'ccxt';
export const Global = createContext();

export const GlobalProvider = ({ children }) => {
    const [availableTradingPairs, setAvailableTradingPairs] = useState([]);
    const [searchSymbol, setSearchSymbol] = useState('');
    const [matchedSymbols, setMatchedSymbols] = useState([]);
    const [inputValid, setInputValid] = useState(true);
    const [chartData, setChartData] = useState('');
    const [chartSetup, setChartSetup] = useState('');
    const [startDate, setStartDate] = useState(Date.now() - 30 * 24 * 60 * 60 * 1000);
    const [endDate, setEndDate] = useState(Date.now());
    useEffect(() => {
        async function fetchTradingPairs() {
            try {
                const exchange = new ccxt.binance();
                //  console.log(exchange); /* exchange sturcture in docs */
                const markets = await exchange.fetchMarkets();
                // console.log(markets);
                /*                
                 https://github.com/ccxt/ccxt/wiki/Manual#market-structure
                https://docs.ccxt.com/#/README?id=market-structure
                // check
                 */
                const tradingPairs = markets.map(({ id, symbol, base, lowercaseId }) => {
                    return { id, symbol, base, lowercaseId };
                });

                setAvailableTradingPairs(tradingPairs);
                // console.log(tradingPairs);
            } catch (error) {
                console.error('Error fetching trading pairs:', error);
                setAvailableTradingPairs([]);
            }
        }

        fetchTradingPairs();
    }, []);

    useEffect(() => {
        if (chartData) {
            const formattedLabels = chartData.data.map(item => {
                const timestamp = item[0];
                const date = new Date(timestamp);
                return format(date, 'Y-MM-dd');
            });
            const closingPrices = chartData.data.map(item => item[4]);
            setChartSetup([
                {
                    labels: formattedLabels,
                    datasets: [
                        {
                            label: 'Closing prices',
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
                    scales: {
                        x: {
                            grid: {
                                display: false,
                            },
                            title: {
                                // display: true,
                                // text: 'Daily chart',
                            },
                        },
                        y: {
                            title: {
                                // display: true,
                                // text: chartData.symbol,
                                color: 'blue',
                                fontWeight: 'bold',
                            },
                        },
                    },
                },
            ]);
        }
    }, [chartData]);
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
                chartData,
                setChartData,
                chartSetup,
                setChartSetup,
                startDate,
                setStartDate,
                endDate,
                setEndDate,
            }}
        >
            {children}
        </Global.Provider>
    );
};
