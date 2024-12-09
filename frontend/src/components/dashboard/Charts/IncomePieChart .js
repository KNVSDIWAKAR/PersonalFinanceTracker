import React, { useEffect, useState } from "react";
import { Pie } from "react-chartjs-2";

const IncomePieChart = () => {
  const username = localStorage.getItem("username");
  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `http://localhost:814/income/chartData/${username}`
        ); // Use username in API call
        const result = await response.json();

        const categorySum = result.categorySum;
        console.log(result);

        // Prepare data for the chart
        const data = {
          labels: ["salary", "allowance", "bonus", "other"],
          datasets: [
            {
              data: [
                categorySum.salary || 0,
                categorySum.bonus || 0,
                categorySum.allowance || 0,
                categorySum.other || 0,
              ],
              backgroundColor: [
                "rgba(75, 192, 192, 0.6)",
                "rgba(153, 102, 255, 0.6)",
                "rgba(255, 159, 64, 0.6)",
                "rgba(54, 162, 235, 0.6)",
              ],
              borderWidth: 1,
            },
          ],
        };

        setChartData(data);
      } catch (error) {
        console.error("Error fetching chart data:", error);
      }
    };

    fetchData();
  }, [username]);
  return (
    <div>{chartData ? <Pie data={chartData} /> : <p>Loading chart...</p>}</div>
  );
};

export default IncomePieChart;
