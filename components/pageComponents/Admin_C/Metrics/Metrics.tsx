import React, { useState } from "react";
import metricStyles from "../../../../appStyles/adminStyles/metricStyles.module.css";
import { Bar } from "react-chartjs-2";
import { SelectGraph } from "_components/pageComponents";

const Metrics = () => {
  const dataWeek = {
    labels: [
      "01/12/2021",
      "02/12/2021",
      "03/12/2021",
      "04/12/2021",
      "05/12/2021",
      "06/12/2021",
    ],
    datasets: [
      {
        label: "Daily Active Users",
        data: [12, 15, 20, 50, 100, 40],
        backgroundColor: ["rgba(255, 99, 132, 0.2)"],
        borderColor: ["rgba(255, 99, 132, 1)"],
        borderWidth: 1,
      },
    ],
  };

  const dataMonth = {
    labels: [
      "01/2022",
      "02/2022",
      "03/2022",
      "04/2022",
      "05/2022",
      "06/2022",
      "07/2022",
    ],
    datasets: [
      {
        label: "Monthly active users",
        data: [1200, 1140, 500, 800, 1100, 1600, 2000],
        backgroundColor: ["rgba(54, 162, 235, 0.2)"],
        borderColor: ["rgba(54, 162, 235, 1)"],
        borderWidth: 1,
      },
    ],
  };

  const dataYear = {
    labels: ["2021", "2022", "2023", "2024", "2025", "2026", "2027"],
    datasets: [
      {
        label: "Yearly Active Users",
        data: [10000, 20000, 30000, 25000, 15000, 22000, 12000],
        backgroundColor: ["rgba(255, 206, 86, 0.2)"],
        borderColor: ["rgba(255, 206, 86, 1)"],
        borderWidth: 1,
      },
    ],
  };

  const [optionselected, setOptionSelected] = useState(dataWeek);

  const options = [
    {
      value: "week",
      label: "Week",
    },
    {
      value: "month",
      label: "Month",
    },
    {
      value: "year",
      label: "Year",
    },
  ];

  const handleChange = (newValue: any, actionMeta: any) => {
    console.group("Value Changed");
    if (newValue.value === "week") {
      setOptionSelected(dataWeek);
    } else if (newValue.value === "month") {
      setOptionSelected(dataMonth);
    } else if (newValue.value === "year") {
      setOptionSelected(dataYear);
    }
    console.groupEnd();
  };

  const option = {
    responsive: true,
    scales: {
      yAxes: [
        {
          ticks: {
            beginAtZero: true,
          },
        },
      ],
    },
  };

  return (
    <div className={metricStyles.metricScreenWrapper}>
      <SelectGraph
        options={options}
        defaultValue={options[0]}
        onChange={handleChange}
      />

      <div className={metricStyles.metricsContentWrapper}>
        <div className={metricStyles.chartsDisplayWrapper}>
          <div className={metricStyles.chartWrapper}>
            <Bar data={optionselected} options={option} />
          </div>
          <div className={metricStyles.chartWrapper}>
            <Bar data={optionselected} options={option} />
          </div>
        </div>
        <div className={metricStyles.chartsDisplayWrapper}>
          <div className={metricStyles.chartWrapper}>
            <Bar data={optionselected} options={option} />
          </div>
          <div className={metricStyles.chartWrapper}>
            <Bar data={optionselected} options={option} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Metrics;
