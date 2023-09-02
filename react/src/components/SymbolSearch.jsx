import { useContext } from 'react';
import ccxt from 'ccxt';
import { Global } from './Global';
import { LineChart } from './LineChart';

const SymbolSearch = () => {
    const {
        availableTradingPairs,
        searchSymbol,
        setSearchSymbol,
        matchedSymbols,
        setMatchedSymbols,
        inputValid,
        setInputValid,
        setChartData,
    } = useContext(Global);

    const handleSearch = symbol => {
        if (symbol.length <= 30) {
            setSearchSymbol(symbol);

            const matchingSymbols = availableTradingPairs
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

    return (
        <div className="relative  w-full  ">
            {!inputValid && (
                <div className="absolute top-[-20px] text-[10px] text-red-600 mt-1 transform translate-x-1/2 right-1/2">
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
                <div className="absolute mt-2  xs:w-64 w-full max-h-[80vh] overflow-y-auto bg-white border rounded-lg shadow-md transform translate-x-1/2 right-1/2">
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
                <div className="absolute mt-2 xs:w-64 w-full bg-white border rounded-lg shadow-md transform translate-x-1/2 right-1/2">
                    <div className="px-4 py-2 ">No matches found</div>
                </div>
            ) : null}
        </div>
    );
};

export default SymbolSearch;
