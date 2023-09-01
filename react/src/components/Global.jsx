import { createContext, useState } from 'react';

export const Global = createContext();

export const GlobalProvider = ({ children }) => {
    const [searchSymbol, setSearchSymbol] = useState('');
    const [matchedSymbols, setMatchedSymbols] = useState([]);
    const [inputValid, setInputValid] = useState(true);
    const [selectedPair, setSelectedPair] = useState('');
    return (
        <Global.Provider
            value={{
                searchSymbol,
                setSearchSymbol,
                matchedSymbols,
                setMatchedSymbols,
                inputValid,
                setInputValid,
                selectedPair,
                setSelectedPair,
            }}
        >
            {children}
        </Global.Provider>
    );
};
