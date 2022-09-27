import React from 'react'
import { Helmet } from 'react-helmet'
import { Link } from 'react-router-dom'
import Navbar from '../../components/Navbar'
import Sidebar from '../../components/Sidebar'

const index = () => {
	return (
    <div className='prose lg:prose-lg'>
      <Helmet>
        <title>OralCam - Profile</title>
      </Helmet>
			<Sidebar/>
    </div>
  )
}

export default index