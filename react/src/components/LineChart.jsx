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
    const { data } = useContext(Global);
    return data[0] && <Line data={data[0]} options={data[1]}></Line>;
};
