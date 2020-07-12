import React from 'react';
import './style.scss';
import {Button, Input, InputAdornment, IconButton} from '@material-ui/core';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';

function Authorization() {
    const [values, setValues] = React.useState({
        password: '',
        login: '',
        showPassword: false,
    });
    const handleChange = (prop) => (event) => {
        setValues({ ...values, [prop]: event.target.value });
    };
    const handleClickShowPassword = () => {
        setValues({ ...values, showPassword: !values.showPassword });
    };
    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };
    const handleClickAuthorization = () => {
        const data = {login: values.login, password: values.password};
        fetch('/login', {
            method: 'POST',
            body:  JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(
            response => {
                return response.json().then(body => {
                    if(body.message) {
                        alert(body.message);
                    } else if (body.role === 'admin'){
                        window.location.href = window.location.href + 'admin';
                    } else if (body.role === 'user') {
                        window.location.href = window.location.href + 'user/' + body.login;
                    }
                });
            },
            error => {
                alert(error);
            }
        );
    }
    document.title = "Авторизация";
    return(
        <div className="authorization-container">
            <div className="authorization">
                <Input
                    className="authorization__input"
                    placeholder="Введите логин"
                    value={values.login}
                    onChange={handleChange('login')}
                />
                <Input
                    className="authorization__input"
                    type={values.showPassword ? 'text' : 'password'}
                    value={values.password}
                    onChange={handleChange('password')}
                    placeholder="Введите пароль"
                    endAdornment={
                        <InputAdornment position="end">
                            <IconButton
                                aria-label="toggle password visibility"
                                onClick={handleClickShowPassword}
                                onMouseDown={handleMouseDownPassword}
                            >
                                {values.showPassword ? <Visibility /> : <VisibilityOff />}
                            </IconButton>
                        </InputAdornment>
                    }
                />
                <div className="authorization__button-container">
                    <Button
                        variant="outlined"
                        color="primary"
                        onClick={handleClickAuthorization}
                    >Войти</Button>
                </div>
            </div>
        </div>
    );
}
export default Authorization;