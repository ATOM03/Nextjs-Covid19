"use client";
import { useState, useEffect } from "react";
import Table from "./components/Table/page";
import Navbar from "./components/Navbar/page";
import Pagination from "./components/Pagination/page";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import { useRecoilState } from "recoil";
import { CovidState } from "./components/State/atoms/CovidState";
import Chart from "./components/Chart/page";
import { motion } from "framer-motion";
import { stat } from "fs";

export default function Home() {
  const [state, setState] = useRecoilState(CovidState);

  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostsPerPage] = useState(15);

  const [open, setOpen] = useState(false);

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  useEffect(() => {
    fetch("/api")
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
        setOpen(true);
      })
      .catch((e) => {
        console.log(e);
        setState({ ...state, loading: false });
      });
  }, []);

  const lastPostIndex = currentPage * postsPerPage;
  const firstPostIndex = lastPostIndex - postsPerPage;
  const currentPosts = state.status.slice(firstPostIndex, lastPostIndex);

  // console.log(state)

  return (
    <>
      <Navbar />
      <div className="w-screen">
        {state.open ? (
          <motion.div
            // animate={{ x: 0 }}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ ease: "easeOut", duration: 1 }}
          >
            <div className="w-full flex flex-col md:flex-row ">
              <div className="w-full md:w-1/2">
                <Table
                  status={currentPosts}
                  confirmed={state.confirmed}
                  recovered={state.recovered}
                  active={state.active}
                  deaths={state.deaths}
                  deltaconfirmed={state.deltaconfirmed}
                  deltarecovered={state.deltarecovered}
                  deltadeaths={state.deltadeaths}
                />
                <Pagination
                  totalPosts={state.status.length}
                  postsPerPage={postsPerPage}
                  setCurrentPage={setCurrentPage}
                  currentPage={currentPage}
                />
              </div>
              <div className="w-full  p-4 md:w-1/2">
                <Chart chartdata={state.case_time} />
              </div>
            </div>
          </motion.div>
        ) : (
          <div className="flex justify-center w-full h-[60rem]">
            <span className="loading loading-spinner loading-lg"></span>
          </div>
        )}
      </div>

      <Snackbar open={open} autoHideDuration={3000} onClose={handleClose}>
        <Alert
          onClose={handleClose}
          severity="success"
          variant="filled"
          sx={{ width: "100%" }}
        >
          Data Fetch Successfully
        </Alert>
      </Snackbar>
    </>
  );
}
