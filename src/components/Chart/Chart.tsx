import React from "react";
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip
} from "recharts";
import "./Chart.css";

interface ChartProps {
  data: {
    xIndex: number;
    orange: number;
    blue: number;
    black: number;
  }[];
}

// export default function Dashboard({ data = [] }) {
export const Chart: React.SFC<ChartProps> = props => {
  return (
    <LineChart
      className="charts"
      width={730}
      height={350}
      data={props.data}
      margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis
        dataKey="xIndex"
        label={{
          className: "charts-label-xaxis",
          value: "Second(s)",
          position: "insideBottom",
          offset: -3
        }}
      />
      <YAxis
        label={{ value: "Click(s)", angle: -90, position: "insideLeft" }}
      />
      <Tooltip />
      <Line type="monotone" dataKey="orange" stroke="orange" />
      <Line type="monotone" dataKey="blue" stroke="#00adff" />
      <Line type="monotone" dataKey="black" stroke="#000000" />
    </LineChart>
  );
};
