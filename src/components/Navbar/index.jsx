/* eslint-disable no-restricted-globals */
import React, { useEffect, useState } from 'react'
import { themeChange } from 'theme-change'
import { Link, useNavigate } from 'react-router-dom'
import { BsList } from 'react-icons/bs'
import { IoColorPalette } from 'react-icons/io5'
import { toast } from 'react-toastify'
import { getUser, logout } from '../../utilities/backendService'

const Navbar = ({ children }) => {
  const [user, setUser] = useState({})
  const navigate = useNavigate()

  const handleLogout = async e => {
    e.preventDefault()

    logout()
      .then(res => {
        console.log(res);
        toast.success('Logout Success!')
        localStorage.removeItem('token')
        localStorage.removeItem('user')
        navigate('/login')
      })
      .catch(err => {
        console.log(err);
        toast.error(err)
      })
  }

  useEffect(() => {
    themeChange(false)
    if (localStorage.getItem('token')) {
      getUser()
        .then(res => {
          localStorage.setItem('user', JSON.stringify(res.data))
          setUser(res.data)
          console.log(res);
        })
        .catch(err => {
          console.log(err);
        })
    } else {
      setUser(null)
    }

  }, [])

  return (
    <nav className='drawer'>
      <input type="checkbox" id="drawer-nav" className='drawer-toggle' />
      <div className="drawer-content flex flex-col">
        {/* NAVBAR  */}
        <div className="w-full navbar bg-transparent lg:px-10 text-white">
          <div className='flex-none lg:hidden'>
            <label htmlFor="drawer-nav" className='btn btn-square btn-ghost text-3xl'>
              <BsList />
            </label>
          </div>
          <div className='flex-1 px-2 mx-2 font-bold text-3xl hidden lg:block text-primary'>
            <Link to='/'>OralCam</Link>
          </div>
          <div className='hidden flex-none lg:block'>
            <div className="flex gap-1 items-center justify-center">
              <div className="dropdown dropdown-end">
                <label tabIndex={0} className='m-auto btn btn-circle btn-ghost text-3xl rounded-full'>
                  <IoColorPalette className='text-primary' />
                </label>
                <ul tabIndex={0} className='dropdown-content menu menu-compact p-2 shadow rounded-box w-20 text-base-content bg-base-100 '>
                  <li><a href='#' data-set-theme='mytheme' className='mb-1'>Dark</a></li>
                  <li><a href='#' data-set-theme='mytheme2'>Light</a></li>
                </ul>
                {/* <label className="swap swap-rotate">

                  <input type="checkbox" data-toggle-theme='mytheme2' data-act-class='active'/>

                  <svg className="swap-on fill-current w-10 h-10" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z" /></svg>

                  <svg className="swap-off fill-current w-10 h-10" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z" /></svg>

                </label> */}
              </div>
              {
                user ?
                  <div className="dropdown dropdown-end">
                    <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                      <div className="w-10 rounded-full">
                        {/* <img src="https://placeimg.com/80/80/people" alt="avatar" /> */}
                        <img src="https://i.pravatar.cc/300?img=37" alt="avatar" />
                      </div>
                    </label>
                    <ul tabIndex={0} className='menu menu-compact dropdown-content mt-3 p-2 shadow text-base-content bg-base-100 rounded-box w-52'>
                      <div className='border-b mb-3 p-3'>
                        <h5>{user.name}</h5>
                      </div>
                      <li>
                        <Link to='/'>Profile</Link>
                        <button onClick={handleLogout}>Logout</button>
                      </li>
                    </ul>
                  </div>
                  :
                  <ul className='menu menu-horizontal text-neutral-content'>
                    <li className='rounded font-semibold'><Link to='/login'>Login</Link></li>
                    <li className='rounded font-semibold'><Link to='/register'>Register</Link></li>
                  </ul>
              }
            </div>
          </div>
        </div>
        {/* END NAVBAR  */}
        {children}
      </div>
      <div className="drawer-side">
        <label htmlFor="drawer-nav" className='drawer-overlay'></label>
        {
          user ?

            <ul className='menu p-4 overflow-y-auto w-80 bg-base-100'>
              <div className="flex items-center gap-3">
                <div className="w-10 ml-3">
                  {/* <img src="https://placeimg.com/80/80/people" alt="avatar" /> */}
                  <img src="https://i.pravatar.cc/300?img=37" className='rounded-full' alt="avatar" />
                </div>
                <h5>{user.name}</h5>
              </div>
              <div className='divider'></div>
              <li className='rounded font-semibold'><Link to='/profile'>Profile</Link></li>
              <li className='rounded font-semibold'><button onClick={handleLogout}>Logout</button></li>
            </ul>
            :
            <ul className='menu p-4 overflow-y-auto w-80 bg-base-100'>
              <li className='rounded font-semibold'><Link to='/login'>Login</Link></li>
              <li className='rounded font-semibold'><Link to='/register'>Register</Link></li>
            </ul>
        }
      </div>
    </nav>
  )
}

export default Navbar