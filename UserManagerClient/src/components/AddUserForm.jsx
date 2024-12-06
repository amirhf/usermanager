function AddUserForm({ newUserName, setNewUserName, newUserDOB, setNewUserDOB, onAddUser }) {
    const handleSubmit = (e) => {
      e.preventDefault();
      onAddUser();
    };
  
    return (
      <div style={{ marginBottom: '20px' }}>
        <h2>Add New User</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label>Name: </label>
            <input 
              type="text"
              value={newUserName}
              onChange={e => setNewUserName(e.target.value)}
              required 
            />
          </div>
          <div>
            <label>Date of Birth (YYYY-MM-DD): </label>
            <input 
              type="date" 
              value={newUserDOB}
              onChange={e => setNewUserDOB(e.target.value)}
              required
            />
          </div>
          <button type="submit">Add User</button>
        </form>
      </div>
    );
  }
  
  export default AddUserForm;
  