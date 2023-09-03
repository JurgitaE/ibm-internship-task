import SymbolSearch from './components/SymbolSearch';
import { GlobalProvider } from './components/Global';
import { LineChart } from './components/LineChart';
import { DatePicker } from './components/DatePicker';

function App() {
    return (
        <GlobalProvider>
            <div className="flex flex-col items-center justify-start min-h-[700px]">
                <SymbolSearch />
                <DatePicker />
                <LineChart />
            </div>
        </GlobalProvider>
    );
}

export default App;
