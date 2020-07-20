import React from 'react';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import {IconButton, List, ListItem, ListItemText} from "@material-ui/core";
import store from "../../store";
import {openModal} from "../../actions";
import UserEdit from './UserEdit';
import UserRead from './UserRead';
import PropTypes from "prop-types";

function UserList({users, setUsers}) {
    function handleDeleteUser(event, id) {
        event.stopPropagation();
        fetch('/admin/deleteUser',{
            method: "DELETE",
            body:  JSON.stringify({id}),
            headers: {
                'Content-Type': 'application/json',
                "Authorization": `Bearer ${localStorage.token}`
            }})
            .then(res => {
                res.json().then(body => {
                    if (body.message) {
                        alert(body.message);
                    } else if (body.users) {
                        setUsers(body.users.reverse());
                    }
                });
            })
            .catch(err => {
                alert(err);
            });
    }
    function handleEditUser(event, user) {
        event.stopPropagation();
        store.dispatch(openModal(<UserEdit user={user} setUsers={setUsers}/>));
    }
    return(
        <List aria-label="secondary mailbox folders">
            {
                users.map(user =>
                <ListItem
                    button
                    key={user.id}
                    className="lk__list-item"
                    onClick={()=>store.dispatch(openModal(<UserRead user={user}/>))}
                >
                    <ListItemText primary={user.login} />
                    <IconButton edge="end"  title="Редактировать" onClick={(event)=>handleEditUser(event, user)}>
                        <EditIcon />
                    </IconButton>
                    <IconButton edge="end" title="Удалить" onClick={(event)=>handleDeleteUser(event, user.id)}>
                        <DeleteIcon />
                    </IconButton>
                </ListItem>)
            }
        </List>
    );
}

UserList.propTypes = {
    users: PropTypes.array,
    setUsers: PropTypes.func,
};

export default UserList;