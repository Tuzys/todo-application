import React, { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { Link, Navigate } from "react-router-dom";
import "../index.css";

function Dashboard() {
  const [error, setError] = useState("");
  const { currentUser, logout } = useAuth();

  async function handleLogout() {
    setError("");
    try {
      await logout();
      Navigate("/login");
    } catch {
      setError("Failed to log out");
    }
  }
  return (
    <div className="h-screen w-screen bg-indigo-200 overflow-hidden absolute flex items-center">
      <div className="container mx-auto h-screen py-16 px-8 relative">
        <div className=" bg-white w-full rounded-lg h-full lg:overflow-hidden overflow-auto lg:flex-row flex-col shadow-2xl grid grid-cols-2">
          <div className="p-8 shadow-md relative bg-white">
            <div className="inline">
              <div className="h-10 w-10 bg-indigo-200"> </div>
              {error && <span>{error}</span>}
              <h1 className="text-indigo-200">
                Email: <span className="text-black">{currentUser.email}</span>
              </h1>
            </div>
            <div className="absolute bottom-0">
              <div className="bg-indigo-200 rounded-lg mt-4 border text-center shadow transition duration-200 ease-in-out transform hover:-translate-y-px hover:shadow-md cursor-pointer">
                <Link to="/updateprofile" className="font-semibold text-white m-3">
                  Update profile
                </Link>
              </div>
              <div className="bg-indigo-200 rounded-lg mt-4 border text-center shadow transition duration-200 ease-in-out transform hover:-translate-y-px hover:shadow-md cursor-pointer">
                <button
                  className="font-semibold text-white m-3"
                  variant="link"
                  onClick={handleLogout}
                >
                  Log out
                </button>
              </div>
            </div>
          </div>
          <div className="bg-gray-400 h-full">
            Tasks
            <div></div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
