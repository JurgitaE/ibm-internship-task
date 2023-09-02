import SymbolSearch from './components/SymbolSearch';
import { GlobalProvider } from './components/Global';

function App() {
    return (
        <GlobalProvider>
            <div className="min-h-screen bg-red flex items-start justify-center">
                <SymbolSearch />
            </div>
        </GlobalProvider>
    );
}

export default App;
