import React from 'react';
import {TextField, Button} from "@material-ui/core";
import PropTypes from "prop-types";
import store from "../../store";
import {closeModal} from "../../actions";

function UserEdit({user, setUsers}) {
    const [values, setValues] = React.useState({
        firstName: user.firstName,
        lastName: user.lastName,
        patronymic: user.patronymic,
        position: user.position,
        team: user.team,
    });
    const handleChange = (prop) => (event) => {
        setValues({ ...values, [prop]: event.target.value });
    };
    const submit = () => {
        fetch('/admin/editUser',{
            method: "POST",
            body:  JSON.stringify({
                id: user.id,
                firstName: values.firstName,
                lastName: values.lastName,
                patronymic: values.patronymic,
                position: values.position,
                team: values.team,
            }),
            headers: {
                'Content-Type': 'application/json',
                "Authorization": `Bearer ${localStorage.token}`
            }})
            .then(res => {
                res.json().then(body => {
                    if (body.message) {
                        alert(body.message);
                    } else if (body.users) {
                        setUsers(body.users.reverse());
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
        <div className="user-edit">
            <TextField
                label="Имя"
                value={values.firstName}
                fullWidth
                margin="normal"
                onChange={handleChange('firstName')}
                variant="outlined"
            />
            <TextField
                label="Фамилия"
                value={values.lastName}
                fullWidth
                margin="normal"
                onChange={handleChange('lastName')}
                variant="outlined"
            />
            <TextField
                label="Отчество"
                value={values.patronymic}
                fullWidth
                margin="normal"
                onChange={handleChange('patronymic')}
                variant="outlined"
            />
            <TextField
                label="Должность"
                value={values.position}
                fullWidth
                margin="normal"
                onChange={handleChange('position')}
                variant="outlined"
            />
            <TextField
                label="Команда"
                value={values.team}
                fullWidth
                margin="normal"
                onChange={handleChange('team')}
                variant="outlined"
            />
            <Button
                variant="contained"
                color="primary"
                className="user-edit__button-save"
                onClick={submit}
            >Сохранить</Button>
        </div>
    );
}
UserEdit.propTypes = {
    user: PropTypes.object,
    setUsers: PropTypes.func,
};
export default UserEdit;