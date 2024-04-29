import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Edit() {
    const [formData, setFormData] = useState({
        password: "",
    });
    const [updateSuccess, setUpdateSuccess] = useState(false);
    const navigate = useNavigate()
    const email = localStorage.getItem("EMAIL");

    useEffect(() => {

        const isEdited = localStorage.getItem("EDITED") === "true";
        if (isEdited) {

            navigate("/login");
        }
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (email) {
            try {
                const response = await axios.put(
                    `http://localhost:8004/api/auth/edit/${email}`,
                    { password: formData.password }, // Kirim password sebagai objek
                    {
                        headers: {
                            Accept: "application/json",
                            "Content-Type": "application/json", // Ganti menjadi application/json
                        },
                    }
                );

                console.log("Edit successful:", response.data);
                setUpdateSuccess(true);
                localStorage.setItem("EDITED", true)
            } catch (error) {
                console.error("Edit failed:", error);
            }
        }
    };

    return (
        <>
            <div>Edit</div>
            <form onSubmit={handleSubmit}>
                <label>
                    New Password:
                    <input
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                    />
                </label>
                <button type="submit">Update Password</button>
            </form>
            {updateSuccess && <p>Password updated successfully!</p>}
        </>
    );
}
