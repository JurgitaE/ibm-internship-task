import { createContext, useEffect, useState } from 'react';
import { format } from 'date-fns';
export const Global = createContext();

export const GlobalProvider = ({ children }) => {
    const [searchSymbol, setSearchSymbol] = useState('');
    const [matchedSymbols, setMatchedSymbols] = useState([]);
    const [inputValid, setInputValid] = useState(true);
    const [chartData, setChartData] = useState('');

    const [data, setData] = useState('');
    useEffect(() => {
        if (chartData) {
            const formattedLabels = chartData.data.map(item => {
                const timestamp = item[0]; // Assuming timestamps are in the 1st column
                const date = new Date(timestamp);
                return format(date, 'dd-MM');
            });
            const closingPrices = chartData.data.map(item => item[4]);
            setData([
                {
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
                },
                {
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
//   const historicalData = await fetchHistoricalData(symbol);
// setChartData({ symbol, data: historicalData });
