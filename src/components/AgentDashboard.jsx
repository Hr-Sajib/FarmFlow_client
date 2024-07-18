
const AgentDashboard = () => {
    return (
        <div className="min-h-screen bg-gray-100 flex flex-col items-center">
            <header className="w-full bg-blue-700 text-white p-4">
                <h1 className="text-2xl font-bold text-center">Agent Dashboard</h1>
            </header>

            <main className="flex flex-col items-center mt-10 w-full px-6">
                <section className="w-full max-w-4xl bg-white rounded-lg shadow-md p-6 mb-6">
                    <h2 className="text-xl font-bold mb-4">Account Overview</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <p><strong>Name:</strong> Jane Doe</p>
                            <p><strong>Email:</strong> janedoe@example.com</p>
                            <p><strong>Phone Number:</strong> 0987654321</p>
                        </div>
                        <div>
                            <p><strong>Account Balance:</strong> 10,000 Taka</p>
                        </div>
                    </div>
                </section>

                <section className="w-full max-w-4xl bg-white rounded-lg shadow-md p-6 mb-6">
                    <h2 className="text-xl font-bold mb-4">Transaction Management</h2>
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
                                    <td className="py-2 px-4 border-b">Cash Out</td>
                                    <td className="py-2 px-4 border-b">User 1 to Agent</td>
                                    <td className="py-2 px-4 border-b">200 Taka</td>
                                </tr>
                                <tr>
                                    <td className="py-2 px-4 border-b">2024-07-02</td>
                                    <td className="py-2 px-4 border-b">Cash In</td>
                                    <td className="py-2 px-4 border-b">Agent to User 3</td>
                                    <td className="py-2 px-4 border-b">500 Taka</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </section>

                <section className="w-full max-w-4xl bg-white rounded-lg shadow-md p-6 mb-6">
                    <h2 className="text-xl font-bold mb-4">Balance Inquiry</h2>
                    <p className="text-gray-700">Your current balance is: <strong>10,000 Taka</strong></p>
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
                                <td className="py-2 px-4 border-b">Approved Cash In for User 3</td>
                                <td className="py-2 px-4 border-b">-500 Taka</td>
                            </tr>
                            <tr>
                                <td className="py-2 px-4 border-b">2024-07-02</td>
                                <td className="py-2 px-4 border-b">Approved Cash Out for User 1</td>
                                <td className="py-2 px-4 border-b">+200 Taka</td>
                            </tr>
                        </tbody>
                    </table>
                </section>
            </main>
        </div>
    );
};

export default AgentDashboard;
