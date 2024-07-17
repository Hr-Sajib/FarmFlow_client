import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Swal from "sweetalert2";
import bcrypt from 'bcryptjs';

const LoginPage = () => {
    const navigate = useNavigate();
    const [existedUsers, setExistedUsers] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:5500/getUsers')
            .then(r => {
                const users = r.data;
                users && setExistedUsers(users.map(user => ({
                    emailOrMobile: user.emailOrMobile,
                    role: user.role,
                    pin: user.pin
                })));
            })
            .catch(err => {
                console.error('Error fetching users:', err);
            });
    }, []);

    const handleLogin = async (e) => {
        e.preventDefault();

        const emailOrMobile = e.target.emailOrMobile.value;
        const enteredPin = e.target.password.value;

        const isValidEmail = (email) => {
            return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
        };

        const isValidPhoneNumber = (phone) => {
            return /^01\d{9}$/.test(phone);
        };

        const isValidPin = (pin) => {
            return /^\d{4}$/.test(pin);
        };

        if ((isValidEmail(emailOrMobile) || isValidPhoneNumber(emailOrMobile)) && isValidPin(enteredPin)) {
            const retrievedUser = existedUsers.find(user => user.emailOrMobile === emailOrMobile);

            if (retrievedUser) {
                bcrypt.compare(enteredPin, retrievedUser.pin, function (err, result) {
                    if (err) {
                        console.error('Error comparing pins:', err);
                        Swal.fire({
                            title: 'Error',
                            text: 'An error occurred while verifying your pin.',
                            icon: 'error',
                            confirmButtonText: 'OK',
                            customClass: {
                                confirmButton: 'custom-confirm-button'
                            }
                        });
                        return;
                    }

                    if (result) {
                        Swal.fire({
                            title: 'Login Successful',
                            icon: 'success',
                            confirmButtonText: 'OK',
                            customClass: {
                                confirmButton: 'custom-confirm-button'
                            }
                        }).then(() => {

                            e.target.emailOrMobile.value = '';
                            e.target.password.value = '';

                            // save to LS
                            localStorage.setItem('user-billnotes', emailOrMobile);
                            
                            // jwt token save
                            const curUser = emailOrMobile;
                            axios.post('http://localhost:5500/jwt', {curUser})
                            .then(res=>{
                                if(res.data){
                                    localStorage.setItem('access-token', res.data);
                                    if(retrievedUser.role == 'admin'){
                                        navigate('/adminDash');
                                    }
                                    else if (retrievedUser.role == 'agent'){
                                        navigate('/agentDash');
                                    }
                                    else{
                                        navigate('/userDash');
                                    }
                                }
                            })

                        });
                    } else {
                        Swal.fire({
                            title: 'Invalid Pin',
                            icon: 'error',
                            confirmButtonText: 'OK',
                            customClass: {
                                confirmButton: 'custom-confirm-button'
                            }
                        });
                    }
                });
            } else {
                Swal.fire({
                    title: 'No Account Found',
                    icon: 'error',
                    confirmButtonText: 'OK',
                    customClass: {
                        confirmButton: 'custom-confirm-button'
                    }
                });
            }
        } else {
            Swal.fire({
                title: 'Enter Valid Credentials',
                icon: 'error',
                confirmButtonText: 'OK',
                customClass: {
                    confirmButton: 'custom-confirm-button'
                }
            });
        }
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-center">
            <div className="w-full max-w-md p-8 space-y-6 bg-white shadow-md border rounded-lg">
                <h1 className="text-3xl font-bold text-center">Login</h1>
                <form onSubmit={handleLogin} className="space-y-4">
                    <div>
                        <input
                            type="text"
                            name='emailOrMobile'
                            className="w-full px-4 py-2 mt-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
                            placeholder='Email or Mobile'
                            required
                        />
                    </div>
                    <div>
                        <input
                            type="password"
                            name='password'
                            className="w-full px-4 py-2 mt-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
                            placeholder='4 Digit Pin'
                            required
                        />
                    </div>
                    <div>
                        <button
                            type="submit"
                            className="w-full px-4 py-2 font-bold text-white bg-[#1e40af] rounded-md border-0 hover:bg-blue-500"
                        >
                            Login
                        </button>
                    </div>
                </form>
            </div>
            <div className='mt-5 flex items-center justify-between gap-5'>
                <p>Don't Have an Account ?</p>
                <Link to="/register"><button className='bg-blue-700 text-white p-2 font-bold rounded-md'>Register</button></Link>
            </div>
        </div>
    );
};

export default LoginPage;
