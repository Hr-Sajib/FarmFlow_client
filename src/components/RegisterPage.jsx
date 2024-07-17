import axios from 'axios';
import React, { useState } from 'react';
import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Swal from "sweetalert2";
import bcrypt from 'bcryptjs';

const RegisterPage = () => {
    const [role, setRole] = useState('user');
    const navigate = useNavigate();
    const [existedUsers, setExistedUsers] = useState([]);

    useEffect(()=>{
        axios.get('http://localhost:5500/getUsers')
        .then(r=>{
            const users = r.data;
            users && setExistedUsers(users.map(user => user.emailOrMobile));
        })
    },[])


    const handleLogin = async (e) => {
        e.preventDefault();
    
        const emailOrMobile = e.target.emailOrMobile.value;
        const pin = e.target.password.value;
        const name = e.target.name.value;
    
        const isValidEmail = (email) => {
            // Simple regex for email validation
            return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
        };
    
        const isValidPhoneNumber = (phone) => {
            // Check if phone number is 11 digits and starts with "01"
            return /^01\d{9}$/.test(phone);
        };
        const isValidPin = (pin) => {
            // Check if the pin is exactly 4 digits
            return /^\d{4}$/.test(pin);
        };
        


        
    
        if ((isValidEmail(emailOrMobile) || isValidPhoneNumber(emailOrMobile))  &&  isValidPin(pin)){
            const balance = role=='user' ? 40 : role=='agent' ? 10000 : 0;
            const newUser = {name,emailOrMobile, role, status:'pending', balance}

            const saltRounds = 10;
            bcrypt.hash(pin, saltRounds, function(err, hash) {
            if (err) {
                console.error('Error hashing the pin:', err);
                return;
            }

            // Add hashed pin to the user object
            newUser.pin = hash;


            
            // check if user exists
            if(existedUsers.includes(emailOrMobile)){
                console.log("User already exists...");
                return;
            }


            axios.post('http://localhost:5500/addUser', newUser, {
                headers: {
                    "Content-Type":"application/json"
                }
            })
            .then(r =>{
                console.log(r.data)
                Swal.fire({
                    title: 'Registered Successfully',
                    icon: 'success',
                    confirmButtonText: 'OK',
                    customClass: {
                        confirmButton: 'custom-confirm-button'
                    }
                });
                r.data && navigate('/');
            }) 
        })
        }
        else{
            Swal.fire({
                        title: 'Enter Valid Credentials',
                        icon: 'error',
                        confirmButtonText: 'OK',
                        customClass: {
                            confirmButton: 'custom-confirm-button'
                        }
                    });
        }
        

    }

    return (
        <div className="min-h-screen flex flex-col items-center justify-center">
            <div className="w-full max-w-md p-8 space-y-6 bg-white shadow-md border  rounded-lg">
                <h1 className="text-3xl font-bold text-center">Register</h1>
                <form onSubmit={handleLogin} className="space-y-4">
                    <div className="flex justify-around items-center">
                        <p>As</p>
                        <button
                            type="button"
                            className={`px-4 py-2 rounded-md ${role === 'user' ? 'bg-[#1e40af] text-white' : 'bg-gray-200'}`}
                            onClick={() => setRole('user')}
                        >
                            User
                        </button>
                        <button
                            type="button"
                            className={`px-4 py-2 rounded-md ${role === 'agent' ? 'bg-[#1e40af] text-white' : 'bg-gray-200'}`}
                            onClick={() => setRole('agent')}
                        >
                            Agent
                        </button>
                    </div>
                    <div>
                        <input
                            type="text"
                            name='name'
                            className="w-full px-4 py-2 mt-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
                            required
                            placeholder='Name'
                        />
                    </div>
                    <div>
                        <input
                            type="text"
                            name='emailOrMobile'
                            className="w-full px-4 py-2 mt-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
                            required
                            placeholder='Email or Mobile'
                        />
                    </div>
                    <div>
                        <input
                            type="password"
                            name='password'
                            placeholder='4 Digit Pin'
                            className="w-full px-4 py-2 mt-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
                            required
                        />
                    </div>
                    <div>
                        <button
                            type="submit"
                            className="w-full px-4 py-2 font-bold text-white bg-[#1e40af] rounded-md border-0 hover:bg-blue-500 "
                        >
                            Register
                        </button>
                    </div>
                </form>
            </div>
            <div className='mt-5 flex items-center justify-between gap-5'>
                <p>Already Have an Account ?</p>
                <Link to="/"><button className='bg-blue-700 text-white p-2 font-bold rounded-md'>Log In</button></Link>
            </div>
        </div>
    );
};


export default RegisterPage;