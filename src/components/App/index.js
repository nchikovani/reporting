import React from 'react';
import './style.scss';
import {BrowserRouter, Switch, Route, Redirect} from 'react-router-dom';
import Authorization from '../Authorization';
import Admin from '../Admin';
import User from '../User';
import ModalWindow from "../generic/ModalWindow";
import {connect} from "react-redux";
import PropTypes from "prop-types";

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            role: '',
            login: '',
            requestCompleted: false,
        }
        this.setRoleLogin = this.setRoleLogin.bind(this);
    }
    setRoleLogin(role, login) {
        this.setState({ ...this.state, role, login});
    }
    componentDidMount() {
        fetch('/userinfo', {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${localStorage.token}`
            }})
            .then(res => {
                if (res.status === 403) {
                    this.setState({role: '', login: '', requestCompleted: true});
                } else {
                    res.json().then(body => {
                        if (body.message) {
                            alert(body.message);
                        } else {
                            this.setState({role: body.role, login: body.login, requestCompleted: true})
                        }
                    });
                }
            })
            .catch(err => {
                console.log(err)
                this.setState({role: '', login: '', requestCompleted: true});
            });
    }
    render() {
        return(
            <React.Fragment>
                {
                    this.state.requestCompleted &&
                    <BrowserRouter>
                        <Switch>
                            <Route exact path="/">
                                {this.state.role === '' ?
                                    <Authorization
                                        setRoleLogin={this.setRoleLogin}
                                    /> :
                                    <Redirect to={this.state.role === 'admin' ? '/admin' : '/user/' + this.state.login}/>}
                            </Route>
                            <Route exact path="/admin">
                                {this.state.role === "admin" ?
                                    <Admin
                                        setRoleLogin={this.setRoleLogin}
                                    /> :
                                    <Redirect to={this.state.role === '' ? '/' : '/user/' + this.state.login}/>}
                            </Route>
                            <Route exact path="/user/:login">
                                {this.state.role === "user" ?
                                    <User
                                        setRoleLogin={this.setRoleLogin}
                                    /> :
                                    <Redirect to={this.state.role === '' ? '/' : '/admin'}/>}
                            </Route>
                        </Switch>
                    </BrowserRouter>
                }
                <ModalWindow
                    open={this.props.modalIsOpen}
                    body={this.props.modalBody}
                />
            </React.Fragment>
        );
    }
}

const mapStateToProps=function(store) {
    return {
        modalIsOpen: store.modalWindow.isOpen,
        modalBody: store.modalWindow.body,
    }
}
App.propTypes = {
    modalIsOpen: PropTypes.bool,
    modalBody: PropTypes.element,
};

export default connect(mapStateToProps)(App);