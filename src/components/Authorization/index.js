import React from 'react';
import './style.scss';
import {Button, Input, InputAdornment, IconButton, Link} from '@material-ui/core';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import classNames from 'classnames';
import {addToken} from "../../actions";
import store from '../../store';

function Authorization(props) {
    const [values, setValues] = React.useState({
        authPassword: '',
        authLogin: '',
        authShowPassword: false,
        registerPassword: '',
        registerLogin: '',
        registerName: '',
        registerShowPassword: false,
        activeTab: 'authorization',
    });
    const handleChange = (prop) => (event) => {
        setValues({ ...values, [prop]: event.target.value });
    };
    const handleClickShowPassword = (prop) => {
        setValues({ ...values, [prop]: !values[prop] });
    };
    const setActiveTab = (event, newTab) => {
        event.preventDefault();
        setValues({ ...values, activeTab: newTab});
    }
    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };
    const handleClickAuthorization = () => {
        const data = {login: values.authLogin, password: values.authPassword};
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
                        // store.dispatch(addToken(body.token));
                        localStorage.setItem("token", body.token);
                        props.setPath('/admin');
                    } else if (body.role === 'user') {
                        // store.dispatch(addToken(body.token));
                        localStorage.setItem("token", body.token);
                        props.setPath('/user/' + body.login);
                    }
                });
            },
            error => {
                alert(error);
            }
        );
    }
    const handleClickRegistration = () => {
        const data = {login: values.registerLogin, password: values.registerPassword, name: values.registerName};
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
                        // store.dispatch(addToken(body.token));
                        localStorage.setItem("token", body.token);
                        props.setPath('/user/' + body.login);
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
            <div className="authorization-modal">
                <div className={classNames("authorization", values.activeTab === "authorization" && "authorization_active")}>
                    <Input
                        className="authorization__input"
                        placeholder="Введите логин"
                        value={values.authLogin}
                        onChange={handleChange('authLogin')}
                    />
                    <Input
                        className="authorization__input"
                        type={values.authShowPassword ? 'text' : 'password'}
                        value={values.authPassword}
                        onChange={handleChange('authPassword')}
                        placeholder="Введите пароль"
                        endAdornment={
                            <InputAdornment position="end">
                                <IconButton
                                    aria-label="toggle password visibility"
                                    onClick={() => handleClickShowPassword('authShowPassword')}
                                    onMouseDown={handleMouseDownPassword}
                                >
                                    {values.authShowPassword ? <Visibility /> : <VisibilityOff />}
                                </IconButton>
                            </InputAdornment>
                        }
                    />
                    <Button
                        color="primary"
                        variant="outlined"
                        className="authorization__button"
                        onClick={handleClickAuthorization}
                    >Войти</Button>
                    <Link
                        href="#"
                        onClick={(event) => setActiveTab(event, "registration")}
                        className="authorization__link"
                        variant="body1"
                    >Регистрация</Link>
                </div>
                <div className={classNames("registration", values.activeTab === "registration" && "registration_active")}>
                    <Input
                        className="authorization__input"
                        placeholder="Введите логин"
                        value={values.registerLogin}
                        onChange={handleChange('registerLogin')}
                    />
                    <Input
                        className="authorization__input"
                        placeholder="Введите Имя"
                        value={values.registerName}
                        onChange={handleChange('registerName')}
                    />
                    <Input
                        className="authorization__input"
                        type={values.registerShowPassword ? 'text' : 'password'}
                        value={values.registerPassword}
                        onChange={handleChange('registerPassword')}
                        placeholder="Введите пароль"
                        endAdornment={
                            <InputAdornment position="end">
                                <IconButton
                                    aria-label="toggle password visibility"
                                    onClick={() => handleClickShowPassword('registerShowPassword')}
                                    onMouseDown={handleMouseDownPassword}
                                >
                                    {values.registerShowPassword ? <Visibility /> : <VisibilityOff />}
                                </IconButton>
                            </InputAdornment>
                        }
                    />
                    <Button
                        color="primary"
                        variant="outlined"
                        onClick={handleClickRegistration}
                        className="authorization__button"
                    >Зарегистрироваться</Button>
                    <Link
                        href="#"
                        onClick={(event) => setActiveTab(event, "authorization")}
                        className="authorization__link"
                        variant="body1"
                    >Вход</Link>
                </div>
            </div>
        </div>

    );
}
export default Authorization;