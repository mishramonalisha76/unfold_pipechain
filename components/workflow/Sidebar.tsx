import React, { useState, useEffect, useContext } from "react";
import Action from "../../public/types/Action";
import SidebarProps from "../../public/types/SidebarProps";
import { config } from "../../config";
import { WorkflowDataContext } from "@/context";
import Application from "@/public/types/Application";
// import slackIcon from "/slack.png"; // Replace with the actual path to your Slack icon image
// import typeformIcon from "/typeform.png";

const { SERVER_URL } = config;

const Sidebar: React.FC<SidebarProps> = ({
  onApplicationClick,
  isSidebarOpen,
  toggleSidebar,
}) => {
  const { applications } = useContext(WorkflowDataContext);
  // useEffect(() => {
  //   fetch(`http://localhost:3001/getActions`,{method:'GET',headers:{'Content-Type': 'application/json'}})
  //     .then((response) => {console.log(response); return response.json()})
  //     .then((responseData) => {
  //       console.log("RESPONSE_DATA",responseData);
  //       setActions(responseData);
  //     })
  //     .catch((error) => {
  //       console.error('Error fetching data:', error);
  //     });
  // }, []);

  return (
    <div
      className={`${
        isSidebarOpen ? "right-0" : "-right-full"
      } overflow-y-auto fixed top-0 h-full bg-indigo-300 z-50 py-4 w-[25%]  transition-transform duration-300 ease-in-out transform`}
    >
      <button onClick={toggleSidebar} className="text-4xl absolute left-4">
        x
      </button>
      <div className="flex flex-col mt-20 h-[100%] mx-4 items-center">
        {applications.map((application, index) => (
          <div
            key={index}
            className=" flex gap-4 w-[100%] items-center py-4  px-6 m-2 bg-indigo-200 hover:bg-indigo-900 cursor-pointer hover:text-white  rounded-md "
            onClick={() => {
              toggleSidebar();
              onApplicationClick(application);
            }}
            style={{ cursor: "pointer" }}
          >
            <div className="w-10 h-10 overflow-hidden">
              <img
                className=" w-[100%] h-[100%] object-contain rounded-full"
                src={application.meta.src}
                alt="Icon"
              />
            </div>
            <span className="font-semibold tracking-wide text-lg ">
              {application.name}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
