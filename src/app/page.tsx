"use client";
import { useState, useEffect } from "react";
import Table from "./components/Table/page";
import Navbar from "./components/Navbar/page";
import Pagination from "./components/Pagination/page";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";

export default function Home() {
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
          <div>
            <Table status={currentPosts} />
            <Pagination
              totalPosts={state.status.length}
              postsPerPage={postsPerPage}
              setCurrentPage={setCurrentPage}
              currentPage={currentPage}
            />
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
