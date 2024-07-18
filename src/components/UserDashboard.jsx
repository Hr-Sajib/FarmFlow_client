import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const UserDashboard = () => {

    const navigate = useNavigate();

    const handleLogOut =()=>{
        localStorage.removeItem('access-token');
        localStorage.removeItem('user-billnotes');
        navigate('/');
    }


    return (
        <div className="min-h-screen bg-gray-100 flex flex-col items-center lg:pb-10">
            <header className="w-full bg-blue-700 text-white p-4">
                <h1 className="text-2xl font-bold text-center">User Dashboard</h1>
            </header>

            <main className="flex flex-col items-center mt-10 w-full px-6">
                <section className="w-full max-w-4xl bg-white rounded-lg shadow-md p-6 mb-6">
                    <h2 className="text-xl font-bold mb-4">Account Overview</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className='border rounded-xl lg:p-4' >
                            <p className='text-left'>Name: <strong> John Doe</strong></p>
                            <p className='text-left'><strong> johndoe@example.com</strong></p>
                        </div>
                        <div className='border rounded-xl lg:p-4'>
                            <p className='text-5xl'>400</p>
                            <p>Account Balance</p>
                        </div>
                    </div>
                    <div className='flex justify-end pr-1'>
                        <button onClick={handleLogOut} className='bg-red-200 p-2 mt-5 rounded-lg font-bold'>Log Out</button>
                    </div>
                </section>

                <section className="w-full max-w-4xl bg-white rounded-lg shadow-md p-6 mb-6">
                    <h2 className="text-xl font-bold mb-4">Send Money</h2>
                    <form className="space-y-4">
                        <div>
                            <label className="block text-gray-700">Recipient's Email or Mobile</label>
                            <input
                                type="text"
                                className="w-full px-4 py-2 mt-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
                            />
                        </div>
                        <div>
                            <label className="block text-gray-700">Amount</label>
                            <input
                                type="number"
                                className="w-full px-4 py-2 mt-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
                            />
                        </div>
                        <div>
                            <label className="block text-gray-700">PIN</label>
                            <input
                                type="password"
                                className="w-full px-4 py-2 mt-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
                            />
                        </div>
                        <button
                            type="submit"
                            className="w-full px-4 py-2 font-bold text-white bg-blue-700 rounded-md border-0 hover:bg-blue-500"
                        >
                            Send Money
                        </button>
                    </form>
                </section>

                <section className="w-full max-w-4xl bg-white rounded-lg shadow-md p-6 mb-6">
                    <h2 className="text-xl font-bold mb-4">Cash Out</h2>
                    <form className="space-y-4">
                        <div>
                            <label className="block text-gray-700">Agent's Email or Mobile</label>
                            <input
                                type="text"
                                className="w-full px-4 py-2 mt-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
                            />
                        </div>
                        <div>
                            <label className="block text-gray-700">Amount</label>
                            <input
                                type="number"
                                className="w-full px-4 py-2 mt-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
                            />
                        </div>
                        <div>
                            <label className="block text-gray-700">PIN</label>
                            <input
                                type="password"
                                className="w-full px-4 py-2 mt-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
                            />
                        </div>
                        <button
                            type="submit"
                            className="w-full px-4 py-2 font-bold text-white bg-blue-700 rounded-md border-0 hover:bg-blue-500"
                        >
                            Cash Out
                        </button>
                    </form>
                </section>

                <section className="w-full max-w-4xl bg-white rounded-lg shadow-md p-6 mb-6">
                    <h2 className="text-xl font-bold mb-4">Balance Inquiry</h2>
                    <p className="text-gray-700">Your current balance is: <strong>40 Taka</strong></p>
                </section>

                <section className="w-full max-w-4xl bg-white rounded-lg shadow-md p-6">
                    <h2 className="text-xl font-bold mb-4">Transaction History</h2>
                    <table className="min-w-full bg-white">
                        <thead>
                            <tr>
                                <th className="py-2 px-4 border-b">Date</th>
                                <th className="py-2 px-4 border-b">Description</th>
                                <th className="py-2 px-4 border-b">Amount</th>
                            </tr>
                        </thead>
                        <tbody>
                            {/* Sample transactions */}
                            <tr>
                                <td className="py-2 px-4 border-b">2024-07-01</td>
                                <td className="py-2 px-4 border-b">Sent Money to 0123456789</td>
                                <td className="py-2 px-4 border-b">-100 Taka</td>
                            </tr>
                            <tr>
                                <td className="py-2 px-4 border-b">2024-07-02</td>
                                <td className="py-2 px-4 border-b">Cash In from Agent</td>
                                <td className="py-2 px-4 border-b">+500 Taka</td>
                            </tr>
                        </tbody>
                    </table>
                </section>
            </main>
        </div>
    );
};

export default UserDashboard;
