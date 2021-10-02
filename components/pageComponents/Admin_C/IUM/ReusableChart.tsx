import React from "react";
import metricStyles from "../../../../appStyles/adminStyles/metricStyles.module.css";
import ReusableChart from "./ReusableChart";

const Metrics = () => {
  const data = [
    {
      name: "Mon",
      noOfUsers: 2400,
    },
    {
      name: "Tues",
      noOfUsers: 2210,
    },
    {
      name: "Wed",
      noOfUsers: 2290,
    },
    {
      name: "Thurs",
      noOfUsers: 2000,
    },
    {
      name: "Fri",
      noOfUsers: 2181,
    },
    {
      name: "Satur",
      noOfUsers: 2500,
    },
    {
      name: "Sun",
      noOfUsers: 2100,
    },
  ];

  return (
    <div className={metricStyles.metricScreenWrapper}>
      <div className={metricStyles.metricsContentWrapper}>
        <div className={metricStyles.chartsDisplayWrapper}>
          <div className={metricStyles.chartContainer}>
            {/* <h2>dsfsdf </h2> */}
            <ReusableChart
              width="500"
              height={400}
              data={data}
              datakey="name"
              barsize={25}
            />
          </div>
          <div className={metricStyles.chartContainer}>
            {/* <ReusableChart
              width={500}
              height={400}
              data={data}
              datakey="name"
              barsize={25}
            /> */}
          </div>
        </div>
        <div className={metricStyles.chartsDisplayWrapper}>
          <div className={metricStyles.chartContainer}>
            {/* <ReusableChart
              width={500}
              height={400}
              data={data}
              datakey="name"
              barsize={25}
            /> */}
          </div>
          <div className={metricStyles.chartContainer}>
            {/* <ReusableChart
              width={500}
              height={400}
              data={data}
              datakey="name"
              barsize={25}
            /> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Metrics;

//         backgroundColor: [
//           "rgba(255, 99, 132, 0.2)",
//           "rgba(54, 162, 235, 0.2)",
//           "rgba(255, 206, 86, 0.2)",
//           "rgba(75, 192, 192, 0.2)",
//           "rgba(153, 102, 255, 0.2)",
//           "rgba(255, 159, 64, 0.2)",
//         ],
//         borderColor: [
//           "rgba(255, 99, 132, 1)",
//           "rgba(54, 162, 235, 1)",
//           "rgba(255, 206, 86, 1)",
//           "rgba(75, 192, 192, 1)",
//           "rgba(153, 102, 255, 1)",
//           "rgba(255, 159, 64, 1)",
