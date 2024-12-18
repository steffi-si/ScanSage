import { useState ,useEffect } from "react";
import {  Navigate } from "react-router-dom";
import { useAuth } from "../context/useAuthContext.jsx";


function UserMgtOverview () {
    const { getToken } = useAuth();
    const [users, setUsers] = useState([]);
    const [filteredUsers, setFilteredUsers] = useState([]);
    const [filterValue, setFilterValue] = useState("");

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response= await fetch("https://localhost:3000/api/users");
                if(!response.ok) {
                    throw new Error('Something went wrong!');
                }
                const data = await response.json();
                setUsers(data);
                setFilteredUsers(data);
            } catch(error) {
                console.error(error);
            }
        };
        fetchUsers();
    }, [getToken]);

    const handleFilterChange = (e) => {
        const value = e.target.value;
        setFilterValue(value);
        const filtered = users.filter(user => 
            user.personnelNumber.toLowerCase().includes(value.toLowerCase())
        );
        setFilteredUsers(filtered);
    };

    return(
        <div className="user-mgt-overview">
            <h2>User Management Overview</h2>
            <div className="filter-container">
                <input 
                    type="text" 
                    placeholder="Search by personnel number" 
                    value={filterValue}
                    onChange={handleFilterChange}
                />
            </div>
            <div className="user-card-container">
                {filteredUsers.map(user => (
                    <UserCard key={user.id} user={user} />
                ))}
            </div>
        </div>
    )
}

function UserCard({ user }) {
    return (
        <div className="user-card">
           <div className="user-icon">👤</div>
           <h2>{user.firstName}{user.lastName}</h2> 
           <p>Role:{user.authorisationRole}</p> 
           <p>Personnel Number: {user.personnelNumber}</p>
           <p>Address: {user.addressDetails.street} {user.addressDetails.houseNumber}, {user.addressDetails.postcode} {user.addressDetails.city}</p>
           <p>Phone:{user.contactDetails.phoneNumber}</p>
           <p>On Call:{user.contactDetails.onCall ? 'YES' : 'NO'}</p>
           {user.contactDetails.onCall && <p>On Call Phone: {user.contactDetails.onCallPhoneNumber}</p>}
           <p>Employed Since: {user.employedSince.toDateString()}</p>
           <p>Department:{user.department}</p>
        </div>
    );
}

export default UserMgtOverview;