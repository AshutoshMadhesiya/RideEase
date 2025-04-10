import React from 'react'
import { Link } from 'react-router-dom'

const FinishRide = (props) => {
  return (
    <div >
    <h5 className='p-3 text-center absolute top-0  w-[90%]' onClick={() => {
        props.setFinishRidePanel(false)
    }}><i className="text-3xl text-gray-300 ri-arrow-down-wide-line"></i></h5>
    <h3 className='text-2xl font-semibold mb-5 '>Finish this ride    </h3>
    <div className='flex items-center justify-between p-2 bg-yellow-400 rounded-lg  mt-4'>
        <div className='flex items-center  gap-3  '>
            <img className='h-10 rounded-full object-cover w-10' src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQaUwPXBnAA_V1yjyVNE1wVDW6f-XbgOZTDBQ&s" alt="" />
            <h2 className='text-2xl font-medium'>Ananya</h2>
        </div>
        <h5 className='text-xl font-semibold '>2.2km</h5>
    </div>
    <div className='flex gap-2 justify between flex-col items-center'>


        <div className='w-full mt-5'>
            <div className='flex items-center gap-5  p-2 border-b-2'><i className="ri-map-pin-user-fill"></i>
                <div>
                    <h3 className='text-lg font-medium '>562/11-A</h3>
                    <p className='text-gray-600 text-sm -mt-1'>Ram Mandir ,Ayodhya</p>
                </div>
            </div>
            <div className='flex items-center gap-5 p-2 border-b-2' >
                <i className="text-lg ri-map-pin-2-fill"></i><div>
                    <h3 className='text-lg font-medium '>562/11-A</h3>
                    <p className='text-gray-600 text-sm -mt-1'>Ram Mandir ,Ayodhya</p>
                </div>
            </div>
            <div className='flex items-center gap-5 p-2 '>
                <i className="ri-money-rupee-circle-fill"></i>
                <div>
                    <h3 className='text-lg font-medium '>₹200</h3>
                    <p className='text-gray-600 text-sm -mt-1'>Cash Cash</p>
                </div>

            </div>

        </div>
        <div className='mt-6 w-full '>
              <Link to='/captain-home' className='w-full flex justify-center bg-green-600 rounded-xl text-black font-semibold p-3 mt-4'>Finish Ride</Link>
            <p className=' text-red-600 text-xs mt-10'>Click on Finish Ride if you have completed the payment </p>
        </div>
    </div>


</div>

  )
}

export default FinishRide