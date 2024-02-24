import React from "react";
import { useNavigate} from "react-router-dom";
import { UserStore } from "../../Context/UserContext";
import { useState, useEffect, useContext} from 'react'
import LoginCon from "./LoginCon"
import Fab from "../FAB";
import {Button} from "@chakra-ui/react"

export default function Header() {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = () => {
      setIsModalOpen(true);
    };

    const closeModal = () => {
      setIsModalOpen(false);
    };
    const navigate = useNavigate()


    return (
        <>
            <main>
                <div>
                <div className="flex justify-center items-center">
                <Button
                  colorScheme="blue"
                  size="lg"
                  position="fixed"
                  bottom="10"
                  right="10"
                  onClick={openModal}
                >
                  +
                </Button>
                <Fab isOpen={isModalOpen} onClose={closeModal} />
              </div>
                    <div className="navbar bg-base-100">
                        <div className="navbar-start">
                            <div className="dropdown">
                                <div
                                    tabIndex={0}
                                    role="button"
                                    className="btn btn-ghost lg:hidden"
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-5 w-5"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M4 6h16M4 12h8m-8 6h16"
                                        />
                                    </svg>
                                </div>
                                <ul
                                    tabIndex={0}
                                    className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
                                >
                                    <li>
                                        <a>Item 1</a>
                                    </li>
                                    <li>
                                        <a>Parent</a>
                                        <ul className="p-2">
                                            <li>
                                                <a>Submenu 1</a>
                                            </li>
                                            <li>
                                                <a>Submenu 2</a>
                                            </li>
                                        </ul>
                                    </li>
                                    <li>
                                        <a>Item 3</a>
                                    </li>
                                </ul>
                            </div>
                            <a className="btn btn-ghost text-xl">Polls</a>
                        </div>
                        <div className="navbar-center hidden lg:flex">
                            <ul className="menu menu-horizontal px-1">
                                <li>
                                    <a>About</a>
                                </li>

                                <li>
                                    <a>Make Polls</a>
                                </li>
                            </ul>
                        </div>
                        <div className="navbar-end gap-4">

                            <button onClick={() => navigate("/register")} className="btn btn-warning text-white">
                                Register
                            </button>
                            <LoginCon/>
                        </div>
                    </div>
                </div>
            </main>
        </>
    );
}
