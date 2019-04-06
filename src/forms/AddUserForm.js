import React, { useState } from 'react'

const AddUserForm = props => {

    const initialFormData = {id: null, name: '', username: ''};
    const [user, setUser] = useState(initialFormData);

    const handleInputChange = function(event){
        const { name, value } = event.target;

        setUser({ ...user, [name]: value });
    }

    return (
        <form 
            onSubmit = {function(event){
                event.preventDefault();
                if(!user.name || ! user.username) return;

                props.addUser(user);
                setUser(initialFormData);
            }}
        >
            <label>Name</label>
            <input type="text" name="name" value={user.name} onChange={handleInputChange} />
            <label>Username</label>
            <input type="text" name="username" value={user.username} onChange={handleInputChange}  />
            <button>Add new user</button>
        </form>
    );
  
}

export default AddUserForm