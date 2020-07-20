import React from 'react';
import {List, ListItem, ListItemText} from "@material-ui/core";
import store from "../../store";
import {openModal} from "../../actions";
import PropTypes from "prop-types";
import TaskRead from "./TaskRead";

function TaskList({tasks, setTasks}) {
    function sort(task1, task2) {
        if (task1.status === "closed" && task2.status === "closed") {
            return 0;
        } else if (task1.status === "closed" && task2.status !== "closed") {
            return 1;
        } else if (task1.status !== "closed" && task2.status === "closed") {
            return -1;
        }
    }
    return(
        <List aria-label="secondary mailbox folders">
            {
                tasks.sort(sort).map(task =>
                <ListItem
                    button
                    key={task.id}
                    className="lk__list-item"
                    onClick={()=>store.dispatch(openModal(<TaskRead task={task} setTasks={setTasks}/>))}
                >
                    <ListItemText  primary={`${task.title} ${task.status !== "closed" ? "(Открыто)":"(Закрыто)"}`} />
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