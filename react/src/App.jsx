import './App.scss';
import SymbolSearch from './components/SymbolSearch';
import { GlobalProvider } from './components/Global';
import { LineChart } from './components/LineChart';
import { DatePicker } from './components/DatePicker';

function App() {
    return (
        <GlobalProvider>
            <h1 className="mb-5 font-bold text-[24px] xs:block hidden">CryptoChart app</h1>
            <div className="flex flex-col items-center justify-start  max-w-[900px] w-full xs:w-4/5">
                <SymbolSearch />
                <DatePicker />
                <LineChart />
            </div>
        </GlobalProvider>
    );
}

export default App;
