import React, { useState } from 'react'
import { Helmet } from 'react-helmet'
import { Link } from 'react-router-dom'
import { HiArrowNarrowLeft } from 'react-icons/hi'


const Register = () => {
  const [name, setName] = useState('')
  return (

    <>
      <Helmet>
        <title>OralCam - Register</title>
      </Helmet>

      <div className="hero min-h-screen bg-base-200">
        <div className="hero-content flex-col gap-10">
          <div className='text-center pt-2'>
            <h1 className="text-5xl font-bold">Register</h1>
            <p className="py-6">
              Create your account now
            </p>
          </div>
          <div className="card flex-shrink-0 w-full lg:w-[500px] shadow-2xl bg-base-100">
            <div className="card-body">
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Name</span>
                </label>
                <input type="text" name="name" id="name" placeholder='e. g. John Doe' className='input input-bordered' />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input type="email" name="email" id="email" placeholder='e. g. dev@oralcam.com' className='input input-bordered' />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Username</span>
                </label>
                <input type="text" name="username" id="username" placeholder='e. g. OralCamUser' className='input input-bordered' />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Password</span>
                </label>
                <input type="password" name="password" id="password" placeholder='*********' className='input input-bordered' />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Confirm Password</span>
                </label>
                <input type="password" name="confpassword" id="confpassword" placeholder='*********' className='input input-bordered' />
              </div>
              <div className="form-control mt-6">
                <button className='btn btn-primary'>Register</button>
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

      <div className="relative text-center lg:text-right bg-base-200 pb-3 px-auto text-xs lg:text-base lg:right-10">
        <p>&copy; {new Date().getFullYear()} OralCam Dev</p>
      </div>
    </>
  )
}

export default Register