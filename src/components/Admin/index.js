import React from 'react';
import {Button, Toolbar, AppBar, Tabs, Tab} from '@material-ui/core';
import TabPanel from '../generic/TabPanel';
import UserList from './UserList';
import TaskList from './TaskList';
import store from "../../store";
import {openModal} from "../../actions";
import TaskCreate from './TaskCreate';
import './style.scss';
import PropTypes from "prop-types";

class Admin extends React.PureComponent {
    constructor(props) {
        super(props);
        document.title = "Личный кабинет";
        this.state = {
            tabActive: 0,
            users: [],
            tasks: [],
        }
        this.handleChangeTab = this.handleChangeTab.bind(this);
        this.handleLogOut = this.handleLogOut.bind(this);
        this.setUsers = this.setUsers.bind(this);
        this.setTasks = this.setTasks.bind(this);
    }
    handleChangeTab(event, newValue) {
        this.setState({
            tabActive: newValue
        });
    };
    handleLogOut() {
        localStorage.removeItem("token");
        this.props.setPath('/');
    }
    setUsers(users) {
        this.setState ({
            users: users,
        });
    }
    setTasks(tasks) {
        this.setState ({
            tasks: tasks,
        });
    }
    componentDidMount() {
        fetch('/admin/getUsers', {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${localStorage.token}`
            }})
            .then(res => {
                res.json().then(body => {
                    if (body.message) {
                        alert(body.message);
                    } else if (body.users) {
                        this.setUsers(body.users.reverse());
                    }
                });
            })
            .catch(err => {
                alert(err);
            });
        fetch('/admin/getTasks', {
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
        const tabActive =  this.state.tabActive;
        return(
            <React.Fragment>
                <AppBar position="static">
                    <div>
                        <Toolbar className="admin__toolbar wrapper">
                            <Tabs value={tabActive} onChange={this.handleChangeTab} aria-label="simple tabs example">
                                <Tab label="Пользователи" id="simple-tab-0"/>
                                <Tab label="Задачи" id="simple-tab-1"/>
                            </Tabs>
                            <Button onClick={this.handleLogOut} color="inherit">Выход</Button>
                        </Toolbar>
                    </div>
                </AppBar>
                <TabPanel className="wrapper" value={tabActive} index={0}>
                    <UserList
                        users={this.state.users}
                        setUsers={this.setUsers}
                    />
                </TabPanel>
                <TabPanel className="wrapper" value={tabActive} index={1}>
                    <Button
                        color="primary"
                        variant="outlined"
                        onClick={() => store.dispatch(openModal(<TaskCreate
                            setTasks={this.setTasks}
                            action="create"
                        />))}
                    >Создать задачу</Button>
                    <TaskList
                        tasks={this.state.tasks}
                        setTasks={this.setTasks}
                    />
                </TabPanel>
            </React.Fragment>
        );
    }
}
Admin.propTypes = {
    setPath: PropTypes.func,
};
export default Admin;