import { createContext, useState } from 'react';

export const Global = createContext();

export const GlobalProvider = ({ children }) => {
    const [searchSymbol, setSearchSymbol] = useState('');
    const [matchedSymbols, setMatchedSymbols] = useState([]);
    const [inputValid, setInputValid] = useState(true);
    const [chartData, setChartData] = useState('');
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
            }}
        >
            {children}
        </Global.Provider>
    );
};
//   const historicalData = await fetchHistoricalData(symbol);
// setChartData({ symbol, data: historicalData });
