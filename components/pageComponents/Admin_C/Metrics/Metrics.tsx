// import React, { useState } from "react";
// import metricStyles from "../../../../appStyles/adminStyles/metricStyles.module.css";
// import { Bar } from "react-chartjs-2";
// import moment, { months } from "moment";
// import "chartjs-adapter-moment";
// import Select from "react-select";
// import { SelectGraph } from "_components/pageComponents";

// const Metrics = () => {
//   const data = {
//     labels: [
//       "Monday",
//       "Tuesday",
//       "Wednesday",
//       "Thursday",
//       "Friday",
//       "Saturday",
//     ],
//     datasets: [
//       {
//         label: "Daily Active Users",
//         data: [12, 19, 3, 5, 2, 3],
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
//         ],
//         borderWidth: 1,
//       },
//     ],
//   };

//   function newDate(date: any) {
//     return moment(date).add(date, "d");
//   }

//   const WeekTIme = {
//     labels: [
//       newDate(-7),
//       newDate(-6),
//       newDate(-5),
//       newDate(-4),
//       newDate(-3),
//       newDate(-2),
//       newDate(-1),
//     ],
//     datasets: [
//       {
//         data: [12, 19, 3, 5, 2, 3],
//       },
//     ],
//   };

//   function newMonth(month: number) {
//     // console.log(moment().add(month, "months"));
//     return moment().add(month, "months");
//   }

//   const monthTime = {
//     labels: [
//       newMonth(12),
//       newMonth(11),
//       newMonth(10),
//       newMonth(9),
//       newMonth(8),
//       newMonth(7),
//       newMonth(6),
//       newMonth(5),
//       newMonth(4),
//       newMonth(3),
//       newMonth(2),
//       newMonth(1),
//     ],
//     datasets: [
//       {
//         data: [12, 19, 3, 5, 2, 3, 100, 120, 123, 180, 30, 50],
//       },
//     ],
//   };

//   function newYear(year: number) {
//     return moment().add(year, "year");
//   }

//   const yearData = {
//     labels: [newYear(3), newYear(2), newYear(1)],
//     datasets: [
//       {
//         data: [10002, 90019, 90003],
//       },
//     ],
//   };

//   const [optionselected, setOptionSelected] = useState(yearData);
//   const [type, setType] = useState("year");

//   const options = [
//     {
//       value: "1W",
//       label: "1-week",
//     },
//     {
//       value: "1Y",
//       label: "1-Year",
//     },
//     {
//       value: "3Y",
//       label: "3-Year",
//     },
//   ];

//   const handleChange = (newValue: any, actionMeta: any) => {
//     console.group("Value Changed");
//     console.log(newValue);
//     if (newValue.value === "1Y") {
//       setOptionSelected(monthTime);
//       setType("month");
//     } else if (newValue.value === "3Y") {
//       setOptionSelected(yearData);
//       setType("year");
//     } else if (newValue.value === "1W") {
//       setOptionSelected(WeekTIme);
//       setType("day");
//     }
//     console.groupEnd();
//   };

//   console.log(type);

//   return (
//     <div className={metricStyles.metricScreenWrapper}>
//       <SelectGraph
//         options={options}
//         defaultValue={options[0]}
//         onChange={handleChange}
//       />

//       <div className={metricStyles.metricsContentWrapper}>
//         <div className={metricStyles.chartsDisplayWrapper}>
//           <div className={metricStyles.chartWrapper}>
//             <Bar
//               data={optionselected}
//               options={{
//                 responsive: true,
//                 maintainAspectRatio: false,
//                 scales: {
//                   x: {
//                     type: "time",
//                     time: {
//                       unit:
//                         type === "month"
//                           ? "month"
//                           : type === "year"
//                           ? "year"
//                           : type === "day"
//                           ? "day"
//                           : "month",
//                       displayFormats: {
//                         day: "DD/MM/YYYY",
//                       },
//                     },
//                   },
//                 },
//               }}
//             />
//           </div>
//           <div className={metricStyles.chartWrapper}>
//             <Bar
//               data={optionselected}
//               options={{
//                 responsive: true,
//                 maintainAspectRatio: false,
//                 scales: {
//                   x: {
//                     type: "time",
//                     time: {
//                       unit:
//                         type === "month"
//                           ? "month"
//                           : type === "year"
//                           ? "year"
//                           : type === "day"
//                           ? "day"
//                           : "month",
//                       displayFormats: {
//                         day: "DD/MM/YYYY",
//                       },
//                     },
//                   },
//                 },
//               }}
//             />
//           </div>
//         </div>
//         <div className={metricStyles.chartsDisplayWrapper}>
//           <div className={metricStyles.chartWrapper}>
//             <Bar
//               data={optionselected}
//               options={{
//                 responsive: true,
//                 maintainAspectRatio: false,
//                 scales: {
//                   x: {
//                     type: "time",
//                     time: {
//                       unit:
//                         type === "month"
//                           ? "month"
//                           : type === "year"
//                           ? "year"
//                           : type === "day"
//                           ? "day"
//                           : "month",
//                       displayFormats: {
//                         day: "DD/MM/YYYY",
//                       },
//                     },
//                   },
//                 },
//               }}
//             />
//           </div>
//           <div className={metricStyles.chartWrapper}>
//             <Bar
//               data={optionselected}
//               options={{
//                 responsive: true,
//                 maintainAspectRatio: false,
//                 scales: {
//                   x: {
//                     type: "time",
//                     time: {
//                       unit: "day",
//                       displayFormats: {
//                         day: "DD/MM/YYYY",
//                       },
//                     },
//                   },
//                 },
//               }}
//             />
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Metrics;
