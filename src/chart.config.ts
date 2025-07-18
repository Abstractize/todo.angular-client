import {
    Chart,
    CategoryScale,
    LinearScale,
    BarElement,
    ArcElement,
    Tooltip,
    Legend,
    BarController,
    DoughnutController,
} from 'chart.js';

Chart.register(
    CategoryScale,
    LinearScale,
    BarElement,
    ArcElement,
    Tooltip,
    Legend,
    BarController,
    DoughnutController
);