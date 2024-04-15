import React from "react";

const Pagination = (props: any) => {
  let pages = [];

  let totalPosts = props.totalPosts;
  let postsPerPage = props.postsPerPage;
  let setCurrentPage = props.setCurrentPage;
  let currentPage = props.currentPage;

  for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
    pages.push(i);
  }
  return (
    <div className="flex justify-center mt-4">
      {pages.map((page, index) => {
        return (
          <div className="join" key={index}>
            <button
              onClick={() => setCurrentPage(page)}
              className={
                page == currentPage
                  ? "join-item btn btn-active"
                  : "join-item btn"
              }
            >
              {page}
            </button>
          </div>
        );
      })}
    </div>
  );
};

export default Pagination;
