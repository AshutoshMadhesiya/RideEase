import React from 'react'

const WaitingForDriver = (props) => {
  return (
    <div>
      <h5 className='p-3 text-center absolute top-0  w-[90%]' onClick={() => {
        props.onClose(false)
      }}><i className="text-3xl text-gray-300 ri-arrow-down-wide-line"></i></h5>
      <div className='flex items-center justify-between'>
        <img className='h-16' src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTZ7Kt54z31PkbdlqmqnyWnaCjvcLYRG-T_8Q&s" alt="" />
        <div className='text-right'>
          <h2 className='text-2xl  font-medium '>{props.ride?.captain.fullname.firstname+" "+props.ride?.captain.fullname.lastname}</h2>
          <h4 className='text-l font-semibold -mt-1 -mb-1 uppercase'>
            {props.ride?.captain.vehicle.plate}
          </h4>
          <p className='text-sm text-gray-600'>Mercedes Benz</p>
          <p className='text-sm text-gray-600'>OTP : {props.ride?.otp}</p>

        </div>

      </div>

      <div className='flex gap-2 justify between flex-col items-center'>
        <div className='w-full mt-5'>
          <div className='flex items-center gap-5  p-2 border-b-2'><i className="ri-map-pin-user-fill"></i>
            <div>
              <h3 className='text-lg font-medium '>{props.ride?.pickup}</h3>
              <p className='text-gray-600 text-sm -mt-1'>Pickup</p>
            </div>
          </div>
          <div className='flex items-center gap-5 p-2 border-b-2' >
            <i className="text-lg ri-map-pin-2-fill"></i><div>
              <h3 className='text-lg font-medium '>{props.ride?.destination}</h3>
              <p className='text-gray-600 text-sm -mt-1'>Destination</p>
            </div>
          </div>
          <div className='flex items-center gap-5 p-2 '>
            <i className="ri-money-rupee-circle-fill"></i>
            <div>
              <h3 className='text-lg font-medium '>₹{props.ride?.fare}</h3>
              <p className='text-gray-600 text-sm -mt-1'>Cash Cash</p>
            </div>

          </div>

        </div>
      </div>

    </div>
  )
}

export default WaitingForDriver