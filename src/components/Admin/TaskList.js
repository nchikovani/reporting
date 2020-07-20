import React from 'react';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import {IconButton, List, ListItem, ListItemText} from "@material-ui/core";
import store from "../../store";
import {openModal} from "../../actions";
import TaskCreate from "./TaskCreate";
import PropTypes from "prop-types";
import TaskRead from "./TaskRead";

function TaskList({tasks, setTasks}) {
    function handleDeleteTask(event, id) {
        event.stopPropagation();
        fetch('/admin/deleteTask',{
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
                    } else if (body.tasks) {
                        setTasks(body.tasks.reverse());
                    }
                });
            })
            .catch(err => {
                alert(err);
            });
    }
    function handleEditTask(event, task) {
        event.stopPropagation();
        store.dispatch(openModal(<TaskCreate task={task} setTasks={setTasks} action="edit"/>));
    }
    return(
        <List aria-label="secondary mailbox folders">
            {
                tasks.map(task =>
                <ListItem
                    button
                    className="lk__list-item"
                    key={task.id}
                    onClick={()=>store.dispatch(openModal(<TaskRead task={task}/>))}
                >
                    <ListItemText  primary={`${task.title} (${task.closedTasks}/${task.issuedTasks})`}/>
                    <IconButton title="Редактировать" edge="end" onClick={(event)=>handleEditTask(event, task)}>
                        <EditIcon />
                    </IconButton>
                    <IconButton  title="Удалить" edge="end" onClick={(event)=>handleDeleteTask(event, task.id)}>
                        <DeleteIcon />
                    </IconButton>
                </ListItem>)
            }
        </List>
    );
}

TaskList.propTypes = {
    tasks: PropTypes.array,
    setTasks: PropTypes.func,
};
export default TaskList;