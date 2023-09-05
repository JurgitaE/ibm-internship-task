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
    const { chartSetup, chartData } = useContext(Global);
    return (
        chartSetup[0] && (
            <div className="max-h-[50vh] xs:max-h-[70vh] flex flex-col items-center w-full">
                <h2 className="font-bold text-blue-500 bg-yellow-200 p-3 ">{chartData.symbol}</h2>
                <Line data={chartSetup[0]} options={chartSetup[1]}></Line>
            </div>
        )
    );
};
