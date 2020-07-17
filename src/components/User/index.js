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
                <div>
                    <Toolbar className="user__toolbar wrapper" >
                        <Button onClick={handleLogOut} color="inherit">Выход</Button>
                    </Toolbar>
                </div>
            </AppBar>
            <List className="wrapper" aria-label="secondary mailbox folders">
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