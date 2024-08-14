import React, { useState, useEffect } from 'react';
import EditUserModal from './EditUserModal';
import './UserTable.css';
import Sidebar from './sidebar';
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';

const UserTable = () => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [isEditModalOpen, setEditModalOpen] = useState(false);

  useEffect(() => {
    fetch('http://localhost:8080/api/users')
      .then((response) => response.json())
      .then((data) => setUsers(data))
      .catch((error) => console.error('Error fetching users:', error));
  }, []);

  const handleDelete = (id) => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, cancel!',
      reverseButtons: true,
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`http://localhost:8080/api/users/${id}`, {
          method: 'DELETE',
        })
        .then((response) => {
          if (response.ok) {
            setUsers(users.filter(user => user.id !== id));
            Swal.fire(
              'Deleted!',
              'User has been deleted.',
              'success'
            ).then(() => {
              // After confirming the success message, refresh the state
              setUsers(users.filter(user => user.id !== id));
            });
          } else {
            Swal.fire(
              'Failed!',
              'Failed to delete user.',
              'error'
            );
          }
        })
        .catch((error) => {
          console.error('Error during delete:', error);
          Swal.fire(
            'Failed!',
            'Failed to delete user.',
            'error'
          );
        });
      }
    });
  };

  const handleEdit = (user) => {
    setSelectedUser(user);
    setEditModalOpen(true);
  };

  const handleCloseEditModal = () => {
    setEditModalOpen(false);
    setSelectedUser(null);
  };

  const handleUpdateUser = (updatedUser) => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You are about to update the user details.",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, update it!',
      cancelButtonText: 'No, cancel!',
      reverseButtons: true,
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`http://localhost:8080/api/users/${updatedUser.id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(updatedUser),
        })
        .then((response) => {
          if (response.ok) {
            setUsers(users.map(user => (user.id === updatedUser.id ? updatedUser : user)));
            Swal.fire(
              'Updated!',
              'User details have been updated.',
              'success'
            ).then(() => {
              // Close the modal and refresh the state
              setEditModalOpen(false);
              setUsers(users.map(user => (user.id === updatedUser.id ? updatedUser : user)));
            });
          } else {
            Swal.fire(
              'Failed!',
              'Failed to update user details.',
              'error'
            );
          }
        })
        .catch((error) => {
          console.error('Error during update:', error);
          Swal.fire(
            'Failed!',
            'Failed to update user details.',
            'error'
          );
        });
      }
    });
  };

  return (
    <div>
      <Sidebar />
      <div className="user-table-container">
        <table className="enhanced-table">
          <thead className="enhanced-thead">
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody className="enhanced-tbody">
            {users.map((user) => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>
                  <button className="enhanced-btn-edit" onClick={() => handleEdit(user)}>Edit</button>
                  <button className="enhanced-btn-delete" onClick={() => handleDelete(user.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {selectedUser && (
          <EditUserModal
            user={selectedUser}
            onClose={handleCloseEditModal}
            onUpdateUser={handleUpdateUser}
          />
        )}
      </div>
    </div>
  );
};

export default UserTable;
