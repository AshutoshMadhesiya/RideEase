import React,{useContext} from 'react'
import { CaptainDataContext } from '../context/CaptainContext'

const CaptainDetails = () => {

    const { captain } = useContext(CaptainDataContext)

    return (
        <div>
            <div className='flex items-center justify-between'>
                <div className='flex items-center justify-start  gap-3'>
                    <img className='h-10 w-10 rounded-full object-cover' src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ8AHL48pmxRo-x2ezr3LeaywgOC3R_C2I-mQ&s" alt="" />
                    <h4 className='text-lg font-medium'> </h4>{captain.fullname.firstname+" "+ captain.fullname.lastname}</div>
                <div>
                    <h4 className='text-xl font-semibold'>₹200</h4>
                    <p className='text-sm text-gray-600'>Earned </p></div>
            </div>
            <div className='flex p-3 mt-6  bg-gray-300 rounded-lg justify-center items-start'>
                <div className='text-center'>
                    <i className="mb-2 text-3xl font-thin ri-timer-2-line"></i>
                    <h5 className='text-lg font-medium'>10.2</h5>
                    <p className='text-sm text-gray-600'>Hours online</p>

                </div>
                <div className='text-center'>
                    <i className="mb-2 text-3xl font-thin ri-speed-up-fill"></i>
                    <h5 className='text-lg font-medium'>10.2</h5>
                    <p className='text-sm text-gray-600'>Hours online</p>
                </div>
                <div className='text-center'>
                    <i className=" mb-2 text-2xl font-thin ri-booklet-line"></i>
                    <h5 className='text-lg font-medium'>10.2</h5>
                    <p className='text-sm text-gray-600'>Hours online</p>

                </div>
            </div>
        </div>
    )
}

export default CaptainDetails