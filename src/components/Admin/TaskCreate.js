import React from 'react';
import 'date-fns';
import {TextField, Button, InputLabel, Select, FormControl, Typography} from "@material-ui/core";
import {MuiPickersUtilsProvider, KeyboardDatePicker} from "@material-ui/pickers";
import DateFnsUtils from '@date-io/date-fns';
import PropTypes from "prop-types";
import store from "../../store";
import {closeModal} from "../../actions";

function TaskCreate({task, setTasks, action}) {
    let initState;
    if (task) {
        initState = {
            title: task.title,
            description: task.description,
            type: task.type,
            deadline: task.deadline,
        }
        if (task.extension) {
            initState.validFrom =  task.extension.validFrom || null;
            initState.validUntil =  task.extension.validUntil || null;
        }
    } else {
        initState = {
            title: "",
            description: "",
            type: "",
            deadline: null,
            validFrom: null,
            validUntil: null,
        }
    }
    const [values, setValues] = React.useState(initState);
    const handleChange = (prop) => (event) => {
        setValues({ ...values, [prop]: event.target.value });
    };
    const submitEdit = () => {
        fetch('/admin/editTask',{
            method: "POST",
            body:  JSON.stringify({
                id: task.id,
                title: values.title,
                description: values.description,
                type: values.type,
                deadline: values.deadline,
                extension: {
                    validFrom: values.validFrom,
                    validUntil: values.validUntil,
                },
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
    const submitCreate = () => {
        fetch('/admin/createTask',{
            method: "POST",
            body:  JSON.stringify({
                title: values.title,
                description: values.description,
                type: values.type,
                deadline: values.deadline,
                extension: {
                    validFrom: values.validFrom,
                    validUntil: values.validUntil,
                },
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
        <div className="task-create">
            {
                action === "create" ?
                <FormControl variant="outlined" margin="normal">
                    <InputLabel htmlFor="task-create__type-selection">Тип</InputLabel>
                    <Select
                        native
                        value={values.type}
                        onChange={handleChange("type")}
                        label="Age"
                        inputProps={{
                            name: 'type',
                            id: 'task-create__type-selection',
                        }}
                    >
                        <option aria-label="None" value="" />
                        <option value="familiarize">Ознакомиться</option>
                        <option value="opdCard">Карта ОПД</option>
                    </Select>
                </FormControl> :
                <Typography>
                    {values.type === "familiarize" && "Ознакомиться"}
                    {values.type === "opdCard" && "Карта ОПД"}
                </Typography>
            }
            <TextField
                label="Заголовок"
                value={values.title}
                fullWidth
                margin="normal"
                onChange={handleChange('title')}
                variant="outlined"
            />
            <TextField
                label="Описание"
                value={values.description}
                fullWidth
                rows={5}
                margin="normal"
                multiline
                onChange={handleChange('description')}
                variant="outlined"
            />
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <KeyboardDatePicker
                    autoOk
                    variant="inline"
                    margin="normal"
                    inputVariant="outlined"
                    format="dd/MM/yyyy"
                    label="Крайний срок"
                    value={values.deadline}
                    onChange={(date) => setValues({...values, 'deadline': date})}
                    InputAdornmentProps={{ position: "start" }}
                />
            </MuiPickersUtilsProvider>
            {
                values.type === "opdCard" &&
                <div>
                    <Typography className="task-create__typography">Период действия</Typography>
                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                        <KeyboardDatePicker
                            autoOk
                            variant="inline"
                            margin="normal"
                            inputVariant="outlined"
                            format="dd/MM/yyyy"
                            label="c"
                            value={values.validFrom}
                            onChange={(date) => setValues({...values, 'validFrom': date})}
                            InputAdornmentProps={{ position: "start" }}
                        />
                    </MuiPickersUtilsProvider>
                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                        <KeyboardDatePicker
                            autoOk
                            variant="inline"
                            margin="normal"
                            inputVariant="outlined"
                            format="dd/MM/yyyy"
                            label="по"
                            value={values.validUntil}
                            onChange={(date) => setValues({...values, 'validUntil': date})}
                            InputAdornmentProps={{ position: "start" }}
                        />
                    </MuiPickersUtilsProvider>
                </div>

            }
            {
                action === "create" ?
                <Button
                    variant="contained"
                    color="primary"
                    className="task-create__button-save"
                    onClick={submitCreate}
                >Создать</Button> :
                <Button
                    variant="contained"
                    color="primary"
                    className="task-create__button-save"
                    onClick={submitEdit}
                >Сохранить</Button>
            }

        </div>
    );
}
TaskCreate.propTypes = {
    task: PropTypes.object,
    setTasks: PropTypes.func,
    action: PropTypes.string,
};
export default TaskCreate;

