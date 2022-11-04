import React from "react";
const Pagination = ({ ourCoursesPage, totalCourse}) => {
    const pageNumber =[];

    for(let i = 1; i <= Math.ceil(totalCourse / ourCoursesPage); i++){
        pageNumber.push(i);
    }
    return(
        <nav className="pagination">
        {pageNumber.map(number =>(
            <li key={number} className ='page-item'>
                <a href ='!#' className='page-link'>{number}</a>
            </li>
        ))}
        </nav>
    )
}

export default Pagination;