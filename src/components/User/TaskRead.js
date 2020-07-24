import React from 'react';
import {Table, TableCell, TableRow, TableBody, TextField, Button} from "@material-ui/core";
import PropTypes from "prop-types";
import store from "../../store";
import {closeModal} from "../../actions";
import OpdCard from '../pdf/OpdCard';
import {PDFDownloadLink} from '@react-pdf/renderer';
import {KeyboardDatePicker, MuiPickersUtilsProvider} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";

class TaskRead extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            result: '',
            title: '',
            date: null,
            percent: '',
            opdRecords: [],
            fileName: ''
        }
    }
    handleChange(event, prop) {
        this.setState({...this.state, [prop]: event.target.value});
    }
    handleAddItem() {
        const opdRecords = this.state.opdRecords.slice();
        opdRecords.push({
            title: this.state.title,
            date: this.formatDate(this.state.date),
            percent: this.state.percent,
        });
        this.setState({
            title: '',
            date: null,
            percent: '',
            opdRecords: opdRecords,
        });
    }
    formatDate(date) {
        if (!date) return;
        const newDate = new Date(date);
        return newDate.toLocaleDateString();
    }
    handlePreview() {
        if (this.validateRecords()) {
            document.querySelector('.task-read__opd-preview-link').click();
        }

    }
    validateRecords() {
        const sum = this.state.opdRecords.reduce(function(sum, record) {
            return Number(sum) + Number(record.percent);
        }, 0);
        if (sum !== 80) {
            alert("Итоговый коэффициент выполнения ОПД не равен 100");
            return false;
        }
        return true;
    }
    submitResult() {
        if (this.props.task.type === 'opdCard') {
            if (!this.validateRecords()) {
                return
            }
        }
        fetch('/user/closeTask',{
            method: "POST",
            body:  JSON.stringify({
                taskId: this.props.task.id,
                result: this.state.result,
                opdRecords: this.state.opdRecords,
                fileName: this.state.fileName,
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
                        this.props.setTasks(body.tasks.reverse());
                    }
                    store.dispatch(closeModal());
                });
            })
            .catch(err => {
                alert(err);
                store.dispatch(closeModal());
            });
    }
    getMonth(date) {
        const newDate = new Date(date),
        months = ['январь', 'февраль', 'март', 'апрель', 'май', 'июнь', 'июль', 'август', 'сентябрь', 'октябрь', 'ноябрь', 'декабрь'];
        return months[newDate.getMonth()];
    }
    componentDidMount() {
        fetch('/user/getUserInfo',{
            method: "GET",
            headers: {
                "Authorization": `Bearer ${localStorage.token}`
            }})
            .then(res => {
                res.json().then(body => {
                    if (body.message) {
                        alert(body.message);
                    } else {
                        this.firstName = body.firstName;
                        this.lastName = body.lastName;
                        this.patronymic = body.patronymic;
                        this.team = body.team;
                        this.position = body.position;
                        this.signature = body.signature;
                        this.setState({
                            ...this.state,
                            fileName: `${this.team}__Карта_ОПД_${this.lastName}_${this.firstName[0]}_${this.patronymic[0]}_${this.getMonth(this.props.task.taskExtension.validUntil)}.pdf`
                        })
                    }
                });
            })
            .catch(err => {
                alert(err);
            });
    }
    render() {
        const {task} = this.props;
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
                            <TableCell>{this.formatDate(task.created)}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell component="th" scope="row">Крайний срок:</TableCell>
                            <TableCell>{this.formatDate(task.deadline)}</TableCell>
                        </TableRow>
                        {
                            task.type === "opdCard" && task.taskExtension &&
                            <React.Fragment>
                                <TableRow>
                                    <TableCell component="th" scope="row">С:</TableCell>
                                    <TableCell>{this.formatDate(task.taskExtension.validFrom)}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell component="th" scope="row">По:</TableCell>
                                    <TableCell>{this.formatDate(task.taskExtension.validUntil)}</TableCell>
                                </TableRow>
                            </React.Fragment>
                        }
                        {
                            task.status === "closed" &&
                            <TableRow>
                                <TableCell component="th" scope="row">Ответ:</TableCell>
                                <TableCell>
                                    {
                                        task.type === 'familiarize' &&
                                        task.result
                                    }
                                    {
                                        task.type === 'opdCard' && this.firstName &&
                                        <PDFDownloadLink
                                            document={<OpdCard
                                                validFrom={this.formatDate(task.taskExtension.validFrom)}
                                                validUntil={this.formatDate(task.taskExtension.validUntil)}
                                                records={this.props.task.issuedTaskExtension.opdRecords}
                                                firstName ={this.firstName}
                                                lastName ={this.lastName}
                                                patronymic ={this.patronymic}
                                                position ={this.position}
                                                signature ={this.signature}
                                            />}
                                            fileName={this.props.task.issuedTaskExtension.fileName}
                                            // className="task-read__opd-preview-link"
                                        >Скачать файл</PDFDownloadLink>
                                    }
                                </TableCell>
                            </TableRow>
                        }
                    </TableBody>
                </Table>
                {
                    task.status !== "closed" &&
                    <React.Fragment>
                        {
                            task.type === "familiarize" &&
                            <TextField
                                label="Ответ"
                                value={this.state.result}
                                fullWidth
                                rows={5}
                                margin="dense"
                                multiline
                                onChange={(e) => this.handleChange(e, "result")}
                                variant="outlined"
                            />
                        }
                        {
                            task.type === "opdCard" &&
                            <React.Fragment>
                                <TextField
                                    label="Название задачи"
                                    value={this.state.title}
                                    fullWidth
                                    rows={2}
                                    margin="dense"
                                    multiline
                                    onChange={(e) => this.handleChange(e, 'title')}
                                    variant="outlined"
                                />
                                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                    <KeyboardDatePicker
                                        autoOk
                                        variant="inline"
                                        margin="dense"
                                        inputVariant="outlined"
                                        format="dd/MM/yyyy"
                                        label="Дата"
                                        onChange={(date) => this.setState({...this.state, date})}
                                        value={this.state.date}
                                        InputAdornmentProps={{ position: "start" }}
                                    />
                                </MuiPickersUtilsProvider>
                                <TextField
                                    label="Процент"
                                    className="task-read__percentage-field"
                                    value={this.state.percent}
                                    margin="dense"
                                    onChange={(e) => this.handleChange(e, 'percent')}
                                    variant="outlined"
                                />
                                <Button
                                    variant="outlined"
                                    className="task-read_-button-add-task"
                                    onClick={() => this.handleAddItem()}
                                >Добавить</Button>
                            </React.Fragment>
                        }
                        <div className="task-read__buttons">
                            {
                                task.type === "opdCard" &&
                                <React.Fragment>
                                    <Button
                                        variant="outlined"
                                        color="primary"
                                        onClick={() => this.handlePreview()}
                                    >Предпросмотр</Button>
                                    <PDFDownloadLink
                                        document={<OpdCard
                                            validFrom={this.formatDate(task.taskExtension.validFrom)}
                                            validUntil={this.formatDate(task.taskExtension.validUntil)}
                                            records={this.state.opdRecords}
                                            firstName ={this.firstName}
                                            lastName ={this.lastName}
                                            patronymic ={this.patronymic}
                                            position ={this.position}
                                            signature ={this.signature}
                                        />}
                                        fileName={this.state.fileName}
                                        className="task-read__opd-preview-link"
                                    >
                                    </PDFDownloadLink>
                                </React.Fragment>
                            }
                            <Button
                                variant="contained"
                                color="primary"
                                className="task-read__button-submit"
                                onClick={()=>this.submitResult()}
                            >Отправить</Button>
                        </div>
                    </React.Fragment>
                }
            </div>
        );
    }

}
TaskRead.propTypes = {
    task: PropTypes.object,
    setTasks: PropTypes.func,
};

export default TaskRead;