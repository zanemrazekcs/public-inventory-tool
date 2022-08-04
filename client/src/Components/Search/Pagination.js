import React from 'react'

const Pagination = (props) => {
    const {setCurrentPage, recordsPerPage, setRecordsPerPage, totalRecords} = props

    const pageNumbers = []

    for(let i = 1; i <= Math.ceil(totalRecords / recordsPerPage); i++){
        pageNumbers.push(i)
    }

    const paginate = (pageNumber) => {
        setCurrentPage(pageNumber)
    }

    return(
        <div>
            <nav className='m-3'>
                <ul className='pagination'>
                        {pageNumbers.map(number => (
                            <li key = {number} className='page-item'>
                                <a onClick={() => paginate(number)} href='#partTable' className='page-link'>
                                    {number}
                                </a>
                            </li>
                        ))}
                </ul>
            </nav>
                            
            {pageNumbers.length > 1 && <div>
                <h5>Results Per Page:</h5>
                <button className='btn btn-sm' onClick={()=>{setRecordsPerPage(10)}}>10</button>
                <button className='btn btn-sm' onClick={()=>{setRecordsPerPage(25)}}>25</button>
                <button className='btn btn-sm' onClick={()=>{setRecordsPerPage(50)}}>50</button>
                <button className='btn btn-sm' onClick={()=>{setRecordsPerPage(100)}}>100</button>
                <button className='btn btn-sm' onClick={()=>{setRecordsPerPage(500)}}>500</button>
                <button className='btn btn-sm' onClick={()=>{setRecordsPerPage(1000)}}>1000</button>
            </div>}

        </div>
    )
}

export default Pagination