function UserList({ users, onEditClick, onDeleteUser, nextPage, prevPage, onNextPage, onPrevPage }) {
    return (
      <div>
        <h2>User List</h2>
        {users.length === 0 ? (
          <p>No users found.</p>
        ) : (
          <>
            <table border="1" cellPadding="10" style={{ borderCollapse: 'collapse' }}>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Date of Birth</th>
                  <th>Created On</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.map(u => (
                  <tr key={u.id}>
                    <td>{u.id}</td>
                    <td>{u.name}</td>
                    <td>{u.date_of_birth}</td>
                    <td>{u.created_on}</td>
                    <td>
                      <button onClick={() => onEditClick(u)}>Edit</button>
                      <button onClick={() => onDeleteUser(u.id)}>Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
  
            <div style={{ marginTop: '10px' }}>
              {prevPage && <button onClick={onPrevPage}>Previous</button>}
              {nextPage && <button onClick={onNextPage} style={{ marginLeft: '10px' }}>Next</button>}
            </div>
          </>
        )}
      </div>
    );
  }
  
export default UserList;
  