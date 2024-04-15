"use client";
import { useState, useEffect } from "react";
import Table from "./components/Table/page";
import Navbar from "./components/Navbar/page";

export default function Home() {
  const thousands_separators = (num: any) => {
    var num_parts = num.toString().split(".");
    num_parts[0] = num_parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return num_parts.join(".");
  };

  const [state, setState] = useState<any>({
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

  useEffect(() => {
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
        setState({ ...state, loading: false });
        setOpenError(false);
      });
  }, []);

  // console.log(state)

  return (
    <>
      <Navbar />
      <div>
        {state.open ? (
          <Table status={state.status} />
        ) : (
          <span className="loading loading-spinner loading-lg"></span>
        )}
      </div>
    </>
  );
}
