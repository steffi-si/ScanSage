import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/useAuthContext.jsx";

function UserMgtOverview() {
  const { getToken } = useAuth();
  const [users, setUsers] = useState([]);
  const [filterRole, setFilterRole] = useState("");
  const [filterDepartment, setFilterDepartment] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    console.log("Filter changed:", { filterRole, filterDepartment, currentPage });
    fetchUsers();
  }, [filterRole, filterDepartment, currentPage]);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const token = getToken();
      const queryParams = new URLSearchParams();
      if (filterRole) queryParams.append('role', filterRole);
      if (filterDepartment) queryParams.append('department', filterDepartment);
      queryParams.append('page', currentPage.toString());
      queryParams.append('limit', '10');

      const response = await fetch(`http://localhost:3000/api/users?${queryParams.toString()}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setUsers(data.users);
      setTotalPages(Math.ceil(data.totalCount / data.limit));
      setError(null);
    } catch (error) {
      setError(`Error fetching users: ${error.message}`);
      setUsers([]);
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (filterType, value) => {
    console.log(`Changing ${filterType} filter to:`, value);
    if (filterType === 'role') {
      setFilterRole(value);
    } else if (filterType === 'department') {
      setFilterDepartment(value);
    }
    setCurrentPage(1);
  };


  return (
    <div className="user-mgt-overview">
    <h2>User Management Overview</h2>
    
    <FilterComponent 
      onFilterChange={handleFilterChange} 
      filterRole={filterRole} 
      filterDepartment={filterDepartment} 
    />
    
    {loading ? (
      <p>Loading...</p>
    ) : error ? (
      <p>Error: {error}</p>
    ) : users.length > 0 ? (
      <div key={`${filterRole}-${filterDepartment}`}  className="user-card-container">
        {users.map((user) => (
          <UserCard key={user._id} user={user} />
        ))}
      </div>
    ) : (
      <p>No users found</p>
    )}
    <div className="pagination">
      <button
        onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
        disabled={currentPage === 1}
      >
        Previous
      </button>
      <span>
        {currentPage} of {totalPages}
      </span>
      <button
        onClick={() =>
          setCurrentPage((prev) => Math.min(prev + 1, totalPages))
        }
        disabled={currentPage === totalPages}
      >
        Next
      </button>
    </div>
  </div>
  );
}

function UserCard({ user }) {
  return (
    <div className="user-card">
      <div className="user-icon">👤</div>
      <h3>
        {user.firstName} {user.lastName}
      </h3>
      <p><strong>Role:</strong> {user.authorisationRole}</p>
      <p><strong>Personnel Number:</strong> {user.personnelNumber}</p>
      <p>
        <strong>Address:</strong> {user.addressDetails.street} {user.addressDetails.houseNumber},{" "}
        {user.addressDetails.postcode} {user.addressDetails.city}
      </p>
      <p><strong>Phone:</strong> {user.contactDetails.phoneNumber}</p>
      <p><strong>On Call:</strong> {user.contactDetails.onCall ? "YES" : "NO"}</p>
      {user.contactDetails.onCall && (
        <p><strong>On Call Phone:</strong> {user.contactDetails.onCallPhoneNumber}</p>
      )}
      <p><strong>Employed Since:</strong> {new Date(user.employedSince).toDateString()}</p>
      <p><strong>Department:</strong> {user.department}</p>
    </div>
  );
}

function FilterComponent({ onFilterChange , filterRole, filterDepartment}) {
  return (
    <div className="filter-component">
      <select 
      value={filterRole} 
      onChange={(e) => {
      onFilterChange('role', e.target.value)}}>
        <option value="">All Roles</option>
        <option value="admin">Admin</option>
        <option value="manager">Manager</option>
        <option value="user">User</option>
        <option value="supervisor">Supervisor</option>
      </select>
      <select value={filterDepartment}
       onChange={(e) => {
       onFilterChange('department',e.target.value)}}>
        <option value="">All Departments</option>
        <option value="Warehouse">Warehouse</option>
        <option value="Logistics">Logistics</option>
        <option value="Accounting">Accounting</option>
        <option value="Account Management">Account Management</option>
        <option value="IT">IT</option>
      </select>
    </div>
  );
}

export default UserMgtOverview;
