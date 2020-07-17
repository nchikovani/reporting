import React from 'react';
import {TextField, Button} from "@material-ui/core";
import PropTypes from "prop-types";
import store from "../../store";
import {closeModal} from "../../actions";

function UserEdit({user, setUsers}) {
    const [values, setValues] = React.useState({
        name: user.name,
    });
    const handleChange = (prop) => (event) => {
        setValues({ ...values, [prop]: event.target.value });
    };
    const submit = () => {
        fetch('/admin/editUser',{
            method: "POST",
            body:  JSON.stringify({id: user.id, name: values.name}),
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
                });
            })
            .catch(err => {
                alert(err);
            });
        store.dispatch(closeModal());
    }
    return (
        <div className="user-edit">
            <TextField
                label="Name"
                value={values.name}
                fullWidth
                margin="normal"
                onChange={handleChange('name')}
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