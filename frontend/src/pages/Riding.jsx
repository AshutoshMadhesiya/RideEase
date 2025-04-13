import React from 'react'
import { Link } from 'react-router-dom'
import { useLocation } from 'react-router-dom'
import { useContext, useEffect } from 'react'
import { SocketContext } from '../context/SocketContext'
import { useNavigate } from 'react-router-dom'

const Riding = () => {

    const location = useLocation(); // Access location object
    const ride = location.state?.ride; // Retrieve ride data

    const { socket } = useContext(SocketContext);
    const navigate = useNavigate(); 

    socket.on('ride-ended', ride=>{
        navigate('/home')
    })

    return (
        <div className='h-screen w-screen flex flex-col justify-center items-center bg-[#F5F5F5]'>
            <Link to='/home' className='fixed right-2 top-2 h-10 w-10 bg-white flex items-center justify-center rounded-full'><i className="text-lg font-medium  ri-home-2-line"></i></Link>
            <div className='h-1/2 flex justify-center items-center'>
                <img className='h-full w-full object-cover' src="https://preview.redd.it/prayagraj-kumbh-mela-2025-v0-vk0hz9yhjbxd1.png?width=1342&format=png&auto=webp&s=d91ab21f5817b4a556356917166571f5ca6b8f0f" alt="" />

            </div>
            <div className='h-1/2 p-4'>
                <div className='flex items-center justify-between'>
                    <img className='h-16' src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTZ7Kt54z31PkbdlqmqnyWnaCjvcLYRG-T_8Q&s" alt="" />
                    <div className='text-right'>
                        <h2 className='text-2xl  font-medium '>{ride?.captain.fullname.firstname+" "+ ride?.captain.fullname.lastname}</h2>
                        <h4 className='text-lg font-semibold -mt-1 -mb-1 uppercase'>
                            {ride?.captain.vehicle.plate}
                        </h4>
                        <p className='text-sm text-gray-600'>Mercedes Benz</p>

                    </div>

                </div>

                <div className='flex gap-2 justify between flex-col items-center'>
                    <div className='w-full mt-5'>
                        
                        <div className='flex items-center gap-5 p-2 border-b-2' >
                            <i className="text-lg ri-map-pin-2-fill"></i><div>
                                <h3 className='text-lg font-medium '>{ride?.destination}</h3>
                                <p className='text-gray-600 text-sm -mt-1'>Destination</p>
                            </div>
                        </div>
                        <div className='flex items-center gap-5 p-2 '>
                            <i className="ri-money-rupee-circle-fill"></i>
                            <div>
                                <h3 className='text-lg font-medium '>₹{ride?.fare}</h3>
                                <p className='text-gray-600 text-sm -mt-1'>Cash Cash</p>
                            </div>

                        </div>

                    </div>
                </div>

                <button className='w-full bg-green-600 rounded-xl text-black font-semibold p-2 mt-5'>Make a payment</button></div>

        </div>
    )
}

export default Riding