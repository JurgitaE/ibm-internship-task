import { format } from 'date-fns';
import { Global } from './Global';
import { useContext } from 'react';
import ccxt from 'ccxt';

export const DatePicker = () => {
    const { startDate, setStartDate, endDate, setEndDate, chartData, setChartData } = useContext(Global);

    async function fetchHistoricalData(symbol, since, limit) {
        const binance = new ccxt.binance();
        const ohlcv = await binance.fetchOHLCV(symbol, '1d', since, limit);
        return ohlcv;
    }
    const drawChartHandler = async () => {
        try {
            const historicalData = await fetchHistoricalData(
                chartData.symbol,
                startDate,
                (endDate - startDate) / (1000 * 60 * 60 * 24) + 1
            );
            setChartData(chartData => ({ ...chartData, data: historicalData }));

            console.log('Historical Data:', historicalData);
        } catch (error) {
            console.error('Error fetching historical data:', error);
        }
    };
    return (
        chartData && (
            <div className="w-full flex flex-col items-center">
                <div className="flex flex-col xs:flex-row my-5">
                    <div className="flex">
                        <label htmlFor="start-date" className="font-bold">
                            Start:
                        </label>
                        <input
                            type="date"
                            name="start-date"
                            id="start-date"
                            max={`${format(endDate, 'Y-MM-dd')}`}
                            className="w-full rounded border p-2"
                            onChange={e => setStartDate(new Date(e.target.value).getTime())}
                        />
                    </div>

                    <div className="flex">
                        <label htmlFor="end-date" className="font-bold">
                            End:
                        </label>
                        <input
                            type="date"
                            name="end-date"
                            id="end-date"
                            value={`${format(endDate, 'Y-MM-dd')}`}
                            max={`${format(endDate, 'Y-MM-dd')}`}
                            className="w-full rounded border p-2"
                            onChange={e => setEndDate(new Date(e.target.value).getTime())}
                        />
                    </div>
                </div>
                <div className="flex justify-center w-full my-2">
                    <input
                        id="add-button"
                        type="submit"
                        value="Add"
                        className="px-4 py-2  bg-blue-500 text-white rounded hover:bg-blue-600 cursor-pointer"
                        onClick={() => endDate >= startDate && drawChartHandler()}
                    />
                </div>
            </div>
        )
    );
};
