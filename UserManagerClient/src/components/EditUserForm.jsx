function EditUserForm({ 
    editUserId, 
    editUserName, 
    setEditUserName, 
    editUserDOB, 
    setEditUserDOB, 
    onUpdateUser, 
    onCancel 
  }) {
    const handleSubmit = (e) => {
      e.preventDefault();
      onUpdateUser();
    };
  
    return (
      <div style={{ border: '1px solid #000', padding: '10px', marginBottom: '20px' }}>
        <h2>Update User {editUserId}</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label>Name: </label>
            <input 
              type="text"
              value={editUserName}
              onChange={e => setEditUserName(e.target.value)}
              required
            />
          </div>
          <div>
            <label>Date of Birth (YYYY-MM-DD): </label>
            <input 
              type="date"
              value={editUserDOB}
              onChange={e => setEditUserDOB(e.target.value)}
              required
            />
          </div>
          <button type="submit">Update User</button>
          <button type="button" onClick={onCancel}>Cancel</button>
        </form>
      </div>
    );
  }
  
  export default EditUserForm;
  