import React from 'react'
import { Helmet } from 'react-helmet'
import { Link } from 'react-router-dom'
import Navbar from '../../components/Navbar'

const heroStyle = {
  backgroundImage: `url('https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1920&q=80')`,
  marginTop: '-4rem',
  zIndex: '-1',

}

const index = () => {
  return (
    <>
      <Helmet>
        <title>OralCam - Home</title>
      </Helmet>
      <Navbar>
        <div className="hero min-h-screen" style={heroStyle}>
          <div className="hero-overlay bg-opacity-70"></div>
          <div className="hero-content text-center prose lg:prose-lg text-neutral-content">
            <div className="max-m-md">
              <h1 className="mb-5 font-bold">Welcome to <span className='text-primary'>OralCam</span></h1>
              <p className="mb-5">We utilize up to date dental technologies and techniques to help you achieve a smile that you can be proud of, <br/> we provide on-site oral health care services.</p>
              <Link to="/capture" className='btn btn-primary rounded-lg'>Check Now</Link>
            </div>
          </div>
          <div className="text-center text-xs lg:text-base text-neutral-content absolute bottom-4">
            <p>&copy; {new Date().getFullYear()} OralCam Dev</p>
          </div>
        </div>
      </Navbar>
    </>
  )
}

export default index