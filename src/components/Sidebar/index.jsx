import React, {useEffect} from 'react'
import { Helmet } from 'react-helmet'
import { Link } from 'react-router-dom'
import Navbar from '../../components/Navbar'
import './profile.style.css'
import {AiFillHome, AiFillProfile} from 'react-icons/ai'


const index = () => {
	
	return (
    <div className='prose lg:prose-lg'>
      <Helmet>
        <title>OralCam - Profile</title>
      </Helmet>
				<div className='sidebar'>
					<div className='sidebar-brand'>
						<Link to='/' className='no-underline'><h1><span className='w-full navbar bg-transparent lg:px-10 text-neutral-content'>OralCam</span></h1></Link>
					</div>
					<div className='sidebar-menu'>
						<ul>
							<li>
								<a href='#'>
									<span class="icon"></span>
									<span class="title">Dashboard</span>
								</a>
							</li>
							<li>
								<a href='#'>
									<span class="icon"></span>
									<span class="title">Profile</span>
								</a>
							</li>
							<li>
								<a href='#'>
									<span class="icon"></span>
									<span class="title">Image History</span>
								</a>
							</li>
						</ul>
					</div>
					{/* main */}
					{/* <div class="main">
						<div class="topbar">
							<div class="toggle">
									<AiFillProfile/>
							</div>
						</div>
					</div> */}
				</div>
    </div>
  )
	// useEffect(() => {
	// 	let list = document.querySelectorAll('.sidebar-menu li');
	// 	function activeLink(){
	// 		list.forEach((item)=>
	// 		item.classList.remove(''));
	// 		this.classList.add('hovered');
	// 	}
	// 	list.forEach((item)=>
	// 	item.addEventListener('mouseover',activeLink));
	// });
  
}

export default index