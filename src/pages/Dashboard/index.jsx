import React from "react";
import { useEffect } from "react";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import { themeChange } from "theme-change";
import Sidebar from "../../components/Sidebar";

const index = () => {
  useEffect(() => {
    themeChange(false);
  }, []);

  return (
    <div className="prose lg:prose-lg">
      <Helmet>
        <title>OralCam - Profile</title>
      </Helmet>
      <div className="flex">
        <div className="flex-1">
          <Sidebar />
        </div>
      </div>
    </div>
  );
};

export default index;
