



function UserDetails() {
    const [editedUser, setEditedUser] = useState(user);

    const handleChange = (e) => {
        const { name, value} = e.target;
        setEditedUser((prevUser) => ({ ...prevUser, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const token = getToken();
            const response = await fetch(
                `http://localhost:3000/api/users/${user._id}`,
                {
                    method: 'PATCH',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`,
                    },
                    body: JSON.stringify(editedUser),
                }
            );
            if (!response.ok) {
                throw new Error('Something went wrong!');
            }
            const data = await response.json();
            console.log(data);
            setPopupMessage('User data updated successfully');
        } catch (error) {
            console.error(error);
            setPopupMessage('Failed to update user data');
        }
    };

    return(
        <div className="user-details">
            <h2>User Details</h2>
            <form onSubmit={handleSubmit}>
                <label htmlFor="name">Name:</label>
                <input
                    type="text"
                    id="name"
                    name="name"
                    value={editedUser.name}
                    onChange={handleChange}
                />
                <label htmlFor="email">Email:</label>
                <input
                    type="email"
                    id="email"
                    name="email"
                    value={editedUser.email}
                    onChange={handleChange}
                />
                <label htmlFor="role">Role:</label>
                <select
                    id="role"
                    name="role"
                    value={editedUser.role}
                    onChange={handleChange}
                >
                    <option value="user">User</option>
                    <option value="manager">Manager</option>
                    <option value="admin">Admin</option>
                    <option value="supervisor">Supervisor</option>
                </select>
                <button type="submit">Update</button>
            </form>   
        </div>
    )
}


export default UserDetails;