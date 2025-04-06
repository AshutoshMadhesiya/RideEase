import React from 'react'

const VehiclePanel = (props) => {
  return (
    <div>
         <h5 className='p-3 text-center absolute top-0  w-[90%]' onClick={() => {
         props.setVehiclePanel(false)
        }}><i className="text-3xl text-gray-300 ri-arrow-down-wide-line"></i></h5>
        <h3 className='text-2xl font-semibold mb-3 '>Choose a vehicle</h3>
        <div  onClick={()=>{
            props.setConfirmRidePanel(true)
        }}className='flex border-2 active:border-black rounded-xl w-full p-3 bg-white items-center justify-between mb-1'>
          <img className='h-16' src="https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_368,w_552/v1548646918/assets/e9/2eeb8f-3764-4e26-8b17-5905a75e7e85/original/2.png" alt="" />
          <div>
            <h4 className='text-xl'>Ferrari<span><i className="ri-user-3-fill"></i>4</span></h4>
            <h5 className='text-sm'>2 mins away</h5>
            <p className='font-medium text-xs text-gray-600'>Affordable,compact rides</p>
          </div>
          <h2 className='text-xl font-semibold'>₹200</h2>
        </div>
        <div  onClick={()=>{
            props.setConfirmRidePanel(true)
        }} className='flex border-2 active:border-black rounded-xl w-full p-3 bg-white
         items-center justify-between mb-1'>
          <img className='h-16' src="https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_368,w_552/v1648431773/assets/1d/db8c56-0204-4ce4-81ce-56a11a07fe98/original/Uber_Auto_558x372_pixels_Desktop.png" alt="" />
          <div>
            <h4 className='text-xl'>Auto <span><i className="ri-user-3-fill"></i>5</span></h4>
            <h5 className='text-sm'>2 mins away</h5>
            <p className='font-medium text-xs text-gray-600'>Affordable,compact rides</p>
          </div>
          <h2 className='text-xl font-semibold'>₹80</h2>
        </div>
        <div onClick={()=>{
            props.setConfirmRidePanel(true)
        }} className='flex border-2 active:border-black rounded-xl w-full p-3 bg-white items-center justify-between'>
          <img className='h-16' src="https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_538,w_956/v1698944322/assets/92/00189a-71c0-4f6d-a9de-1b6a85239079/original/UberMoto-India-Orange.png" alt="" />
          <div>
            <h4 className='text-xl'>Bike  <span><i className="ri-user-3-fill"></i>1</span></h4>
            <h5 className='text-sm'>2 mins away</h5>
            <p className='font-medium text-xs text-gray-600'>Affordable,compact rides</p>
          </div>
          <h2 className='text-xl font-semibold'>₹60</h2>
        </div>
      
    </div>
  )
}

export default VehiclePanel