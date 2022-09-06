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

  useEffect(() => {
    themeChange(false)
  })

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
                <ul tabIndex={0} className='dropdown-content menu menu-compact p-2 shadow rounded-box w-20 text-base bg-slate-700 '>
                  <li><a href='#' data-set-theme='mytheme' className='mb-1'>Dark</a></li>
                  <li><a href='#' data-set-theme='mytheme2'>Light</a></li>
                </ul>
              </div>
              {
                user ?
                  <div className="dropdown dropdown-end">
                    <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                      <div className="w-10 rounded-full">
                        <img src="https://placeimg.com/80/80/people" alt="avatar" />
                      </div>
                    </label>
                    <ul tabIndex={0} className='menu menu-compact dropdown-content mt-3 p-2 shadow bg-slate-700 rounded-box w-52'>
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