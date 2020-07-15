import React from 'react';
import './style.scss';
import {AppBar, Button, List, ListItem, ListItemText, Toolbar} from "@material-ui/core";

function User(props) {
    document.title = "Личный кабинет";
    function handleLogOut() {
        localStorage.removeItem("token");
        props.setPath('/');
    }
    return(
        <React.Fragment>
            <AppBar position="static">
                <Toolbar className="user__toolbar" >
                    <Button onClick={handleLogOut} color="inherit">Выход</Button>
                </Toolbar>
            </AppBar>
            <List aria-label="secondary mailbox folders">
                <ListItem button>
                    <ListItemText primary="Задача1" />
                </ListItem>
                <ListItem button>
                    <ListItemText primary="Задача2" />
                </ListItem>
            </List>
        </React.Fragment>
    );
}
export default User;