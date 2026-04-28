import {
  Area,
  AreaChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip as RechartsTooltip,
  XAxis,
  YAxis,
} from 'recharts';
import type { TemperatureUnit } from '../../api/weatherApi.types';
import styles from './TemperatureChart.module.scss';

export interface TemperatureChartData {
  date: string;
  max: number;
  min: number;
}

interface TemperatureChartProps {
  readonly data: TemperatureChartData[];
  readonly unit: TemperatureUnit;
}

const TemperatureChart = ({ data, unit }: TemperatureChartProps) => (
  <div className={styles.container}>
    <div className={styles.wrapper}>
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data} margin={{ top: 20, right: 10, left: 0, bottom: 20 }}>
          <defs>
            <linearGradient id="maxGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#ffffff" stopOpacity={0.2} />
              <stop offset="95%" stopColor="#ffffff" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.1)" />
          <XAxis
            dataKey="date"
            axisLine={false}
            tickLine={false}
            tickMargin={15}
            tick={{ fill: 'rgba(255,255,255,0.6)', fontSize: 12, fontWeight: 600 }}
          />
          <YAxis
            axisLine={false}
            tickLine={false}
            tick={{ fill: 'rgba(255,255,255,0.6)', fontSize: 12, fontWeight: 600 }}
            unit={unit === 'celsius' ? '°C' : '°F'}
            domain={['auto', 'auto']}
          />
          <RechartsTooltip
            contentStyle={{
              backgroundColor: 'rgba(0, 0, 0, 0.4)',
              backdropFilter: 'blur(20px)',
              border: '1px solid rgba(255,255,255,0.1)',
              borderRadius: '1rem',
              color: '#fff',
              boxShadow: '0 8px 32px 0 rgba(0,0,0,0.4)',
            }}
            itemStyle={{ color: '#fff', fontWeight: 800 }}
            labelStyle={{ color: 'rgba(255,255,255,0.6)', marginBottom: '4px', fontWeight: 700 }}
          />
          <Legend
            verticalAlign="top"
            align="right"
            height={48}
            iconType="line"
            wrapperStyle={{ paddingBottom: '20px', fontSize: '12px', fontWeight: 600, color: 'white' }}
          />
          <Area
            type="monotone"
            dataKey="max"
            name="High Temp"
            stroke="#ffffff"
            strokeWidth={3}
            fillOpacity={1}
            fill="url(#maxGradient)"
            animationDuration={1000}
          />
          <Area
            type="monotone"
            dataKey="min"
            name="Low Temp"
            stroke="rgba(255,255,255,0.3)"
            strokeWidth={2}
            strokeDasharray="5 5"
            fill="transparent"
            animationDuration={1000}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  </div>
);

export default TemperatureChart;
