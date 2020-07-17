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
            path: "",
        }
        this.setPath = this.setPath.bind(this);
    }
    setPath(newPath) {
        this.setState({path: newPath});
    }
    componentDidMount() {
        fetch('userinfo', {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${localStorage.token}`
            }})
            .then(res => {
                if (res.status === 403) {
                    this.setState({path: "/"});
                } else {
                    res.json().then(body => {
                        if (body.message) {
                            alert(body.message);
                        } else if (body.role === "admin") {
                            this.setState({path: "/admin"});
                        } else if (body.role === "user") {
                            this.setState({path: "/user/" + body.login});
                        }
                    });
                }
            })
            .catch(err => {
                console.log(err)
                this.setState({path: "/"});
            });
    }
    render() {
        return(
            <React.Fragment>
                <BrowserRouter>
                    <Switch>
                        <Route exact path="/">
                            {this.state.path === "/" ?
                                <Authorization
                                    setPath={this.setPath}
                                /> :
                                <Redirect to={this.state.path}/>}
                        </Route>
                        <Route exact path="/admin">
                            {this.state.path === "/admin" ?
                                <Admin
                                    setPath={this.setPath}
                                /> :
                                <Redirect to={this.state.path}/>}
                        </Route>
                        <Route exact path="/user/:login">
                            {this.state.path.slice(0, 5) === "/user" ?
                                <User
                                    setPath={this.setPath}
                                /> :
                                <Redirect to={this.state.path}/>}
                        </Route>
                    </Switch>
                </BrowserRouter>
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