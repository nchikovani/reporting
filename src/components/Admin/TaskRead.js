import React from 'react';
import { saveAs } from 'file-saver';
import { pdf } from '@react-pdf/renderer';
import {Table, TableCell, TableRow, TableBody, Card, CardContent, Typography, Button, Link} from "@material-ui/core";
import PropTypes from "prop-types";
import {PDFDownloadLink} from "@react-pdf/renderer";
import OpdCard from "../pdf/OpdCard";
class TaskRead extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            users: [],
        }

    }
    setUsers(users) {
        this.setState ({
            users: users,
        });
    }
    formatDate(date) {
        if (!date) return;
        const newDate = new Date(date);
        return newDate.toLocaleDateString();
    }
    componentDidMount() {
        const id = this.props.task.id;
        fetch('/admin/getTaskUsers', {
            method: "POST",
            body:  JSON.stringify({
                id: id,
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
                        this.setUsers(body.tasks.reverse());
                    }
                });
            })
            .catch(err => {
                alert(err);
            });

    }
    submitOpen(id) {
        fetch('/admin/openTask', {
            method: "POST",
            body:  JSON.stringify({
                id: id,
                taskId: this.props.task.id
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
                        this.setUsers(body.tasks.reverse());
                    }
                });
            })
            .catch(err => {
                alert(err);
            });
    }
    generatePdfDocument(documentData) {
        pdf((
            <OpdCard
                validFrom={documentData.validFrom}
                validUntil={documentData.validUntil}
                records={documentData.records}
                firstName ={documentData.firstName}
                lastName ={documentData.lastName}
                patronymic ={documentData.patronymic}
                position ={documentData.position}
                signature ={documentData.signature}
            />
        )).toBlob().then((res) => {saveAs(res, documentData.fileName)});
    }
    render() {
        const task = this.props.task;
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
                            <TableCell component="th" scope="row">Дата создания:</TableCell>
                            <TableCell>{this.formatDate(task.created)}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell component="th" scope="row">Крайний срок:</TableCell>
                            <TableCell>{this.formatDate(task.deadline)}</TableCell>
                        </TableRow>
                        {
                            task.type === "opdCard" &&
                            <React.Fragment>
                                <TableRow>
                                    <TableCell component="th" scope="row">С:</TableCell>
                                    <TableCell>{this.formatDate(task.extension.validFrom)}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell component="th" scope="row">По:</TableCell>
                                    <TableCell>{this.formatDate(task.extension.validUntil)}</TableCell>
                                </TableRow>
                            </React.Fragment>
                        }
                    </TableBody>
                </Table>
                <div className="task-read__user-list">
                    <ul>
                        {
                            this.state.users.map((user) =>
                            <li
                                key={user.id}
                                className="task-read__user-item"
                            >
                                <Card variant="outlined">
                                    <CardContent className="task-read__card-content">
                                        <Typography variant="body1">
                                            {`${user.lastName} ${user.firstName} (${user.status === 'closed' ? 'Закрыто' : 'Открыто'})`}
                                        </Typography>
                                        {
                                            user.status==='closed' &&
                                            <React.Fragment>
                                                <Typography variant="body1">
                                                    {this.formatDate(user.closedDate)}
                                                </Typography>
                                                <Typography variant="body1" color="textSecondary">
                                                {
                                                    task.type === 'familiarize' &&
                                                    user.result
                                                }
                                                {
                                                    task.type === 'opdCard' &&
                                                        <Link
                                                            href="#"
                                                            onClick={()=>this.generatePdfDocument({
                                                                validFrom: this.formatDate(task.extension.validFrom),
                                                                validUntil: this.formatDate(task.extension.validUntil),
                                                                records: user.opdRecords,
                                                                firstName: user.firstName,
                                                                lastName: user.lastName,
                                                                patronymic: user.patronymic,
                                                                position: user.position,
                                                                signature: user.signature,
                                                                fileName: user.fileName,
                                                            })}
                                                        >Скачать файл</Link>
                                                    // <PDFDownloadLink
                                                    //     document={}
                                                    //     fileName={user.fileName}
                                                    //     // className="task-read__opd-preview-link"
                                                    // >Скачать файл</PDFDownloadLink>
                                                }
                                                </Typography>
                                                <Button
                                                    variant="contained"
                                                    color="primary"
                                                    className="task-read__button-open"
                                                    onClick={() => this.submitOpen(user.id)}
                                                >Открыть</Button>
                                            </React.Fragment>
                                        }

                                    </CardContent>
                                </Card>
                            </li>)
                        }
                    </ul>
                </div>
            </div>
        );
    }
}
TaskRead.propTypes = {
    task: PropTypes.object,
};
export default TaskRead;