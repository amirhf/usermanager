import { useEffect, useState } from 'react';
import SearchBar from './components/SearchBar';
import AddUserForm from './components/AddUserForm';
import EditUserForm from './components/EditUserForm';
import UserList from './components/UserList';

function App() {
  const [users, setUsers] = useState([]);
  const [searchId, setSearchId] = useState("");
  
  const [newUserName, setNewUserName] = useState("");
  const [newUserDOB, setNewUserDOB] = useState("");

  const [editUserId, setEditUserId] = useState(null);
  const [editUserName, setEditUserName] = useState("");
  const [editUserDOB, setEditUserDOB] = useState("");

  const [nextPage, setNextPage] = useState(null);
  const [prevPage, setPrevPage] = useState(null);

  const API_BASE = "http://localhost:8000";

  const fetchUsers = async (searchIdValue = "", url = null) => {
    try {
      let fetchUrl = url ? url : `${API_BASE}/users`;
      if (searchIdValue) {
        // If searching by ID, no pagination needed; just fetch that user.
        fetchUrl = `${API_BASE}/users/${searchIdValue}`;
        const res = await fetch(fetchUrl);
        if (res.ok) {
          const data = await res.json();
          setUsers([data]);
          setNextPage(null);
          setPrevPage(null);
        } else {
          setUsers([]);
          setNextPage(null);
          setPrevPage(null);
        }
      } else {
        const res = await fetch(fetchUrl);
        if (!res.ok) {
          console.error("Failed to fetch users");
          return;
        }
        const data = await res.json();
        // Assuming DRF pagination: data = { count, next, previous, results: [...] }
        setUsers(data.results || data);
        setNextPage(data.next);
        setPrevPage(data.previous);
      }
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  useEffect(() => {
    // Fetch all users on initial load
    fetchUsers();
  }, []);

  const handleSearch = (id) => {
    setSearchId(id);
    fetchUsers(id);
  };

  const handleAddUser = async () => {
    try {
      const res = await fetch(`${API_BASE}/users`, {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: newUserName,
          date_of_birth: newUserDOB
        })
      });
      if (res.ok) {
        setNewUserName("");
        setNewUserDOB("");
        fetchUsers(searchId); // Refresh current view
      } else {
        console.error("Failed to create user");
      }
    } catch (error) {
      console.error("Error creating user:", error);
    }
  };

  const handleEditClick = (user) => {
    setEditUserId(user.id);
    setEditUserName(user.name);
    setEditUserDOB(user.date_of_birth);
  };

  const handleUpdateUser = async () => {
    if (!editUserId) return;
    try {
      const res = await fetch(`${API_BASE}/users/${editUserId}`, {
        method: "PUT",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: editUserName,
          date_of_birth: editUserDOB
        })
      });
      if (res.ok) {
        setEditUserId(null);
        setEditUserName("");
        setEditUserDOB("");
        fetchUsers(searchId);
      } else {
        console.error("Failed to update user");
      }
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

  const handleDeleteUser = async (id) => {
    try {
      const res = await fetch(`${API_BASE}/users/${id}`, {
        method: "DELETE"
      });
      if (res.ok) {
        fetchUsers(searchId);
      } else {
        console.error("Failed to delete user");
      }
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  const handleNextPage = () => {
    if (nextPage) {
      fetchUsers(searchId, nextPage);
    }
  };

  const handlePrevPage = () => {
    if (prevPage) {
      fetchUsers(searchId, prevPage);
    }
  };

  return (
    <div style={{ margin: '20px' }}>
      <h1>User Manager</h1>

      <SearchBar
        onSearch={handleSearch}
        onClear={() => { setSearchId(""); fetchUsers(""); }}
      />

      <AddUserForm
        newUserName={newUserName}
        setNewUserName={setNewUserName}
        newUserDOB={newUserDOB}
        setNewUserDOB={setNewUserDOB}
        onAddUser={handleAddUser}
      />

      {editUserId && (
        <EditUserForm
          editUserId={editUserId}
          editUserName={editUserName}
          setEditUserName={setEditUserName}
          editUserDOB={editUserDOB}
          setEditUserDOB={setEditUserDOB}
          onUpdateUser={handleUpdateUser}
          onCancel={() => setEditUserId(null)}
        />
      )}

      <UserList
        users={users}
        onEditClick={handleEditClick}
        onDeleteUser={handleDeleteUser}
        nextPage={nextPage}
        prevPage={prevPage}
        onNextPage={handleNextPage}
        onPrevPage={handlePrevPage}
      />
    </div>
  );
}

export default App;
