"use client";

import { Key } from "react";

export default function Table(props: any) {
  const thousands_separators = (num: any) => {
    var num_parts = num.toString().split(".");
    num_parts[0] = num_parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return "" + num_parts.join(".");
  };

  const status = props.status;
  const confirmed = props.confirmed;

  // console.log(status);

  return (
    <div className="overflow-x-auto">
      <div className="flex justify-around ">
        <div>
          <div>Confirmed</div>
          {/* <div>{thousands_separators(confirmed)}</div> */}
        </div>
        <div>
          <div>Recovered</div>
        </div>
        <div>
          <div>Active</div>
        </div>
        <div>
          <div>Death</div>
        </div>
      </div>
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
