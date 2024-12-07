import { useState } from 'react';
import { API_BASE } from '../constants/constants';


export const useUserManagement = () => {
  const [users, setUsers] = useState([]);
  const [pagination, setPagination] = useState({
    nextPage: null,
    prevPage: null
  });

  const fetchUsers = async (searchId = "", url = null) => {
    try {
      let fetchUrl = url || `${API_BASE}/users`;
      if (searchId) {
        fetchUrl = `${API_BASE}/users/${searchId}`;
        const res = await fetch(fetchUrl);
        if (res.ok) {
          const data = await res.json();
          setUsers([data]);
          setPagination({ nextPage: null, prevPage: null });
        } else {
          setUsers([]);
          setPagination({ nextPage: null, prevPage: null });
        }
        return;
      }

      const res = await fetch(fetchUrl);
      if (!res.ok) throw new Error("Failed to fetch users");
      
      const data = await res.json();
      setUsers(data.results || data);
      setPagination({
        nextPage: data.next,
        prevPage: data.previous
      });
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  const addUser = async (newUserName, newUserDOB) => {
    try {
      const res = await fetch(`${API_BASE}/users`, {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            name: newUserName,
            date_of_birth: newUserDOB
          })
      });
      if (!res.ok) throw new Error("Failed to create user");
      return true;
    } catch (error) {
      console.error("Error creating user:", error);
      return false;
    }
  };

  const updateUser = async (id, newUserName, newUserDOB) => {
    try {
      const res = await fetch(`${API_BASE}/users/${id}`, {
        method: "PUT",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            name: newUserName,
            date_of_birth: newUserDOB
          })
      });
      if (!res.ok) throw new Error("Failed to update user");
      return true;
    } catch (error) {
      console.error("Error updating user:", error);
      return false;
    }
  };

  const deleteUser = async (id) => {
    try {
      const res = await fetch(`${API_BASE}/users/${id}`, {
        method: "DELETE"
      });
      if (!res.ok) throw new Error("Failed to delete user");
      return true;
    } catch (error) {
      console.error("Error deleting user:", error);
      return false;
    }
  };

  return {
    users,
    pagination,
    fetchUsers,
    addUser,
    updateUser,
    deleteUser
  };
};