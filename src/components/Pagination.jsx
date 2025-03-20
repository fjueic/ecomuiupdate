import React from 'react'

const Pagination = ({ nextPage, page, setPage }) => {
    return (
        <div className="flex justify-center mt-6 space-x-4">
            {page > 1 && (
                <button
                    onClick={() => setPage(parseInt(page) - 1)}
                    className="px-4 py-2 bg-[#0336A6] text-white rounded-lg shadow hover:bg-blue-700"
                >
                    Previous
                </button>
            )}
            <div className="flex items-center space-x-2">{page}</div>
            {nextPage &&
                <button
                    onClick={() => setPage(parseInt(page) + 1)}
                    className="px-4 py-2 bg-[#0336A6] text-white rounded-lg shadow hover:bg-blue-700"
                >
                    Next
                </button>
            }
        </div>

    )
}

export default Pagination
