import React from 'react';
import './style.scss';
import {AppBar, Button, List, Toolbar} from "@material-ui/core";
import PropTypes from "prop-types";
import TaskList from './TaskList';

class User extends React.Component {
    constructor(props) {
        super(props);
        document.title = "Личный кабинет";
        this.state = {
            tasks: []
        }
        this.handleLogOut = this.handleLogOut.bind(this);
        this.setTasks = this.setTasks.bind(this);
    }
    handleLogOut() {
        localStorage.removeItem("token");
        this.props.setPath('/');
    }
    setTasks(tasks) {
        this.setState ({
            tasks: tasks,
        });
    }
    componentDidMount() {
        fetch('/user/getTasks', {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${localStorage.token}`
            }})
            .then(res => {
                res.json().then(body => {
                    if (body.message) {
                        alert(body.message);
                    } else if (body.tasks) {
                        this.setTasks(body.tasks.reverse());
                    }
                });
            })
            .catch(err => {
                alert(err);
            });
    }
    render() {
        return(
            <React.Fragment>
                <AppBar position="static">
                    <div>
                        <Toolbar className="user__toolbar wrapper" >
                            <Button onClick={this.handleLogOut} color="inherit">Выход</Button>
                        </Toolbar>
                    </div>
                </AppBar>
                <List className="wrapper" aria-label="secondary mailbox folders">
                    <TaskList
                        tasks={this.state.tasks}
                        setTasks={this.setTasks}
                    />
                </List>
            </React.Fragment>
        );
    }
}
User.propTypes = {
    setPath: PropTypes.func,
};

export default User;