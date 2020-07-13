import React from 'react';
import './style.scss';
import {Button, Input, InputAdornment, IconButton, ButtonGroup} from '@material-ui/core';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import {useHistory} from "react-router-dom";
import {addToken} from "../../actions";
import store from '../../store';

function Authorization() {
    const [values, setValues] = React.useState({
        password: '',
        login: '',
        showPassword: false,
    });
    const history = useHistory();
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
                        history.push('/admin');
                        store.dispatch(addToken(body.token));
                    } else if (body.role === 'user') {
                        history.push('/user/' + body.login);
                        store.dispatch(addToken(body.token));
                    }
                });
            },
            error => {
                alert(error);
            }
        );
    }
    const handleClickRegistration = () => {
        const data = {login: values.login, password: values.password};
        fetch('/register', {
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
                    } else {
                        history.push('/user/' + body.login);
                        store.dispatch(addToken(body.token));
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
                    <ButtonGroup color="primary" aria-label="outlined primary button group">
                        <Button
                            onClick={handleClickRegistration}
                        >Зарегистрироваться</Button>
                        <Button
                            onClick={handleClickAuthorization}
                        >Войти</Button>
                    </ButtonGroup>
                </div>
            </div>
        </div>
    );
}
export default Authorization;