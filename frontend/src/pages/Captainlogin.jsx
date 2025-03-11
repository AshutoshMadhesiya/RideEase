import React, { useState } from 'react'
import { Link } from 'react-router-dom'

const Captainlogin = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [captainData, setCaptainData] = useState('')
  
    const submitHandler=(e)=>{
      e.preventDefault();
      setCaptainData({
        email:email,
        password:password
      })
      setEmail('')
      setPassword('')
    }
  
  return (
    <div className='p-7 h-screen flex flex-col justify-between max-w-md mx-auto bg-gray-50' >
    <div>
       <img className='w-16 mb-10'src='https://www.svgrepo.com/show/505031/uber-driver.svg' />
    <form>
    <h3 className='text-lg font-medium mb-2'>What's captain email</h3></form>
<input
required
value={email}
onChange={(e)=>{
setEmail(e.target.value);
}}
className='bg-[#eeeeee] mb-7 rounded px-4 py-2 border w-full text-lg placeholder:text-base ' type="email" placeholder='email@example.com' />
<h3 className='text-lg font-medium mb-2'>Enter Password</h3>
<form>
<input
 required 
 value={password}
 onChange={(e)=>{
  setPassword(e.target.value)
 }}
 className='bg-[#eeeeee] mb-7 rounded px-4 py-2 border w-full text-lg placeholder:text-base '
 type='password' placeholder='password'/> 
<button
className='bg-black text-white font-semibold mb-7 rounded px-4 py-2  w-full text-lg placeholder:text-base '>
Login</button>
</form> 
<p className='text-center' >Join a fleet<Link to='/captain-signup' className='text-blue-600'> Register as a captain</Link></p>
 </div>
  <div>
    <Link to='/login'
    className='bg-[brown] flex items-center justify-center text-white font-semibold mb-7 rounded px-4 py-2  w-full text-lg placeholder:text-base '>
      Sign in as User </Link>
  </div>
   </div>
  )
}

export default Captainlogin