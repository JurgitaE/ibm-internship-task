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
    const { chartSetup } = useContext(Global);
    return chartSetup[0] && <Line data={chartSetup[0]} options={chartSetup[1]}></Line>;
};
