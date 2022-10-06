import React, { useEffect } from "react";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import Navbar from "../../components/Navbar";
import "./profile.style.css";
import { AiFillHome, AiFillProfile, AiFillFileImage } from "react-icons/ai";

const index = () => {
	useEffect(() => {
    let list = document.querySelectorAll(".sidebar-menu li");
    function activeLink() {
      list.forEach((item) => item.classList.remove(""));
      this.classList.add("hovered");
    }
    list.forEach((item) => item.addEventListener("mouseover", activeLink));
  }, []);

  return (
    <div className="prose lg:prose-lg">
      <Helmet>
        <title>OralCam - Dashboard</title>
      </Helmet>
      <div className="sidebar">
        <div className="sidebar-menu">
          <ul>
            <li>
              <Link to="#" className="sidebar-list-menu">
                <div className="flex justify-center items-center hover:text-base-content">
                  <span>
                    <AiFillHome />
                  </span>
                  <span className="title">Dashboard</span>
                </div>
              </Link>
            </li>
            <li>
              <Link to="#" className="sidebar-list-menu">
                <div className="flex justify-center items-center hover:text-base-content">
                  <span>
                    <AiFillProfile />
                  </span>
                  <span className="title">Profile</span>
                </div>
              </Link>
            </li>
            <li>
              <Link to="#" className="sidebar-list-menu">
                <div className="flex justify-center items-center hover:text-base-content">
                  <span>
                    <AiFillFileImage />
                  </span>
                  <span className="title">Image History</span>
                </div>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
  
};

export default index;
