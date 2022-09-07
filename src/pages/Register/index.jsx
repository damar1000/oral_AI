import React, { useState } from 'react'
import { Helmet } from 'react-helmet'
import { Link, useNavigate } from 'react-router-dom'
import { HiArrowNarrowLeft } from 'react-icons/hi'
import { register } from '../../utilities/backendService'
import { toast } from 'react-toastify'


const Register = () => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [password2, setPassword2] = useState('')
  const [username, setUsername] = useState('')
  const navigate = useNavigate()


  const handleRegister = e => {
    e.preventDefault()

    // Check if all fields are filled
    if (name === '' || email === '' || password === '' || password2 === '' || username === '') {
      toast.warn('Please fill in all fields')
      return null
    }

    // Check if password and confirm password match
    if (password !== password2) {
      toast.warn('Passwords do not match')
      return null
    } else {
      register(email, name, username, password)
        .then(res => {
          if (!res.data.email) {
            toast.success('Create account successfully')
            navigate('/login')
          }
          toast.error('Email has been registered')
        })
        .catch(err => {
          toast.error(err.response.data.message)
        })
    }

  }


  return (
    <div className='bg-base-200'>
      <Helmet>
        <title>OralCam - Register</title>
      </Helmet>

      <div className="hero min-h-screen">
        <div className="hero-content flex-col gap-2 prose lg:prose-lg">
          <div className='text-center pt-8'>
            <h1 className="font-bold">Register</h1>
            <p className="py-2">
              Create your account now
            </p>
          </div>
          <div className="card flex-shrink-0 w-full lg:w-[500px] shadow-2xl bg-base-100">
            <div className="card-body">
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Name</span>
                </label>
                <input type="text" name="name" id="name" value={name} onChange={e => setName(e.target.value)} placeholder='e. g. John Doe' className='input input-bordered' />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input type="email" name="email" id="email" value={email} onChange={e => setEmail(e.target.value)} placeholder='e. g. dev@oralcam.com' className='input input-bordered' />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Username</span>
                </label>
                <input type="text" name="username" id="username" value={username} onChange={e => setUsername(e.target.value)} placeholder='e. g. OralCamUser' className='input input-bordered' />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Password</span>
                </label>
                <input type="password" name="password" id="password" value={password} onChange={e => setPassword(e.target.value)} placeholder='*********' className='input input-bordered' />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Confirm Password</span>
                </label>
                <input type="password" name="confpassword" id="confpassword" value={password2} onChange={e => setPassword2(e.target.value)} placeholder='*********' className='input input-bordered' />
              </div>
              <div className="form-control mt-6">
                <button className='btn btn-primary' onClick={handleRegister} onSubmit={handleRegister}>Register</button>
              </div>
            </div>
          </div>
          <div className="text-center">
            <p className="text-base-content">
              Already have an account? <Link to="/login" className='text-primary'>Login now</Link>
            </p>
          </div>
        </div>
      </div>
      <div className="absolute top-4 left-5 lg:left-10">
        <Link to='/' className='flex items-center gap-5'>
          <HiArrowNarrowLeft className='text-xl' />
          <p className='lg:block hidden'>Back to Home</p>
        </Link>
      </div>

      <div className="relative text-center lg:text-right text-base-content bg-base-200 pb-3 px-auto text-xs lg:text-base lg:right-10 w-full">
        <p>&copy; {new Date().getFullYear()} OralCam Dev</p>
      </div>
    </div>
  )
}

export default Register