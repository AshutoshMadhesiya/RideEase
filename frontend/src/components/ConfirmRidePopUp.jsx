import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const ConfirmRidePopUp = (props) => {
    const [otp, setOtp] = useState('')
    const navigate = useNavigate()

    const submitHandler = async (e) => {
        e.preventDefault()

        try {
            const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/ride/start-ride`, {
                params: {
                    rideId: props.ride._id,
                    otp: otp
                },
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            })

            if (response.status === 200) {
                props.setConfirmRidePopUpPanel(false)
                props.setRidePopUpPanel(false)
                navigate('/captain-riding')
            } else {
                alert('Invalid OTP')
            }

        } catch (error) {
            console.error('Start ride error:', error)
            alert('Invalid OTP or server error')
        }
    }

    return (
        <div>
            <h5 className='p-3 text-center absolute top-0 w-[90%]' onClick={() => {
                props.setConfirmRidePopUpPanel(false)
            }}>
                <i className="text-3xl text-gray-300 ri-arrow-down-wide-line"></i>
            </h5>

            <h3 className='text-2xl font-semibold mb-5'>Confirm this ride to start</h3>

            <div className='flex items-center justify-between p-2 bg-yellow-400 rounded-lg mt-4'>
                <div className='flex items-center gap-3'>
                    <img
                        className='h-10 w-10 rounded-full object-cover'
                        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQaUwPXBnAA_V1yjyVNE1wVDW6f-XbgOZTDBQ&s"
                        alt=""
                    />
                    <h2 className='text-2xl font-medium'>{props.ride?.user.fullname.firstname}</h2>
                </div>
                <h5 className='text-xl font-semibold'>{props.ride?.distance}</h5>
            </div>

            <div className='flex gap-2 flex-col items-center'>
                <div className='w-full mt-5'>
                    <div className='flex items-center gap-5 p-2 border-b-2'>
                        <i className="ri-map-pin-user-fill"></i>
                        <div>
                            <h3 className='text-lg font-medium'>{props.ride?.pickup}</h3>
                            <p className='text-gray-600 text-sm -mt-1'>Pickup</p>
                        </div>
                    </div>
                    <div className='flex items-center gap-5 p-2 border-b-2'>
                        <i className="text-lg ri-map-pin-2-fill"></i>
                        <div>
                            <h3 className='text-lg font-medium'>{props.ride?.destination}</h3>
                            <p className='text-gray-600 text-sm -mt-1'>Destination</p>
                        </div>
                    </div>
                    <div className='flex items-center gap-5 p-2'>
                        <i className="ri-money-rupee-circle-fill"></i>
                        <div>
                            <h3 className='text-lg font-medium'>₹{props.ride?.fare}</h3>
                            <p className='text-gray-600 text-sm -mt-1'>Cash Cash</p>
                        </div>
                    </div>
                </div>

                <div className='mt-6 w-full'>
                    <form onSubmit={submitHandler} className='flex flex-col gap-4'>
                        <input
                            value={otp}
                            onChange={(e) => setOtp(e.target.value)}
                            type="text"
                            className='bg-[#eee] px-6 font-mono py-4 text-lg rounded-lg'
                            placeholder='Enter OTP'
                        />

                        <button
                            type="submit"
                            className='w-full flex justify-center bg-green-600 rounded-xl text-black font-semibold p-3 mt-4'
                        >
                            Confirm
                        </button>

                        <button
                            type="button"
                            onClick={() => {
                                props.setConfirmRidePopUpPanel(false)
                                props.setRidePopUpPanel(false)
                            }}
                            className='w-full bg-red-500 rounded-xl text-white font-semibold p-3 mt-1'
                        >
                            Cancel
                        </button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default ConfirmRidePopUp
