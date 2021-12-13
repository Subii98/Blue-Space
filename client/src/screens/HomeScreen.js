import React, { useEffect, useState } from 'react'
import axios from 'axios';
import Tags from "../components/Tags.js";
import PostArea from "../components/PostArea.js";
import Question from "../components/Question.js";
import LoadingModal from '../components/LoadingModal.js';
import MessageModal from '../components/MessageModal.js';
import { load } from 'dotenv';
import { useIsMounted } from '../components/useIsMounted.js';
import Platform from '../components/Platform.js';
import QuizCard from '../components/QuizCard.js';
import { textAlign } from '@mui/system';
import SwiperCategories from "../components/SwiperCategories.js";
import PaginatedItems from '../components/PaginatedItems.js';
import ReactPaginate from "react-paginate";

function HomeScreen(props) {   
  //to check quiz _id matches _id of the url /quiz/_id  
  //const quiz = data.quizzes.find( x => x._id === props.match.params._id)

  /*
  if (!quiz) {
    return <div> Quiz Not Found </div>
  }
  */

  //use react hooks to set data (empty array by default)
  const [platforms, setPlatforms] = useState([]);
  const [quizzes, setQuizzes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  //pagination stuff
  const [currentItems, setCurrentItems] = useState(null);
  const [pageCount, setPageCount] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(4)
  const [itemOffset, setItemOffset] = useState(0);

  useEffect(() => {
    axios
         .get('/api/platforms')
         .then((res) => {
             setPlatforms(res?.data)
             setCurrentItems(res?.data)
             setLoading(false)
           return res.data;
         })
         .catch((error) => {
           setError(
             "Error loading home page"
           );
           setLoading(false)
   console.log("Error loading home page");
         });
    axios
         .get('/api/quizzes')
         .then((res) => {
           setLoading(true)
           setQuizzes(res?.data)
           setLoading(false)
           return res?.data
         })
         .catch((error) => {
          setError(
            "Error loading home page"
          );
          setLoading(false)
  console.log("Error loading home page");
        });
  }, []);

  useEffect(() => {
    const endOffset = itemOffset + itemsPerPage;
    console.log(`Loading items from ${itemOffset} to ${endOffset}`);
    setCurrentItems(platforms.slice(itemOffset, endOffset));
    setPageCount(Math.ceil(platforms.length / itemsPerPage));
  }, [platforms])

  useEffect(() => {

  }, [currentItems])

  useEffect(() => {
    // Fetch items from another resources.
    const endOffset = itemOffset + itemsPerPage;
    console.log(`Loading items from ${itemOffset} to ${endOffset}`);
    setCurrentItems(platforms.slice(itemOffset, endOffset));
    setPageCount(Math.ceil(platforms.length / itemsPerPage));
  }, [itemOffset, itemsPerPage]);

  // Invoke when user click to request another page.
  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % platforms.length;
    console.log(
      `User requested page number ${event.selected}, which is offset ${newOffset}`
    );
    setItemOffset(newOffset);
  };

  function PlatformItems(props) {
    return (
      <>
        {props.currentItems && <Platform platforms={props.currentItems} row={props.row}/>}
      </>
    );
  }

  return (
      <div>
          {loading ? (
              <LoadingModal></LoadingModal>
          ) : error ? (
              <MessageModal variant="danger">{error}</MessageModal>
          ) : (
              <div>
                  <SwiperCategories></SwiperCategories>
                  <div className="homeItems">
                      <div className="latestQuiz">
                          <p style={{ textAlign: "center", color: "#929292" }}>Latest Quizzes</p>
                          <div className="line" />
                          {quizzes.map(quiz => (
                              <QuizCard quiz={quiz} />
                          ))}
                      </div>
                      <div className="trendingPlatform">
                          <p style={{ textAlign: "center", color: "#929292" }}>
                              Trending Platforms
                          </p>
                          <div className="line" />
                            <PlatformItems currentItems={currentItems} row={false}/>
                            <ReactPaginate
                              nextLabel=">"
                              onPageChange={handlePageClick}
                              pageRangeDisplayed={3}
                              marginPagesDisplayed={2}
                              pageCount={pageCount}
                              previousLabel="<"
                              pageClassName="page-item"
                              pageLinkClassName="page-link"
                              previousClassName="page-item"
                              previousLinkClassName="page-link"
                              nextClassName="page-item"
                              nextLinkClassName="page-link"
                              breakLabel="..."
                              breakClassName="page-item"
                              breakLinkClassName="page-link"
                              containerClassName="pagination"
                              activeClassName="active"
                              renderOnZeroPageCount={null}
                            />
                      </div>
                  </div>
              </div>
          )}
      </div>
  );
}

export default HomeScreen