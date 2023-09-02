import SymbolSearch from './components/SymbolSearch';
import { GlobalProvider } from './components/Global';
import { LineChart } from './components/LineChart';
import { DatePicker } from './components/DatePicker';

function App() {
    return (
        <GlobalProvider>
            <div className="min-h-screen flex flex-col items-center justify-start">
                <SymbolSearch />
                <DatePicker />
                <LineChart />
            </div>
        </GlobalProvider>
    );
}

export default App;
