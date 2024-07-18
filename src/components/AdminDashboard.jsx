import axios, { all } from 'axios';
import e from 'cors';
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

const AdminDashboard = () => {
    const navigate = useNavigate();

    const [allUsers, setAllUsers] = useState([]);

    const fetchUsers =()=>{
            axios.get('http://localhost:5500/getUsers')
                .then(r => {
                    const all = r.data;
                    const withOutAdminAll =all.filter(u=> u.role !== 'admin');
                    r.data && setAllUsers(withOutAdminAll);
                })
                .catch(err => {
                    console.error('Error fetching users:', err);
                });
    }

    useEffect(() => {
        fetchUsers();
    }, []);






    const handleLogOut =()=>{
        localStorage.removeItem('access-token');
        localStorage.removeItem('user-billnotes');
        navigate('/');
    }


    return (
        <div className="min-h-screen bg-gray-100 flex flex-col items-center">
            <header className="w-full bg-blue-700 text-white p-4">
                <h1 className="text-2xl font-bold text-center">Admin Dashboard</h1>
            </header>
            <div className='w-full flex justify-end pr-5'>
                <button onClick={handleLogOut} className='bg-red-200 p-2 mt-5 rounded-md font-bold'>Log Out</button>
            </div>

            <main className="flex flex-col items-center mt-10 w-full px-6">
                <section className="w-full max-w-4xl bg-white rounded-lg shadow-md p-6 mb-6">
                    <h2 className="text-xl font-bold mb-4">User & Agent Management</h2>
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
                        <h3 className="text-lg font-bold mb-2">Accounts List</h3>
                        <div className='flex justify-between px-3  bg-blue-100 p-1 mb-2'>
                            <p className='border w-[20%] text-left'>Name</p> <p className='border w-[20%]'>Role Requested</p><p className='border w-[20%]'>Status</p> <p className='border w-[30%] text-right'>Approval</p>
                        </div>
                        {
                            allUsers.map(user => <Row user={user} key={user._id} fetchUsers={fetchUsers}></Row>)
                        }
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



const Row =({user , fetchUsers})=>{

    const handleUpdateStatus = (e)=>{

        e.preventDefault();
        const value = (e.target.approval.value)
        
        axios.put(`http://localhost:5500/userApproval/${user._id}`, {value}, {
            headers: {
                "Content-Type":'application/json'
            }
        })
        .then(r=>{
            r.data && Swal.fire({
                title: 'Status Updated',
                icon: 'success',
                confirmButtonText: 'OK',
                customClass: {
                    confirmButton: 'custom-confirm-button'
                }
            })
            fetchUsers();
        })

    
    }


        
    
    return(
        <div className='flex justify-between text-left bg-gray-100 p-1 mb-1 px-2'>
            <p className=' w-[20%]'>{user.name}</p>
            <p className=' w-[20%] text-center'>{user.role}</p>
            <p className={user.status == 'active' ? `text-center w-[20%] text-center1 text-green-700` : user.status == 'blocked' ?  `text-center w-[20%] text-center1 text-red-700` :  `text-center w-[20%] text-center1`  }>{user.status}</p>
            <div className=' w-[30%] flex justify-end'>
                <form onSubmit={handleUpdateStatus}>
                    <select className='bg-gray-600 text-white p-[6px] mr-2 ' name="approval">
                        <option value="pending">Pending</option>
                        <option value="active">Approve</option>
                        <option value="blocked">Block</option>
                    </select>
                    <input className='bg-gray-600 p-1 text-white  px-3' type="submit" value="Apply" />

                </form>
            </div>
        </div>
    )
}