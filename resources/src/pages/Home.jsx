import React from "react";
import { UserStore } from "../Context/UserContext";
import { useState, useEffect, useContext } from "react";
import AOS from "aos";
import 'aos/dist/aos.css';
import LoginCon from "../components/Navbar/LoginCon"
export default function Home() {

    const [data, setData] = useState()
    const [user, setUser] = useContext(UserStore);
    console.log(user.user.email);
    console.log(user)

    useEffect(() => {
        AOS.init()
    },[])
    return (
        <>
            <main data-aos="fade-up" data-aosduration="3000" className="flex-1 text-2xl font-mono">
                <h1>Welcome</h1>

                <h2>{user.user.email}</h2>
                <h3>{user.user.name}</h3>

            </main>
        </>
    );
}
