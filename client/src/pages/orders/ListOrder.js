import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FiEdit } from "react-icons/fi";
import { AiOutlineDelete } from "react-icons/ai";
import Lottie from "react-lottie";
import * as loadAnimation from "../../assets/lottie/73133-car-animation-front-view.json";
import * as successAnimation from "../../assets/lottie/4022-success-animation.json";

const ListOrder = () => {
  const [order, setOrder] = useState("");
  const [currentPage, setcurrentPage] = useState(1);
  const [itemsPerPage, setitemsPerPage] = useState(4);
  const [data, setData] = useState([]);
  const [pageNumberLimit, setpageNumberLimit] = useState(4);
  const [maxPageNumberLimit, setmaxPageNumberLimit] = useState(4);
  const [minPageNumberLimit, setminPageNumberLimit] = useState(0);
  const [loading, setLoading] = useState(undefined);
  const [completed, setCompleted] = useState(undefined);

  const filterOrders = (input) => {
    setOrder(input);
    console.log(order);
  };

  useEffect(() => {
    setTimeout(() => {
      fetch("https://jsonplaceholder.typicode.com/todos")
        .then((response) => response.json())
        .then((json) => {
          setData(json);
          setLoading(true);

          setTimeout(() => {
            setCompleted(true);
          }, 1500);
        });
    }, 1500);
  }, []);

  const defaultOptions1 = {
    loop: true,
    autoplay: true,
    animationData: loadAnimation.default,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  const defaultOptions2 = {
    loop: true,
    autoplay: true,
    animationData: successAnimation.default,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  const renderData = (input) => {
    return (
      <>
        <h4>My Order</h4>
        <div className="d-flex pb-4">
          <ul class="list-group">
            <li class="list-group-item">
              <Link onClick={() => filterOrders("in")} className="text-black">
                Order In
              </Link>
            </li>
            <li class="list-group-item">
              <Link onClick={() => filterOrders("done")} className="text-black">
                Order Done
              </Link>
            </li>
          </ul>
          <div className="list-group mx-3">
            {input.map((item) => {
              return (
                <>
                  <Link
                    href="#"
                    className="list-group-item list-group-item-action flex-column align-items-start pb-5"
                  >
                    <div className="d-flex w-100 justify-content-between">
                      <h5 className="mb-1">Paket Joki {item.id}</h5>
                      <small>3 days ago</small>
                    </div>
                    <p className="mb-1">
                      Donec id elit non mi porta gravida at eget metus. Maecenas
                      sed diam eget risus varius blandit.
                    </p>
                    <small>Rating</small>
                    <div className="position-absolute bottom-0 end-0 pb-2 px-2">
                      <Link href="#" className="btn btn-warning mx-1">
                        <FiEdit />
                      </Link>
                      <Link href="#" className="btn btn-danger">
                        <AiOutlineDelete />
                      </Link>
                    </div>
                  </Link>
                </>
              );
            })}
          </div>
          <ul className="pageNumbers text-white h-25">
            <li>
              <button
                onClick={handlePrevbtn}
                disabled={currentPage === pages[0] ? true : false}
              >
                Prev
              </button>
            </li>
            {pageDecrementBtn}
            {renderPageNumbers}
            {pageIncrementBtn}
            <li>
              <button
                onClick={handleNextbtn}
                disabled={
                  currentPage === pages[pages.length - 1] ? true : false
                }
              >
                Next
              </button>
            </li>
          </ul>
        </div>
      </>
    );
  };

  const pages = [];
  for (let i = 1; i <= Math.ceil(data.length / itemsPerPage); i++) {
    pages.push(i);
  }

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);

  // console.log(data.length);

  const handleClick = (event) => {
    setcurrentPage(event.target.id);
  };

  const renderPageNumbers = pages.map((number) => {
    if (number < maxPageNumberLimit + 1 && number > minPageNumberLimit) {
      return (
        <li
          key={number}
          id={number}
          // onClick={handleClick}
          className={currentPage === number ? "active" : null}
        >
          {number}
        </li>
      );
    } else {
      return null;
    }
  });

  const handleNextbtn = () => {
    setcurrentPage(currentPage + 1);
    if (currentPage + 1 > maxPageNumberLimit) {
      setmaxPageNumberLimit(maxPageNumberLimit + pageNumberLimit);
      setminPageNumberLimit(minPageNumberLimit + pageNumberLimit);
    }
  };

  const handlePrevbtn = () => {
    setcurrentPage(currentPage - 1);
    if ((currentPage - 1) % pageNumberLimit === 0) {
      setmaxPageNumberLimit(maxPageNumberLimit - pageNumberLimit);
      setminPageNumberLimit(minPageNumberLimit - pageNumberLimit);
    }
  };

  let pageIncrementBtn = null;
  if (pages.length > maxPageNumberLimit) {
    pageIncrementBtn = <li onClick={handleNextbtn}> &hellip; </li>;
  }

  let pageDecrementBtn = null;
  if (minPageNumberLimit >= 1) {
    pageDecrementBtn = <li onClick={handlePrevbtn}> &hellip; </li>;
  }

  return (
    <>
      {!completed ? (
        <>
          <div className="wrap-lottie-other">
            {!loading ? (
              <Lottie options={defaultOptions1} height={500} width={500} />
            ) : (
              <Lottie options={defaultOptions2} height={500} width={500} />
            )}
          </div>
        </>
      ) : (
        <>{renderData(currentItems)}</>
      )}
    </>
  );
};

export default ListOrder;
