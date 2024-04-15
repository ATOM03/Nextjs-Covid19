"use client";

export default function Table(props: any) {
  const thousands_separators = (num: any) => {
    var num_parts = num.toString().split(".");
    num_parts[0] = num_parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return num_parts.join(".");
  };

  const status = props.status;

  return (
    <div className="overflow-x-auto">
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
          {status.map((stat: any, index: any) => (
            <tr className="hover" key={index}>
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
