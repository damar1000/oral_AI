import React, { useState, useEffect } from 'react'
import { Helmet } from 'react-helmet'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { HiArrowNarrowLeft } from 'react-icons/hi'
import { login } from '../../utilities/backendService'

const Login = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()

  useEffect(() => {
    if (localStorage.getItem('token') && localStorage.getItem('user')) {
      navigate('/')
    }
  })

  const loginHandler = async e => {
    e.preventDefault()

    if (username === '' || password === '') {
      toast.warn('Please fill in all fields')
      return null
    }

    login(username, password)
      .then(res => {
        console.log(res);
        toast.success(res.data.message)
        localStorage.setItem('token', res.data.token)
        navigate('/')
        // window.location.href = '/'
      })
      .catch(err => {
        console.log(err);
        toast.error(err.response.data.message)
      })
  }

  return (
    <>
      <Helmet>
        <title>OralCam - Login</title>
      </Helmet>

      <div className='hero min-h-screen bg-base-200'>
        <div className="hero-content prose lg:prose-lg flex-col gap-2">
          <div className="text-center">
            <h1 className='font-bold'>Login</h1>
            <p className="py-2">
              Login now to get access to our services
            </p>
          </div>
          <div className="card flex-shrink-0 lg:w-[400px] w-full shadow-2xl bg-base-100">
            <div className="card-body">
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Username or Email</span>
                </label>
                <input type="text" name="username" id="username" value={username} onChange={e => setUsername(e.target.value)} placeholder='Type your username or email here...' className='input input-bordered' />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Password</span>
                </label>
                <input type="password" name="password" id="password" value={password} onChange={e => setPassword(e.target.value)} placeholder='Type your password here...' className='input input-bordered' />
              </div>
              <div className="form-control mt-6">
                <button className='btn btn-primary' onClick={loginHandler}>Login</button>
              </div>
            </div>
          </div>
          <div className="text-center">
            <p className="text-base-content">
              Don't have an account? <Link to='/register' className='text-primary'>Register</Link>
            </p>
          </div>
        </div>

        <div className="absolute top-4 left-5 lg:left-10">
          <Link to='/' className='flex items-center gap-5'>
            <HiArrowNarrowLeft className='text-xl' />
            <p className='lg:block hidden'>Back to Home</p>
          </Link>
        </div>

        <div className="absolute bottom-4 text-xs lg:text-base lg:right-10">
          <p>&copy; {new Date().getFullYear()} OralCam Dev</p>
        </div>
      </div>
    </>
  )
}

export default Login