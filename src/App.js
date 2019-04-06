import React, { useState } from 'react';
import UserTable from './tables/UserTable';
import AddUserForm from './forms/AddUserForm';
import EditUserForm from './forms/EditUserForm';

export default function App(){

  const list = useInitialUsers();

  return (
    <div className="container">
      <h1>Welcome to React Hooks CRUD</h1>
      <div className="flex-row">
        <div className="flex-large">
          {list.editing ? (
            <div>
              <h2>Edit user</h2>
              <EditUserForm
                editing={list.editing}
                setEditing={list.setEditing}
                currentUser={list.currentUser}
                updateUser={list.updateUser}
              />
            </div>
          ) : (
            <div>
              <h2>Add user</h2>
              <AddUserForm addUser={list.addUser} />
            </div>
          )}
        </div>
        <div className="flex-large">
          <h2>View users</h2>
          <UserTable users={list.users} editRow={list.editRow} deleteUser={list.deleteUser} />
        </div>
      </div>
    </div>
  );

  function useInitialUsers(){
    //
    const initialUserData = [
      {id: 1, name: 'Kevin', username: 'kmocorro'},
      {id: 2, name: 'Kevs', username: 'kevsm'},
      {id: 3, name: 'Hero', username: 'xtranghero'},
    ];

    //
    const [users, setUsers] = useState(initialUserData); 
    
    //
    const [editing, setEditing] = useState(false);
    const initialFormState = { id: null, name: '', username: ''};
    const [currentUser, setCurrentUser] = useState(initialFormState);

    //
    const addUser = function(user){
      user.id = users.length + 1;
      setUsers([...users, user]); 
    }

    //
    const deleteUser = function(id){
      setEditing(false);

      setUsers(users.filter(user => user.id !== id));
    }

    //
    const editRow = function(user){
      setEditing(true);
      setCurrentUser({id: user.id, name: user.name, username: user.username });
    }

    //
    const updateUser = function(id, updatedUser){
      setEditing(false);

      setUsers(users.map(user => (user.id === id ? updatedUser : user)));
    }

    //
    return {
      users,
      addUser,
      deleteUser,
      editRow,
      editing,
      setEditing,
      currentUser,
      updateUser
    }

  }

}