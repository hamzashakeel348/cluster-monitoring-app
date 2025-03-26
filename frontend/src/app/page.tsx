"use client";

import React, { useEffect, useMemo, useState } from "react";
import dayjs from "dayjs";

import { TimeSeriesData } from "@/types";
import { getClusterTimeSeries } from "@/api/clusters";
import TimeSeriesGraph from "@/app/components/TimeSeriesGraph";
import DateSelector from "./components/shared/dateSelector";

const clusterId = process.env.NEXT_PUBLIC_CLUSTER_ID || "";

const Dashboard = () => {
  const [data, setData] = useState({
    name: "",
    timeSeries: {
      IOPS: [{ timestamp: "2024-10-09", read: 21200, write: 12200 }],
      Throughput: [{ timestamp: "2024-10-09", read: 21200, write: 12200 }],
    },
  });
  const [filteredDataIOPS, setFilteredDataIOPS] = useState<TimeSeriesData[]>(
    []
  );

  const [filteredDataThroughput, setFilteredDataIOPSThroughput] = useState<
    TimeSeriesData[]
  >([]);

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [selectedDays, setSelectedDays] = useState<number>(2);

  const fetchData = async () => {
    try {
      const result = await getClusterTimeSeries(clusterId);
      setData(result);
    } catch (err) {
      console.log(err);
      setError("Error fetching time series data");
    } finally {
      setLoading(false);
    }
  };

  const filterDataByDays = (days: number) => {
    const currentDate = dayjs();
    const filteredIOPS = data.timeSeries.IOPS.filter((entry) => {
      const entryDate = dayjs(entry.timestamp);
      const diffInDays = currentDate.diff(entryDate, "day");
      return diffInDays <= days;
    });
    setFilteredDataIOPS(filteredIOPS);

    const filteredThroughput = data.timeSeries.Throughput.filter((entry) => {
      const entryDate = dayjs(entry.timestamp);
      const diffInDays = currentDate.diff(entryDate, "day");
      return diffInDays <= days;
    });
    setFilteredDataIOPSThroughput(filteredThroughput);
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    filterDataByDays(selectedDays);
  }, [selectedDays, data]);

  const renderTimeSeriesGraphs = useMemo(() => {
    const customDivStyle = "w-full p-0";
    return () => {
      if (!filteredDataIOPS.length || !filteredDataThroughput.length) {
        return <p>No data available for the selected time period.</p>;
      }

      return (
        <>
          <div className={customDivStyle}>
            <TimeSeriesGraph
              title="IOPS"
              data={filteredDataIOPS}
              selectedDays={selectedDays}
            />
          </div>
          <div className={customDivStyle}>
            <TimeSeriesGraph
              title="Throughput"
              data={filteredDataThroughput}
              selectedDays={selectedDays}
            />
          </div>
        </>
      );
    };
  }, [filteredDataIOPS, filteredDataThroughput, selectedDays]);

  return (
    <div className="flex flex-col w-full bg-[#161A23] text-white">
      <div className="flex justify-between item-center lg:p-6 lg:flex-row flex-col">
        <h1 className="lg:text-2xl text-xl lg:m-0 my-8 mx-auto ml-0 pl-0">
          Performance Metrics
        </h1>
        <DateSelector
          selectedDays={selectedDays}
          setSelectedDays={setSelectedDays}
        />
      </div>

      {error && <p className="text-red-600">{error}</p>}
      {loading ? <p>Loading...</p> : renderTimeSeriesGraphs()}
    </div>
  );
};

export default Dashboard;
