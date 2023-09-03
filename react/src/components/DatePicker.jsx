import { format } from 'date-fns';
import { Global } from './Global';
import { useContext } from 'react';
import ccxt from 'ccxt';
import { startDateValidation, endDateValidation } from '../helper-functions/dateValidation';

export const DatePicker = () => {
    const { startDate, setStartDate, endDate, setEndDate, chartData, setChartData } = useContext(Global);

    async function fetchHistoricalData(symbol, since, limit) {
        const binance = new ccxt.binance();
        const ohlcv = await binance.fetchOHLCV(symbol, '1d', since, limit);
        return ohlcv;
    }

    const drawChartHandler = async (start, end) => {
        end = endDateValidation(end);
        start = startDateValidation(start, end);
        if (end > start) {
            try {
                const historicalData = await fetchHistoricalData(
                    chartData.symbol,
                    start,
                    Math.floor((end - start) / (1000 * 60 * 60 * 24) + 1)
                );
                setChartData(chartData => ({ ...chartData, data: historicalData }));
                setStartDate(start);
                setEndDate(end);
            } catch (error) {
                console.error('Error fetching historical data:', error);
            }
        }
    };
    return (
        chartData && (
            <div className="w-full flex flex-col items-center justify-center xs:flex-row">
                <div className="flex flex-col items-center justify-center xs:flex-row m-3">
                    <div className="flex items-center justify-center m-1">
                        <label htmlFor="start-date" className="font-bold">
                            Start:
                        </label>
                        <input
                            type="date"
                            name="start-date"
                            id="start-date"
                            max={`${format(Date.now(), 'Y-MM-dd')}`}
                            className="w-full rounded border p-2"
                            value={`${startDate ? format(startDate, 'Y-MM-dd') : ''}`}
                            onChange={e =>
                                setStartDate(e.target.value !== '' ? new Date(e.target.value).getTime() : '')
                            }
                        />
                    </div>

                    <div className="flex items-center justify-center m-1">
                        <label htmlFor="end-date" className="font-bold">
                            End:
                        </label>
                        <input
                            type="date"
                            name="end-date"
                            id="end-date"
                            max={`${format(Date.now(), 'Y-MM-dd')}`}
                            value={`${endDate ? format(endDate, 'Y-MM-dd') : ''}`}
                            className="w-full rounded border p-2"
                            onChange={e => setEndDate(e.target.value !== '' ? new Date(e.target.value).getTime() : '')}
                        />
                    </div>
                </div>
                <div className="p-1">
                    <input
                        id="add-button"
                        type="submit"
                        value="Add"
                        className="px-4 py-2  bg-blue-500 text-white rounded hover:bg-blue-600 cursor-pointer"
                        onClick={() => drawChartHandler(startDate, endDate)}
                    />
                </div>
            </div>
        )
    );
};
