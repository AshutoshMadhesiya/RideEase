import React, { useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import CaptainDetails from '../components/CaptainDetails'
import RidePopUp from '../components/RidePopUp'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import ConfirmRidePopUp from '../components/ConfirmRidePopUp'

const CaptainHome = () => {
  
const [ridePopUpPanel, setRidePopUpPanel] = useState(true)
const [confirmRidePopUpPanel, setConfirmRidePopUpPanel] = useState(false)

const confirmRidePopUpPanelRef = useRef(null)
const ridePopUpPanelRef = useRef(null)


useGSAP(function(){
  if (ridePopUpPanel){
    gsap.to(ridePopUpPanelRef.current,{
      transform:'translateY(0)'
    })
  }
  else{
    gsap.to(ridePopUpPanelRef.current,{
      transform:'translateY(100%)'

    })
  }
},[ridePopUpPanel])

useGSAP(function(){
  if (confirmRidePopUpPanel){
    gsap.to(confirmRidePopUpPanelRef.current,{
      transform:'translateY(0)'
    })
  }
  else{
    gsap.to(confirmRidePopUpPanelRef.current,{
      transform:'translateY(100%)'

    })
  }
},[confirmRidePopUpPanel])
 
  return (
    <div className='h-screen w-screen flex flex-col  bg-[#F5F5F5]'>
      <div className='fixed p-3 top-0 flex items-center justify-between w-screen'> <img className='w-16' src="https://logospng.org/download/uber/logo-uber-4096.png" alt="" />
        <Link to='/home' className=' h-10 w-10 bg-white flex items-center justify-center rounded-full'>
          <i className="text-lg font-medium  ri-logout-box-r-line"></i></Link>

      </div>
      <div className='h-3/5 flex justify-center items-center'>
        <img className='h-full w-full object-cover' src="https://preview.redd.it/prayagraj-kumbh-mela-2025-v0-vk0hz9yhjbxd1.png?width=1342&format=png&auto=webp&s=d91ab21f5817b4a556356917166571f5ca6b8f0f" alt="" />

      </div>

      <div className='h-2/5 p-6'>
      <CaptainDetails/>
       </div>
       <div ref={ridePopUpPanelRef}   className='fixed w-full z-10 bottom-0  translate-y-full bg-white px-3 py-10'>
      <RidePopUp setRidePopUpPanel={setRidePopUpPanel} setConfirmRidePopUpPanel={setConfirmRidePopUpPanel} />
       </div>
       <div ref={confirmRidePopUpPanelRef}   className='fixed w-full h-screen z-10 bottom-0  translate-y-full bg-white px-3 py-10'>
      <ConfirmRidePopUp setConfirmRidePopUpPanel={setConfirmRidePopUpPanel}  setRidePopUpPanel={setRidePopUpPanel}/>
       </div>


    </div>
  )
}

export default CaptainHome
