import React from 'react';
import {Button, Toolbar, AppBar, Tabs, Tab} from '@material-ui/core';
import TabPanel from '../generic/TabPanel';
import UserList from './UserList';
import TaskList from './TaskList';
import './style.scss';

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
    }
    handleChangeTab(event, newValue) {
        this.setState({
            tabActive: newValue
        })
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
    }
    render() {
        const tabActive =  this.state.tabActive;
        return(
            <React.Fragment>
                <AppBar position="static">
                    <Toolbar className="admin__toolbar">
                        <Tabs value={tabActive} onChange={this.handleChangeTab} aria-label="simple tabs example">
                            <Tab label="Пользователи" id="simple-tab-0"/>
                            <Tab label="Задачи" id="simple-tab-1"/>
                        </Tabs>
                        <Button onClick={this.handleLogOut} color="inherit">Выход</Button>
                    </Toolbar>
                </AppBar>
                <TabPanel value={tabActive} index={0}>
                    <UserList
                        users={this.state.users}
                        setUsers={this.setUsers}
                    />

                </TabPanel>
                <TabPanel value={tabActive} index={1}>
                    <Button
                        color="primary"
                        variant="outlined"
                    >Создать задачу</Button>
                    <TaskList/>
                </TabPanel>
            </React.Fragment>
        );
    }
}

export default Admin;