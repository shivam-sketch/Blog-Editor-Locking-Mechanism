import React from 'react'
import { Pagination } from 'react-bootstrap'

const TablePagination = ({ totalPages, page, setPage }) => {


    let pageNumbers = [];
    for (let number = 1; number <= totalPages; number++) {
        pageNumbers.push(
            <Pagination.Item key={number} active={number === page} onClick={() => {
                setPage(number)
            }} >
                {number}
            </Pagination.Item>,
        );
    }

    return (
        <>
            <Pagination size="sm">{pageNumbers} </Pagination>


        </>
    )
}

export default TablePagination