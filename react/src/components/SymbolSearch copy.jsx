// v1

/* 
import { useContext, useEffect, useState } from 'react';
import ccxt from 'ccxt';
import { Global } from './Global';
import Chart from 'chart.js/auto';
import { format } from 'date-fns';

const SymbolSearch = ({ markets }) => {
    const {
        searchSymbol,
        setSearchSymbol,
        matchedSymbols,
        setMatchedSymbols,
        inputValid,
        setInputValid,
        chartData,
        setChartData,
    } = useContext(Global);

    const handleSearch = symbol => {
        if (symbol.length <= 30) {
            setSearchSymbol(symbol);

            const matchingSymbols = markets
                .map(market => market.symbol)
                .filter(s => s.toLowerCase().includes(symbol.toLowerCase()))
                .sort((a, b) => {
                    a = a.toLowerCase();
                    b = b.toLowerCase();
                    if (a.startsWith(symbol) && !b.startsWith(symbol)) {
                        return -1;
                    } else if (b.startsWith(symbol) && !a.startsWith(symbol)) {
                        return 1;
                    } else {
                        return a > b ? 1 : -1;
                    }
                });

            setMatchedSymbols(symbol.length ? matchingSymbols : '');
            setInputValid(true);
        } else {
            setInputValid(false);
        }
    };

    async function fetchHistoricalData(symbol) {
        const binance = new ccxt.binance();
        const since = Date.now() - 30 * 24 * 60 * 60 * 1000; // 30 days ago in milliseconds

        // Fetch daily data for the past 30 days
        const ohlcv = await binance.fetchOHLCV(symbol, '1d', since);
        return ohlcv;
    }

    const handleSelect = async symbol => {
        try {
            console.log('Symbol: ', symbol);
            setSearchSymbol('');
            setMatchedSymbols([]);

            // Fetch historical data
            const historicalData = await fetchHistoricalData(symbol);
            setChartData({ symbol, data: historicalData });

            console.log('Historical Data:', historicalData);
        } catch (error) {
            console.error('Error fetching historical data:', error);
        }
    };

    const drawChart = obj => {
        const { data, symbol } = obj;
        const chartCanvas = document.getElementById('chart');
        const ctx = chartCanvas.getContext('2d');

        chartCanvas.chart && chartCanvas.chart.destroy();

        // Extract closing prices from the historical data
        const closingPrices = data.map(item => item[4]); // Assuming closing prices are in the 5th column

        const formattedLabels = data.map(item => {
            const timestamp = item[0]; // Assuming timestamps are in the 1st column
            const date = new Date(timestamp);
            return format(date, 'dd-MM');
        });

        new Chart(ctx, {
            type: 'line',
            data: {
                labels: formattedLabels,
                datasets: [
                    {
                        label: 'Closing Prices',
                        data: closingPrices,
                        borderColor: 'rgba(75, 192, 192, 1)',
                        borderWidth: 1,
                        fill: false,
                    },
                ],
            },
            options: {
                responsive: false,
                maintainAspectRatio: false,
                scales: {
                    x: {
                        title: {
                            display: true,
                            text: 'Days',
                        },
                    },
                    y: {
                        title: {
                            display: true,
                            text: symbol,
                        },
                    },
                },
            },
        });
    };

    useEffect(() => {
        if (chartData) {
            drawChart(chartData);
        }
    }, [chartData]);

    return (
        <div className="relative xs:w-64 w-full  ">
            {!inputValid && (
                <div className="absolute top-[-20px] text-[10px] text-red-600 mt-1">
                    *Input should not exceed 30 characters!
                </div>
            )}
            <input
                type="text"
                className={`xs:w-64 w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring ${
                    inputValid ? ' focus:border-blue-300' : 'focus:ring-transparent focus:border-red-500'
                }`}
                placeholder="Enter a symbol..."
                value={searchSymbol}
                onChange={e => handleSearch(e.target.value)}
            />
            {matchedSymbols.length > 0 ? (
                <div className="absolute mt-2  xs:w-64 w-full max-h-[80vh] overflow-y-auto bg-white border rounded-lg shadow-md">
                    {matchedSymbols.map((symbol, index) => (
                        <div
                            key={index}
                            className="px-4 py-2 hover:bg-blue-100 cursor-pointer"
                            onClick={() => handleSelect(symbol)}
                        >
                            {symbol}
                        </div>
                    ))}
                </div>
            ) : searchSymbol !== '' ? (
                <div className="absolute mt-2  xs:w-64 w-full bg-white border rounded-lg shadow-md">
                    <div className="px-4 py-2 ">No matches found</div>
                </div>
            ) : null}
            <canvas id="chart" width="400" height="200"></canvas>
        </div>
    );
};

export default SymbolSearch; */

