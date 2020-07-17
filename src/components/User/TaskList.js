import React from 'react';
import {List, ListItem, ListItemText} from "@material-ui/core";
import store from "../../store";
import {openModal} from "../../actions";
import PropTypes from "prop-types";
import TaskRead from "./TaskRead";

function TaskList({tasks}) {
    return(
        <List aria-label="secondary mailbox folders">
            {
                tasks.map(task =>
                <ListItem
                    button
                    key={task.id}
                    onClick={()=>store.dispatch(openModal(<TaskRead task={task}/>))}
                >
                    <ListItemText  primary={task.title} />
                </ListItem>)
            }
        </List>
    );
}

TaskList.propTypes = {
    tasks: PropTypes.array,
};
export default TaskList;