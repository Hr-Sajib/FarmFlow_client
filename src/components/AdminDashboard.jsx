import React from 'react';

const AdminDashboard = () => {
    return (
        <div className="min-h-screen bg-gray-100 flex flex-col items-center">
            <header className="w-full bg-blue-700 text-white p-4">
                <h1 className="text-2xl font-bold text-center">Admin Dashboard</h1>
            </header>

            <main className="flex flex-col items-center mt-10 w-full px-6">
                <section className="w-full max-w-4xl bg-white rounded-lg shadow-md p-6 mb-6">
                    <h2 className="text-xl font-bold mb-4">User Management</h2>
                    <form className="space-y-4">
                        <div>
                            <label className="block text-gray-700">Search User by Name</label>
                            <input
                                type="text"
                                className="w-full px-4 py-2 mt-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
                            />
                        </div>
                        <button
                            type="submit"
                            className="w-full px-4 py-2 font-bold text-white bg-blue-700 rounded-md border-0 hover:bg-blue-500"
                        >
                            Search
                        </button>
                    </form>
                    <div className="mt-6">
                        <h3 className="text-lg font-bold mb-2">User List</h3>
                        <ul className="list-disc pl-5">
                            <li>User 1 - Status: Active</li>
                            <li>User 2 - Status: Pending</li>
                            {/* Add more users as needed */}
                        </ul>
                    </div>
                </section>

                <section className="w-full max-w-4xl bg-white rounded-lg shadow-md p-6 mb-6">
                    <h2 className="text-xl font-bold mb-4">System Monitoring</h2>
                    <div className="overflow-x-auto">
                        <table className="min-w-full bg-white">
                            <thead>
                                <tr>
                                    <th className="py-2 px-4 border-b">Date</th>
                                    <th className="py-2 px-4 border-b">Transaction Type</th>
                                    <th className="py-2 px-4 border-b">Details</th>
                                    <th className="py-2 px-4 border-b">Amount</th>
                                </tr>
                            </thead>
                            <tbody>
                                {/* Sample transactions */}
                                <tr>
                                    <td className="py-2 px-4 border-b">2024-07-01</td>
                                    <td className="py-2 px-4 border-b">Send Money</td>
                                    <td className="py-2 px-4 border-b">User 1 to User 2</td>
                                    <td className="py-2 px-4 border-b">100 Taka</td>
                                </tr>
                                <tr>
                                    <td className="py-2 px-4 border-b">2024-07-02</td>
                                    <td className="py-2 px-4 border-b">Cash In</td>
                                    <td className="py-2 px-4 border-b">Agent 1 to User 3</td>
                                    <td className="py-2 px-4 border-b">500 Taka</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </section>
            </main>
        </div>
    );
};

export default AdminDashboard;
