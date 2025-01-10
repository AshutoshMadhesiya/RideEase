import React, { useState } from 'react'
import { Link } from 'react-router-dom'

const CaptainSignup = () => {
  const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [userData, setUserData] = useState({})
  
    const submitHandler=(e)=>{
  e.preventDefault()
  setUserData({
    fullName:{
      firstName:firstName,
      lastName:lastName
    },
    email:email,
    password:password
  })
  
  setEmail('')
  setFirstName('')
  setLastName('')
  setPassword('')
  console.log(userData)
  
    }
  return (
    <div>
       <div className='p-7 h-screen flex flex-col justify-between' >
    <div>
       <img className='w-16 mb-10'src='https://www.svgrepo.com/show/505031/uber-driver.svg' />
    <form onSubmit={(e)=>{
      submitHandler(e)
    }}>

    <h3 className='text-lg font-medium mb-2'>What's captain name</h3>
    <div className='flex gap-2'>
      <input
required
className='bg-[#eeeeee] mb-7 rounded px-4 py-2 border w-1/2 text-lg placeholder:text-base ' 
type="text"
 placeholder='First name'
value={firstName} 
onChange={(e)=>{
  setFirstName(e.target.value)
}}/>
<input
required
className='bg-[#eeeeee] mb-7 rounded px-4 py-2 border w-1/2 text-lg placeholder:text-base ' 
type="text" placeholder='Last name'
value={lastName}
onChange={(e)=>{
  setLastName(e.target.value)
}} />
      
    </div>
    <h3 className='text-lg font-medium mb-2'>What's captain email</h3>
<input
required
value={email}
onChange={(e)=>{
  setEmail(e.target.value)
}}
className='bg-[#eeeeee] mb-7 rounded px-4 py-2 border w-full text-lg placeholder:text-base ' type="email" placeholder='email@example.com' />
<h3 className='text-lg font-medium mb-2'>Enter Password</h3>

<input
 
 
 className='bg-[#eeeeee] mb-7 rounded px-4 py-2 border w-full text-lg placeholder:text-base '
 value={password}
 onChange={(e)=>{
  setPassword(e.target.value)
 }}
 required  type='password' placeholder='password'/> 
<button
className='bg-black text-white font-semibold mb-7 rounded px-4 py-2  w-full text-lg placeholder:text-base '>
Login</button>
</form> 
<p className='text-center' >Already have an account <Link  to='/captain-login' className='text-blue-600'>Login here </Link></p>
 </div>
  <div>
    <p className='text-xs'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Id, accusantium.</p>
  </div>
       </div>

    </div>
  )
}

export default CaptainSignup