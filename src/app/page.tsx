"use client"
import { useState, useEffect } from 'react'

export default function Home() {
  const thousands_separators = (num) => {
    var num_parts = num.toString().split(".");
    num_parts[0] = num_parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return num_parts.join(".");
  };

  const [state, setState] = useState({
    loading: true,
    status: [],
    confirmed: "",
    active: "",
    recovered: "",
    deaths: "",
    deltaconfirmed: "",
    deltarecovered: "",
    deltadeaths: "",
    case_time: [],
    open: false,
  });

  const [openSucess, setOpenSucess] = useState(false);
  const [openError, setOpenError] = useState(false);

  useEffect( () => {
     fetch("http://localhost:3000/api")
      .then((res) => res.json())
      .then((json) => {
        setState({
          loading: false,
          status: json.statewise,
          confirmed: json.statewise[0].confirmed,
          active: json.statewise[0].active,
          recovered: json.statewise[0].recovered,
          deaths: json.statewise[0].deaths,
          deltaconfirmed: json.statewise[0].deltaconfirmed,
          deltarecovered: json.statewise[0].deltarecovered,
          deltadeaths: json.statewise[0].deltadeaths,
          case_time: json.cases_time_series,
          open: true,
        });
        setOpenSucess(true);
      })
      .catch((e) => {
        console.log(e);
        setState({...state,loading:false});
        setOpenError(false);
      });
  }, []);

  console.log(state)
  
  return (
    <>
     <div className="navbar bg-base-100">
        <div className="flex-1">
          <a className="btn btn-ghost text-xl">ATOM</a>
        </div>
        <div className="flex-none">
          <div className="dropdown dropdown-end">
            <div tabIndex={0} role="button" className="btn m-1">
              Theme
              <svg
                width="12px"
                height="12px"
                className="h-2 w-2 fill-current opacity-60 inline-block"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 2048 2048"
              >
                <path d="M1799 349l242 241-1017 1017L7 590l242-241 775 775 775-775z"></path>
              </svg>
            </div>
            <ul
              tabIndex={2}
              className="dropdown-content z-[1] p-2 shadow-2xl bg-base-300 rounded-box w-52"
            >
              <li>
                <input
                  type="radio"
                  name="theme-dropdown"
                  className="theme-controller btn btn-sm btn-block btn-ghost justify-start"
                  aria-label="Default"
                  value="default"
                />
              </li>
              <li>
                <input
                  type="radio"
                  name="theme-dropdown"
                  className="theme-controller btn btn-sm btn-block btn-ghost justify-start"
                  aria-label="Retro"
                  value="retro"
                />
              </li>
              <li>
                <input
                  type="radio"
                  name="theme-dropdown"
                  className="theme-controller btn btn-sm btn-block btn-ghost justify-start"
                  aria-label="Cyberpunk"
                  value="cyberpunk"
                />
              </li>
              <li>
                <input
                  type="radio"
                  name="theme-dropdown"
                  className="theme-controller btn btn-sm btn-block btn-ghost justify-start"
                  aria-label="Valentine"
                  value="valentine"
                />
              </li>
              <li>
                <input
                  type="radio"
                  name="theme-dropdown"
                  className="theme-controller btn btn-sm btn-block btn-ghost justify-start"
                  aria-label="Aqua"
                  value="aqua"
                />
              </li>
              <li>
                <input
                  type="radio"
                  name="theme-dropdown"
                  className="theme-controller btn btn-sm btn-block btn-ghost justify-start"
                  aria-label="Dim"
                  value="dim"
                />
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div>
      <div className="overflow-x-auto">
  <table className="table">
    {/* head */}
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
      {state.status.map((stat)=>(
        <tr className="hover">
        <td>{stat.state}</td>
        <td>{thousands_separators(stat.confirmed)}</td>
        <td>{thousands_separators(stat.active)}</td>
        <td>{thousands_separators(stat.recovered)}</td>
        <td>{thousands_separators(stat.deaths)}</td>
      </tr>
      ))}
      {/* <tr>
       
        <td>Cy Ganderton</td>
        <td>Quality Control Specialist</td>
        <td>Blue</td>
      </tr> */}
      {/* row 2 */}
      {/* <tr className="hover">
        
        <td>Hart Hagerty</td>
        <td>Desktop Support Technician</td>
        <td>Purple</td>
      </tr> */}
      {/* row 3 */}
      {/* <tr>
        
        <td>Brice Swyre</td>
        <td>Tax Accountant</td>
        <td>Red</td>
      </tr> */}
    </tbody>
  </table>
</div>
      </div>
    </>
  );
}
