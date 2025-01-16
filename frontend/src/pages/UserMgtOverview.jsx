import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/useAuthContext.jsx";

function UserMgtOverview() {
  const { getToken } = useAuth();
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [filterRole, setFilterRole] = useState("");
  const [filterDepartment, setFilterDepartment] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const navigate = useNavigate();

  useEffect(() => {
    fetchUsers();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [users, filterRole, filterDepartment]);

  const fetchUsers = async () => {
    try {
      const token = getToken();
      const response = await fetch("http://localhost:3000/api/users", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (!response.ok) {
        throw new Error("Something went wrong!");
      }
      const data = await response.json();
      setUsers(data.users);
      setTotalPages(Math.ceil(data.totalCount / data.limit));
    } catch (error) {
      console.error(error);
    }
  };

  const applyFilters = () => {
    let result = users;
    if (filterRole) {
      result = result.filter(user => user.authorisationRole === filterRole);
    }
    if (filterDepartment) {
      result = result.filter(user => user.department === filterDepartment);
    }
    setFilteredUsers(result);
  };

  const handleFilterChange = (filterType, value) => {
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
      <FilterComponent onFilterChange={handleFilterChange} filterRole={filterRole} filterDepartment={filterDepartment} />
      <div className="user-card-container">
        {filteredUsers.map((user) => (
          <UserCard key={user.personnelNumber} user={user} />
        ))}
      </div>
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
      {/* <div>
        <button className="back-button" onClick={() => navigate("/features")}>Back to Features</button>
      </div> */}
    </div>
  );
}

function UserCard({ user }) {
  return (
    <div className="user-card">
      <div className="user-icon">👤</div>
      <h2>
        {user.firstName} {user.lastName}
      </h2>
      <p>Role: {user.authorisationRole}</p>
      <p>Personnel Number: {user.personnelNumber}</p>
      <p>
        Address: {user.addressDetails.street} {user.addressDetails.houseNumber},{" "}
        {user.addressDetails.postcode} {user.addressDetails.city}
      </p>
      <p>Phone: {user.contactDetails.phoneNumber}</p>
      <p>On Call: {user.contactDetails.onCall ? "YES" : "NO"}</p>
      {user.contactDetails.onCall && (
        <p>On Call Phone: {user.contactDetails.onCallPhoneNumber}</p>
      )}
      <p>Employed Since: {new Date(user.employedSince).toDateString()}</p>
      <p>Department: {user.department}</p>
    </div>
  );
}

function FilterComponent({ onFilterChange , filterRole, filterDepartment}) {
  return (
    <div className="filter-component">
      <select value={filterRole} onChange={(e) => onFilterChange(e.target.value)}>
        <option value="">All Roles</option>
        <option value="admin">Admin</option>
        <option value="manager">Manager</option>
        <option value="user">User</option>
        <option value="supervisor">Supervisor</option>
      </select>
      <select value={filterDepartment} onChange={(e) => onFilterChange(e.target.value)}>
        <option value="">All Departments</option>
        <option value="warehouse">Warehouse</option>
        <option value="logistics">Logistics</option>
        <option value="accounting">Accounting</option>
        <option value="account management">Account Management</option>
        <option value="it">IT</option>
      </select>
    </div>
  );
}

export default UserMgtOverview;
