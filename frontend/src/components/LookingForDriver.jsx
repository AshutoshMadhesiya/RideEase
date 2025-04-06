import React from 'react'

const LookingForDriver = (props) => {
    return (
    <div>
        <h5 className='p-3 text-center absolute top-0  w-[90%]' onClick={() => {
            props.setVehicleFound(false)
        }}><i className="text-3xl text-gray-300 ri-arrow-down-wide-line"></i></h5>
        <h3 className='text-2xl font-semibold mb-3 '>Looking For a Driver  </h3>
        <div className='flex gap-2 justify between flex-col items-center'>

            <img className='' src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTZ7Kt54z31PkbdlqmqnyWnaCjvcLYRG-T_8Q&s" alt="" />

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
        </div>

    </div>
    )
}

export default LookingForDriver