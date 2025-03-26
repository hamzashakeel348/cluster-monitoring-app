"use client";
import React, { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";
import dayjs from "dayjs";

import { TimeSeriesData, TimeSeriesGraphProps } from "@/types";

const TimeSeriesGraph: React.FC<TimeSeriesGraphProps> = ({
  title,
  data,
  selectedDays,
}) => {
  const [selectedRead, setSelectedRead] = useState<string>("0");
  const [selectedWrite, setSelectedWrite] = useState<string>("0");
  const [selectedTimeStamp, setSelectedTimeStamp] = useState<string>(
    dayjs().format("MMM D, h:mm A")
  );
  const [filteredData, setFilteredData] = useState<TimeSeriesData[]>([]);

  const handleClick = (e: any) => {
    if (e && e.activePayload) {
      const { read, write } = e.activePayload[0].payload;
      console.log(e.activePayload[0].payload);
      setSelectedRead(
        title === "IOPS"
          ? `${(read / 1000).toFixed(1)}k`
          : `${read.toFixed(1)} KB/s`
      );
      setSelectedWrite(
        title === "IOPS"
          ? `${(write / 1000).toFixed(1)}k`
          : `${write.toFixed(1)} KB/s`
      );
      if (e.activePayload[0].payload.timestamp) {
        const timestamp = e.activePayload[0].payload.timestamp;
        setSelectedTimeStamp(dayjs(timestamp).format("MMM D, h:mm A"));
      }
    }
  };

  useEffect(() => {
    // Initialize selected read and write values from the first data entry when component mounts
    if (data && data.length > 0) {
      const { read, write, timestamp } = data[0];
      setSelectedRead(
        title === "IOPS"
          ? `${(read / 1000).toFixed(1)}k`
          : `${read.toFixed(1)} KB/s`
      );
      setSelectedWrite(
        title === "IOPS"
          ? `${(write / 1000).toFixed(1)}k`
          : `${write.toFixed(1)} KB/s`
      );
      setSelectedTimeStamp(dayjs(timestamp).format("MMM D, h:mm A"));
    }
  }, [data, title]);

  const yAxisTicks =
    title === "IOPS" ? [0, 50000, 100000] : [0, 1000000, 2000000];

  const formatXAxis = (tickItem: string, index: number) => {
    const uniqueDates = data.map((d) => dayjs(d.timestamp).format("MMM DD"));
    return uniqueDates.indexOf(dayjs(tickItem).format("MMM DD")) === index
      ? dayjs(tickItem).format("MMM DD")
      : "";
  };

  useEffect(() => {
    const currentDate = dayjs();
    const filtered = data.filter((entry) => {
      const entryDate = dayjs(entry.timestamp);
      const diffInDays = currentDate.diff(entryDate, "day");
      return diffInDays < selectedDays;
    });

    setFilteredData(filtered);
  }, [selectedDays, data]);

  return (
    <div className="flex flex-col lg:flex-row justify-between items-center bg-[#161A23] text-white lg:p-4 rounded-lg shadow-lg w-full px-0 py-8">
      <div className="w-full lg:w-3/4">
        <h3 className="text-gray-300 lg:text-2xl text-lg">{title}</h3>
        <div className="text-right text-white mb-1 lg:text-lg text-[12px]">
          {selectedTimeStamp}
        </div>
        <ResponsiveContainer width="100%" height={200}>
          <LineChart data={filteredData} onMouseMove={handleClick}>
            <YAxis
              stroke="#9CA3AF"
              tickFormatter={(tick) =>
                title === "IOPS" ? `${tick / 1000}k` : `${tick / 1000000} GB/s`
              }
              ticks={yAxisTicks}
              domain={[0, title === "IOPS" ? 100000 : 2000000]}
              axisLine={false}
            />
            <XAxis
              padding={{ left: 25, right: 25 }}
              dataKey="timestamp"
              stroke="#9CA3AF"
              tickFormatter={formatXAxis}
              tick={{ dy: 10, textAnchor: "middle" }}
            />
            <CartesianGrid
              horizontal={true}
              vertical={false}
              stroke="#4B5563"
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "#1E293B",
                border: "1px solid #374151",
                borderRadius: "4px",
                color: "white",
              }}
              labelStyle={{ color: "#9CA3AF" }}
              itemStyle={{ padding: "2px 0" }}
              formatter={(value, name) => [`${value.toLocaleString()}`, name]}
              labelFormatter={(label) => {
                return dayjs(label).format("MMM DD, YYYY - hh:mm A");
              }}
            />
            <Line
              type="monotone"
              dataKey="read"
              stroke="#C084FC"
              strokeWidth={2}
              dot={{ r: 3 }}
            />
            <Line
              type="monotone"
              dataKey="write"
              stroke="#0EA5E9"
              strokeWidth={2}
              dot={{ r: 3 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="lg:mt-8 lg:mt-0 lg:ml-8 w-full lg:w-1/4 flex flex-col">
        <h3 className="text-gray-400 text-2xl mb-2 place-items-start lg:block hidden font-light">
          {title}
        </h3>
        <div className="w-full max-w-xs">
          <div className="flex flex-col justify-between">
            <div className="border-2 p-2 border-gray-800 ps-5">
              <p className="text-gray-400 lg:text-lg text-sm">Read</p>
              <p className="text-purple-400 lg:text-2xl text-sm">
                {selectedRead}{" "}
                <span className="lg:text-lg text-sm">
                  {title === "IOPS" ? "IOPS" : ""}
                </span>
              </p>
            </div>
            <div className="border-2 p-2 border-gray-800 ps-5 border-t-0">
              <p className="text-gray-400 lg:text-lg text-sm">Write</p>
              <p className="text-sky-500 lg:text-2xl text-sm">
                {selectedWrite}{" "}
                <span className="lg:text-lg text-sm">
                  {title === "IOPS" ? "IOPS" : ""}
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TimeSeriesGraph;
