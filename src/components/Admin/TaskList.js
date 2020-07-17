import React from 'react';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import {IconButton, List, ListItem, ListItemText} from "@material-ui/core";

function TaskList() {

    return(
        <List aria-label="secondary mailbox folders">
            <ListItem button>
                <ListItemText primary="Задача1" />
                <IconButton edge="end" aria-label="delete">
                    <EditIcon />
                </IconButton>
                <IconButton edge="end" aria-label="delete">
                    <DeleteIcon />
                </IconButton>
            </ListItem>
        </List>
    );
}

export default TaskList;