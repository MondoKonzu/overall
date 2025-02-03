import React from 'react'

const ErrorComponent = () => {
  return (
    <div className='text-center w-fit mx-auto p-12'>
      <div className='text-red-500 rounded-xl hover:bg-slate-400 dark:hover:bg-slate-800 p-4 duration-150'>
      <h2 className='text-3xl'>Error In fetching Data</h2>
      <div className='text-4xl'>Error 404</div>
      </div>
      <p>
        No user was found, or some database error occurred,
        <br /> we raccomand you to try again later, or check if you
        can access this data.        
      </p>

    </div>
  )
}

export default ErrorComponent
