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
    for (let i = 10; i < chartData?.length; i += 2) {
      let chart = chartData[i];
      data.confirmedCase.labels.push(chart.date as never);
      data.activeCase.labels.push(chart.date as never);
      data.recoveredCase.labels.push(chart.date as never);
      data.deathCase.labels.push(chart.date as never);
      totalConfimed.data.push(chart.totalconfirmed as never);
      totalDeaths.data.push(chart.totaldeceased as never);
      totalRecovered.data.push(chart.totalrecovered as never);
    }

    data.confirmedCase.datasets.push(totalConfimed as never);
    data.recoveredCase.datasets.push(totalDeaths as never);
    data.deathCase.datasets.push(totalRecovered as never);

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
          //   layout: {
          //     padding: {
          //       top: 32,
          //       bottom: 32,
          //       left: 10,
          //     },
          //   },
          //   maintainAspectRatio: false,
          //   title: {
          //     display: true,
          //     text: "STATUS",
          //     fontSize: 25,
          //   },
          //   legend: {
          //     display: true,
          //     position: "top",
          //   },
        }}
      />
    </div>
  );
}