// v2--------------------------------------------------------------------------------------
/* 
import { useContext, useEffect, useState } from 'react';
import ccxt from 'ccxt';
import { Global } from './Global';
import { Line } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    Title,
    Tooltip,
    LineElement,
    Legend,
    CategoryScale,
    LinearScale,
    PointElement,
    Filler,
} from 'chart.js';
ChartJS.register(Title, Tooltip, LineElement, Legend, CategoryScale, LinearScale, PointElement, Filler);
import { format } from 'date-fns';

const SymbolSearch = ({ markets }) => {
    const {
        searchSymbol,
        setSearchSymbol,
        matchedSymbols,
        setMatchedSymbols,
        inputValid,
        setInputValid,
        chartData,
        setChartData,
    } = useContext(Global);

    const [data, setData] = useState('');

    const handleSearch = symbol => {
        if (symbol.length <= 30) {
            setSearchSymbol(symbol);

            const matchingSymbols = markets
                .map(market => market.symbol)
                .filter(s => s.toLowerCase().includes(symbol.toLowerCase()))
                .sort((a, b) => {
                    a = a.toLowerCase();
                    b = b.toLowerCase();
                    if (a.startsWith(symbol) && !b.startsWith(symbol)) {
                        return -1;
                    } else if (b.startsWith(symbol) && !a.startsWith(symbol)) {
                        return 1;
                    } else {
                        return a > b ? 1 : -1;
                    }
                });

            setMatchedSymbols(symbol.length ? matchingSymbols : '');
            setInputValid(true);
        } else {
            setInputValid(false);
        }
    };

    async function fetchHistoricalData(symbol) {
        const binance = new ccxt.binance();
        const since = Date.now() - 30 * 24 * 60 * 60 * 1000; // 30 days ago in milliseconds

        // Fetch daily data for the past 30 days
        const ohlcv = await binance.fetchOHLCV(symbol, '1d', since);
        return ohlcv;
    }

    const handleSelect = async symbol => {
        try {
            console.log('Symbol: ', symbol);
            setSearchSymbol('');
            setMatchedSymbols([]);

            // Fetch historical data
            const historicalData = await fetchHistoricalData(symbol);
            setChartData({ symbol, data: historicalData });

            console.log('Historical Data:', historicalData);
        } catch (error) {
            console.error('Error fetching historical data:', error);
        }
    };

    useEffect(() => {
        if (chartData) {
            const formattedLabels = chartData.data.map(item => {
                const timestamp = item[0]; // Assuming timestamps are in the 1st column
                const date = new Date(timestamp);
                return format(date, 'dd-MM');
            });
            const closingPrices = chartData.data.map(item => item[4]);
            setData({
                labels: formattedLabels,
                datasets: [
                    {
                        label: 'Closing prices',
                        data: closingPrices,
                        backgroundColor: 'yellow',
                        borderColor: 'green',
                        tension: 0.4,
                        fill: true,
                        pointStyle: 'rect',
                        pointBorderColor: 'blue',
                        pointBackgroundColor: '#fff',
                        showLine: true,
                    },
                ],
            });
        }
    }, [chartData]);
    return (
        <div className="relative  w-full  ">
            {!inputValid && (
                <div className="absolute top-[-20px] text-[10px] text-red-600 mt-1">
                    *Input should not exceed 30 characters!
                </div>
            )}
            <input
                type="text"
                className={`xs:w-64 w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring ${
                    inputValid ? ' focus:border-blue-300' : 'focus:ring-transparent focus:border-red-500'
                }`}
                placeholder="Enter a symbol..."
                value={searchSymbol}
                onChange={e => handleSearch(e.target.value)}
            />
            {matchedSymbols.length > 0 ? (
                <div className="absolute mt-2   w-full max-h-[80vh] overflow-y-auto bg-white border rounded-lg shadow-md">
                    {matchedSymbols.map((symbol, index) => (
                        <div
                            key={index}
                            className="px-4 py-2 hover:bg-blue-100 cursor-pointer"
                            onClick={() => handleSelect(symbol)}
                        >
                            {symbol}
                        </div>
                    ))}
                </div>
            ) : searchSymbol !== '' ? (
                <div className="absolute mt-2  xs:w-64 w-full bg-white border rounded-lg shadow-md">
                    <div className="px-4 py-2 ">No matches found</div>
                </div>
            ) : null}
            {data && (
                <Line data={data} width="800" height="400">
                    Hello
                </Line>
            )}
        </div>
    );
};

export default SymbolSearch;

 */
