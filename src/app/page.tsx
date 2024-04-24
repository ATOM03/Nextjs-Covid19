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

export default function Home() {
  const [state, setState] = useRecoilState(CovidState);

  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostsPerPage] = useState(8);

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
      <div>
        {state.open ? (
          <div className="flex flex-col items-center md:flex-row md:max-w-xl">
            <div>
              <Table status={currentPosts} />
              <Pagination
                totalPosts={state.status.length}
                postsPerPage={postsPerPage}
                setCurrentPage={setCurrentPage}
                currentPage={currentPage}
              />
            </div>
            <div>
              <Chart chartdata={state.case_time} />
            </div>
          </div>
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
