"use client";

import "chart.js/auto";

import { Line } from "react-chartjs-2";
export default function Chart(props: any) {
  const chartFunction = (chartdata: any) => {
    let data = {
      confirmedCase: {
        labels: [],
        datasets: [],
      },
      activeCase: {
        labels: [],
        datasets: [],
      },
      recoveredCase: {
        labels: [],
        datasets: [],
      },
      deathCase: {
        labels: [],
        datasets: [],
      },
    };

    let totalConfimed = {
      label: "Total Confirmed Cases",
      data: [],
    };

    let totalDeaths = {
      label: "Total Deaths",
      data: [],
    };

    let totalRecovered = {
      label: "Total Recovered",
      data: [],
      borderColor: "rgba(0,255,0, 0.6)",
    };

    let chartData = chartdata;
    for (let i = 10; i < chartData.length; i += 2) {
      let chart = chartData[i];
      data.confirmedCase.labels.push(chart.date);
      data.activeCase.labels.push(chart.date);
      data.recoveredCase.labels.push(chart.date);
      data.deathCase.labels.push(chart.date);
      totalConfimed.data.push(chart.totalconfirmed);
      totalDeaths.data.push(chart.totaldeceased);
      totalRecovered.data.push(chart.totalrecovered);
    }

    data.confirmedCase.datasets.push(totalConfimed);
    data.recoveredCase.datasets.push(totalDeaths);
    data.deathCase.datasets.push(totalRecovered);

    console.log(data);
    return data;
  };

  const data = chartFunction(props.chartdata);
  console.log(data.confirmedCase);

  return (
    <div style={{ width: "100%" }}>
      <Line
        data={data.confirmedCase}
        options={{
          responsive: true,
          layout: {
            padding: {
              top: 32,
              bottom: 32,
              left: 10,
            },
          },
          maintainAspectRatio: false,
          title: {
            display: true,
            text: "STATUS",
            fontSize: 25,
          },
          legend: {
            display: true,
            position: "top",
          },
        }}
      />
    </div>
  );
}
