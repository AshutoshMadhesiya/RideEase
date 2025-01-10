import React from 'react'
import {Link}from 'react-router-dom'
const Home = () => {
  return (
    <div>
      <div className='  bg-cover bg-bottom bg-[url(https://plus.unsplash.com/premium_photo-1731842686156-74895c29a87b?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mjh8fHRyYWZmaWMlMjBsaWdodHN8ZW58MHx8MHx8fDA%3D)] h-screen pt-5 flex justify-between flex-col w-full bg-red-400'>
        <img className='w-16 ml-8' src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png"  />
        <div className='bg-white py-4 px-4 pb-7'  >
          <h2 className='text-3xl font-bold'>Get started with Uber</h2>
          <Link to ='/login' className='flex items-center justify-center w-full bg-black text-white py-3 rounded mt-4'>Continue</Link>
        </div>
      </div>
    </div>
  )
}

export default Home