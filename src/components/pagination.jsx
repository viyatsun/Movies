import React from 'react';

const Pagination = ({numberPage, nextPage,previousPage}) => {
    
    return (
        <div >
            <button
                type='button'
                className="btn btn-dark mr-5 btn-lg"
                onClick = {()=>previousPage(numberPage)}
            >
              {'<'}  Previous page
            </button>
            <button
                type='button'
                className="btn btn-dark ml-5 btn-lg"
                onClick = {()=>nextPage(numberPage)}
            >
                Next page {'>'}
            </button>
        </div>
    )
}
export default Pagination;