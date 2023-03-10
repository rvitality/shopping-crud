import React, { useEffect, useState } from "react";

import { chunkArray } from "../../helpers/chunkArray.helper";
import { getPageArrayInitialState } from "../../helpers/getPageArrayInitialState.helper";

import { BiSearchAlt2 } from "react-icons/bi";
import { HiOutlineChevronDoubleLeft } from "react-icons/hi";
import { HiOutlineChevronRight } from "react-icons/hi";

import "./DataTable.styles.scss";
import { Link } from "react-router-dom";

const DataTable = ({ data, onFilterBySearch, Table, userRole }) => {
    const dataCopy = [...data];
    const chunkData = chunkArray(dataCopy, 5);

    const [dataToDisplay, setDataToDisplay] = useState(chunkData[0]);

    useEffect(() => {
        setDataToDisplay(chunkData[0]);
    }, [data]);

    const [paginationArray, setPaginationArray] = useState(getPageArrayInitialState(chunkData));
    const [paginationSetIndex, setPaginationSetIndex] = useState(1);

    const [currentPageIndex, setCurrentPageIndex] = useState(1);

    const fivePagesCount = Math.floor(chunkData.length / 5);
    const remainderPagesCount = chunkData.length % 5;

    const showNextButton = paginationSetIndex <= fivePagesCount;

    const changePageHandler = index => {
        setCurrentPageIndex(index);
        setDataToDisplay(chunkData[index - 1]);
    };

    const backToFirstSetButtonsHandler = () => {
        setPaginationArray(getPageArrayInitialState(chunkData));

        setCurrentPageIndex(1);
        setPaginationSetIndex(1);
        setDataToDisplay(chunkData[0]);
    };

    const nextSetButtonsHandler = () => {
        let pageSetCount;

        if (fivePagesCount === paginationSetIndex) {
            pageSetCount = remainderPagesCount;
        } else {
            pageSetCount = 5;
        }

        const mappedPaginationArr = Array(pageSetCount)
            .fill(0)
            ?.map((num, index) => {
                return paginationSetIndex * 5 + (index + 1);
            });

        setPaginationArray(mappedPaginationArr);
        setCurrentPageIndex(paginationSetIndex * 5 + 1);
        setDataToDisplay(chunkData[paginationSetIndex * 5]);
        setPaginationSetIndex(prevState => prevState + 1);
    };

    const paginationButtons = paginationArray?.map(num => {
        return (
            <button
                className={`${currentPageIndex === num ? "active" : ""}`}
                key={num}
                onClick={() => changePageHandler(num)}
            >
                {num}
            </button>
        );
    });

    const searchChangeHandler = e => {
        const inputValue = e.target.value.trim().toLowerCase();
        const filteredData = onFilterBySearch(chunkData[currentPageIndex - 1], inputValue);
        setDataToDisplay(filteredData);
    };

    let contentToShow;
    if (dataToDisplay?.length > 0) {
        contentToShow = (
            <>
                <Table dataToDisplay={dataToDisplay} userRole={userRole} />
                <div className="pagination">
                    {dataToDisplay?.length > 0 && (
                        <>
                            {paginationSetIndex > 1 && (
                                <button onClick={backToFirstSetButtonsHandler}>
                                    <HiOutlineChevronDoubleLeft />
                                </button>
                            )}
                            {paginationButtons.length > 1 && paginationButtons}
                            {showNextButton && (
                                <button onClick={nextSetButtonsHandler}>
                                    <HiOutlineChevronRight />
                                </button>
                            )}
                        </>
                    )}
                </div>
            </>
        );
    } else {
        contentToShow = (
            <div className="no-result-heading">
                <p>No products.</p>
                <Link to="/upload" className="link">
                    Add Product
                </Link>
            </div>
        );
    }

    return (
        <article className="data-table">
            {/* <div className="search">
                <BiSearchAlt2 />
                <input
                    type="text"
                    placeholder="Type something... "
                    onChange={searchChangeHandler}
                />
            </div> */}
            {contentToShow}
        </article>
    );
};

export default DataTable;
