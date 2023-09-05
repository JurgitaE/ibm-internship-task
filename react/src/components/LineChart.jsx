import { Line } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    Title,
    Tooltip,
    LineElement,
    Legend,
    CategoryScale,
    LinearScale,
    PointElement,
    Filler,
} from 'chart.js';
import { Global } from './Global';
import { useContext } from 'react';
ChartJS.register(Title, Tooltip, LineElement, Legend, CategoryScale, LinearScale, PointElement, Filler);

export const LineChart = () => {
    const { chartSetup, historicalData } = useContext(Global);
    return (
        chartSetup[0] && (
            <div className="max-h-[45vh] xs:max-h-[65vh] min-h-[300px] flex flex-col items-center w-full">
                <h2 className="font-bold text-red-600 font-underline p-1 ">{historicalData.symbol}</h2>
                <Line data={chartSetup[0]} options={chartSetup[1]}></Line>
            </div>
        )
    );
};
