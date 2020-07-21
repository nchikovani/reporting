import React from 'react';
import {Table, TableCell, TableRow, TableBody, TextField, Button} from "@material-ui/core";
import PropTypes from "prop-types";
import store from "../../store";
import {closeModal} from "../../actions";
import { Document, Page, Text, View, StyleSheet, PDFDownloadLink} from '@react-pdf/renderer';

function TaskRead({task, setTasks}) {
    const [state, setState] = React.useState({"result": task.result});
    const handleChange = (event) => {
        setState({ result: event.target.value});
    };
    console.log(task);
    function formatDate(date) {
        if (!date) return;
        const newDate = new Date(date);
        return newDate.toLocaleDateString();
    }
    function submitResult() {
        fetch('/user/closeTask',{
            method: "POST",
            body:  JSON.stringify({
                taskId: task.id,
                result: state.result
            }),
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
                    store.dispatch(closeModal());
                });
            })
            .catch(err => {
                alert(err);
                store.dispatch(closeModal());
            });
    }
    return (
        <div className="task-read">
            <Table aria-label="simple table">
                <TableBody>
                    <TableRow>
                        <TableCell component="th" scope="row">Заголовок:</TableCell>
                        <TableCell>{task.title}</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell component="th" scope="row">Описание:</TableCell>
                        <TableCell>{task.description}</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell component="th" scope="row">Тип:</TableCell>
                        <TableCell>
                            {task.type === "familiarize" && "Ознакомиться"}
                            {task.type === "opdCard" && "Карта ОПД"}
                        </TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell component="th" scope="row">Дата выдачи задания:</TableCell>
                        <TableCell>{formatDate(task.created)}</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell component="th" scope="row">Крайний срок:</TableCell>
                        <TableCell>{formatDate(task.deadline)}</TableCell>
                    </TableRow>
                    {
                        task.type === "opdCard" && task.additionally &&
                        <React.Fragment>
                            <TableRow>
                                <TableCell component="th" scope="row">С:</TableCell>
                                <TableCell>{formatDate(task.additionally.validFrom)}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell component="th" scope="row">По:</TableCell>
                                <TableCell>{formatDate(task.additionally.validUntil)}</TableCell>
                            </TableRow>
                        </React.Fragment>
                    }
                    {
                        task.status === "closed" &&
                        <TableRow>
                            <TableCell component="th" scope="row">Ответ:</TableCell>
                            <TableCell>{task.result}</TableCell>
                        </TableRow>
                    }
                </TableBody>
            </Table>
            {
                task.status !== "closed" &&
                <React.Fragment>
                    <TextField
                        label="Ответ"
                        value={state.result}
                        fullWidth
                        rows={5}
                        margin="normal"
                        multiline
                        onChange={(e) => handleChange(e)}
                        variant="outlined"
                    />
                    <Button
                        variant="contained"
                        color="primary"
                        className="task-read__button-submit"
                        onClick={submitResult}
                    >Отправить</Button>
                </React.Fragment>
            }
        </div>
    );
}
TaskRead.propTypes = {
    task: PropTypes.object,
    setTasks: PropTypes.func,
};

export default TaskRead;