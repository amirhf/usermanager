import { useEffect, useState } from 'react';
import SearchBar from './components/SearchBar';
import AddUserForm from './components/AddUserForm';
import EditUserForm from './components/EditUserForm';
import UserList from './components/UserList';
import { useUserManagement } from './hooks/useUserManagement';

function App() {

  const [searchId, setSearchId] = useState("");
  
  const [newUserName, setNewUserName] = useState("");
  const [newUserDOB, setNewUserDOB] = useState("");

  const [editUserId, setEditUserId] = useState(null);
  const [editUserName, setEditUserName] = useState("");
  const [editUserDOB, setEditUserDOB] = useState("");

  const {
    users,
    pagination,
    fetchUsers,
    addUser,
    updateUser,
    deleteUser
  } = useUserManagement();

  useEffect(() => {
    // Fetch all users on initial load
    fetchUsers();
  }, []);

  const handleSearch = (id) => {
    setSearchId(id);
    fetchUsers(id);
  };

  const handleAddUser = async () => {
    const success = await addUser(newUserName, newUserDOB);
    if (success) {
      setNewUserName("");
      setNewUserDOB("");
      fetchUsers(searchId);
    }
  };

  const handleEditClick = (user) => {
    setEditUserId(user.id);
    setEditUserName(user.name);
    setEditUserDOB(user.date_of_birth);
  };

  const handleUpdateUser = async () => {
    if (!editUserId) return;
    const success = await updateUser(editUserId, editUserName, editUserDOB);
    if (success) {
      setEditUserId(null);
      setEditUserName("");
      setEditUserDOB("");
      fetchUsers(searchId);
    }
  };

  const handleDeleteUser = async (id) => {
    const success = await deleteUser(id);
    if (success) {
      fetchUsers();
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
        pagination={pagination}
        onNextPage={() => pagination.nextPage && fetchUsers(searchId, pagination.nextPage)}
        onPrevPage={() => pagination.prevPage && fetchUsers(searchId, pagination.prevPage)}
      />
    </div>
  );
}

export default App;