import { useState } from 'react';
const SymbolSearch = ({ markets }) => {
    const [searchSymbol, setSearchSymbol] = useState('');
    const [matchedSymbols, setMatchedSymbols] = useState([]);

    const handleSearch = symbol => {
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

        setMatchedSymbols(matchingSymbols);
    };

    return (
        <div className="relative">
            <input
                type="text"
                className="w-64 px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
                placeholder="Enter a symbol..."
                value={searchSymbol}
                onChange={e => handleSearch(e.target.value)}
            />
            {matchedSymbols.length > 0 ? (
                <div className="absolute mt-2 w-64 bg-white border rounded-lg shadow-md">
                    {matchedSymbols.map((symbol, index) => (
                        <div
                            key={index}
                            className="px-4 py-2 hover:bg-blue-100 cursor-pointer"
                            onClick={() => handleSearch(symbol)}
                        >
                            {symbol}
                        </div>
                    ))}
                </div>
            ) : (
                <div className="absolute mt-2 w-64 bg-white border rounded-lg shadow-md">
                    <div className="px-4 py-2 hover:bg-blue-100 cursor-pointer">No matches found</div>
                </div>
            )}
        </div>
    );
};

export default SymbolSearch;
