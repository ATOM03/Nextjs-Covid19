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
      borderColor: "rgb(255, 7, 58)",
      pointBackgroundColor: "rgb(255, 7, 58)",
      hoverBorderColor: "rgb(255, 7, 58)",
      pointHoverRadius: 5,
    };

    let totalDeaths = {
      label: "Total Deaths",
      data: [],
      borderColor: "rgba(200,200,200,0.6)",
      pointBackgroundColor: "rgba(200, 200, 200, 1)",
      hoverBorderColor: "rgba(230,230,230,1)",
      pointHoverRadius: 6,
    };

    let totalRecovered = {
      label: "Total Recovered",
      data: [],
      borderColor: "rgba(0,255,0, 0.6)",
      pointBackgroundColor: "rgba(0, 255, 0, 0.8)",
      hoverBorderColor: "rgba(0,255,0,0.9)",
      pointHoverRadius: 6,
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
    data.deathCase.datasets.push(totalDeaths as never);
    data.recoveredCase.datasets.push(totalRecovered as never);

    console.log(data);
    return data;
  };

  const data = chartFunction(props.chartdata);
  console.log(data.confirmedCase);

  return (
    <div className="w-full ">
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
        }}
      />
      <Line
        data={data.recoveredCase}
        options={{
          responsive: true,
          layout: {
            padding: {
              top: 32,
              bottom: 32,
              left: 10,
            },
          },
        }}
      />
      <Line
        data={data.deathCase}
        options={{
          responsive: true,
          layout: {
            padding: {
              top: 32,
              bottom: 32,
              left: 10,
            },
          },
        }}
      />
    </div>
  );
}
