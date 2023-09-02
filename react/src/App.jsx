import SymbolSearch from './components/SymbolSearch';
import { GlobalProvider } from './components/Global';
import { LineChart } from './components/LineChart';

function App() {
    return (
        <GlobalProvider>
            <div className="min-h-screen flex flex-col items-center justify-start">
                <SymbolSearch />
                <LineChart />
            </div>
        </GlobalProvider>
    );
}

export default App;
