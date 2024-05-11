"use client";

import { Key } from "react";
import { motion } from "framer-motion";

export default function Table(props: any) {
  const thousands_separators = (num: any) => {
    var num_parts = num.toString().split(".");
    num_parts[0] = num_parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return "" + num_parts.join(".");
  };

  const status = props.status;
  const confirmed = props && props.confirmed ? props.confirmed : 0;
  const active = props && props.active ? props.active : 0;
  const recovered = props && props.recovered ? props.recovered : 0;
  const deaths = props && props.deaths ? props.deaths : 0;
  const deltaconfirmed =
    props && props.deltaconfirmed ? props.deltaconfirmed : 0;
  const deltarecovered =
    props && props.deltarecovered ? props.deltarecovered : 0;
  const deltadeaths = props && props.deltadeaths ? props.deltadeaths : 0;
  // console.log(status);

  return (
    <div className="overflow-x-auto">
      <motion.div
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ ease: "easeOut", duration: 1.5 }}
        className="flex justify-around "
      >
        <div className="flex flex-col items-center">
          <h5 className="text-red-500 font-bold">Confirmed</h5>
          <h4 className="mt-5 text-red-500 font-medium">
            [+{thousands_separators(deltaconfirmed)} ]
          </h4>
          <h1 className="text-xl text-red-700 font-semibold tracking-wider  md:text-2xl">
            {thousands_separators(confirmed)}
          </h1>
        </div>
        <div className="flex flex-col items-center">
          <div className="text-green-500 font-bold ">Recovered </div>
          <div className="mt-5 text-green-600 font-medium">
            [+{thousands_separators(deltarecovered)} ]
          </div>
          <h1 className="text-xl text-green-700 font-semibold tracking-wider  md:text-2xl">
            {thousands_separators(recovered)}
          </h1>
        </div>
        <div className="flex flex-col items-center">
          <div className="text-blue-500 font-bold">Active </div>
          <div className="mt-11"></div>
          <h1 className="text-xl text-blue-700 font-semibold tracking-wider  md:text-2xl">
            {thousands_separators(active)}
          </h1>
        </div>
        <div className="flex flex-col items-center">
          <div className="font-bold">Death</div>
          <div className="mt-5 font-medium">
            [+{thousands_separators(deltadeaths)} ]
          </div>
          <h1 className="text-xl font-semibold tracking-wider  md:text-2xl">
            {thousands_separators(deaths)}
          </h1>
        </div>
      </motion.div>
      <table className="table">
        <thead>
          <tr>
            <th>STATES/UT</th>
            <th>CONFIRMED</th>
            <th>ACTIVE</th>
            <th>RECOVERED</th>
            <th>DEATHS</th>
          </tr>
        </thead>
        <tbody>
          {status &&
            status?.map((stat: any, index: Key) => (
              <tr key={index} className="hover">
                <td>{stat.state}</td>
                <td>{thousands_separators(stat.confirmed)}</td>
                <td>{thousands_separators(stat.active)}</td>
                <td>{thousands_separators(stat.recovered)}</td>
                <td>{thousands_separators(stat.deaths)}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}
