import React from 'react';
import {Table, TableCell, TableRow, TableBody} from "@material-ui/core";
import PropTypes from "prop-types";

function TaskRead({task}) {
    function formatDate(date) {
        if (!date) return;
        const newDate = new Date(date);
        return newDate.toLocaleDateString();
    }
    return (
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
                    <TableCell>{task.type}</TableCell>
                </TableRow>
                <TableRow>
                    <TableCell component="th" scope="row">Дата создания:</TableCell>
                    <TableCell>{formatDate(task.created)}</TableCell>
                </TableRow>
                <TableRow>
                    <TableCell component="th" scope="row">Крайний срок:</TableCell>
                    <TableCell>{formatDate(task.deadline)}</TableCell>
                </TableRow>
            </TableBody>
        </Table>
    );
}
TaskRead.propTypes = {
    task: PropTypes.object,
};
export default TaskRead;