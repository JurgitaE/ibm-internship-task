import { createContext, useEffect, useState } from 'react';
import { format } from 'date-fns';
import ccxt from 'ccxt';
export const Global = createContext();

export const GlobalProvider = ({ children }) => {
    const [availableTradingPairs, setAvailableTradingPairs] = useState([]);
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

    const [searchSymbol, setSearchSymbol] = useState('');
    const [matchedSymbols, setMatchedSymbols] = useState([]);
    const [inputValid, setInputValid] = useState(true);
    const [chartData, setChartData] = useState('');

    const [data, setData] = useState('');
    useEffect(() => {
        if (chartData) {
            const formattedLabels = chartData.data.map(item => {
                const timestamp = item[0];
                const date = new Date(timestamp);
                return format(date, 'MM-dd');
            });
            const closingPrices = chartData.data.map(item => item[4]);
            setData([
                {
                    labels: formattedLabels,
                    datasets: [
                        {
                            label: 'Closing prices',
                            data: closingPrices,
                            backgroundColor: 'rgba(255, 255, 0, 0.5)',
                            borderColor: 'green',
                            tension: 0.4,
                            fill: true,
                            pointStyle: 'rect',
                            pointBorderColor: 'blue',
                            pointBackgroundColor: '#fff',
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
                                display: true,
                                text: 'Daily chart',
                            },
                        },
                        y: {
                            title: {
                                display: true,
                                text: chartData.symbol,
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
                data,
                setData,
            }}
        >
            {children}
        </Global.Provider>
    );
};
