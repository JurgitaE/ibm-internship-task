import { format } from 'date-fns';
import { Global } from './Global';
import { useContext } from 'react';
import { fetchHistoricalData } from '../helper-functions/fetchHistoricalData';
import { startDateValidation, endDateValidation } from '../helper-functions/dateValidation';

export const DatePicker = () => {
    const { startDate, setStartDate, endDate, setEndDate, historicalData, setHistoricalData } = useContext(Global);

    const drawChartHandler = async (start, end) => {
        end = endDateValidation(end);
        start = startDateValidation(start, end);
        if (end > start) {
            try {
                const requestedData = await fetchHistoricalData(
                    historicalData.symbol,
                    start,
                    Math.floor((end - start) / (1000 * 60 * 60 * 24) + 1)
                );
                setHistoricalData(historicalData => ({ ...historicalData, data: requestedData }));
                setStartDate(start);
                setEndDate(end);
            } catch (error) {
                console.error('Error fetching historical data:', error);
            }
        }
    };
    return (
        historicalData && (
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
                            className="w-full rounded border p-2 focus:outline-none focus:ring  focus:border-blue-300"
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
                            className="w-full rounded border p-2 focus:outline-none focus:ring  focus:border-blue-300"
                            onChange={e => setEndDate(e.target.value !== '' ? new Date(e.target.value).getTime() : '')}
                        />
                    </div>
                </div>
                <div className="p-1">
                    <input
                        id="add-button"
                        type="submit"
                        value="Draw"
                        className="px-4 py-2  bg-blue-500 text-white rounded hover:bg-blue-600 cursor-pointer"
                        onClick={() => drawChartHandler(startDate, endDate)}
                    />
                </div>
            </div>
        )
    );
};
