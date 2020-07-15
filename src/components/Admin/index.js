import React from 'react';
import PropTypes from 'prop-types';
import {IconButton, Button, Toolbar, AppBar, Tabs, Tab, Box, List, ListItem, ListItemText} from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import {connect} from 'react-redux';
import './style.scss';

class Admin extends React.Component {
    constructor(props) {
        super(props);
        document.title = "Личный кабинет";
        this.state = {
            tabActive: 0,
        }
        this.handleChangeTab = this.handleChangeTab.bind(this);
        this.handleLogOut = this.handleLogOut.bind(this);
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
    componentDidMount() {
        fetch('/getUsers', {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${localStorage.token}`
            }})
            .then(res => {
                if (res.status === 200) {
                    res.json().then(body => {
                       console.log(body.login)
                    });
                } else {
                    const error = new Error(res.error);
                    throw error;
                }
            })
            .catch(err => {
                console.error(err);
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
                    <List aria-label="secondary mailbox folders">
                        <ListItem button>
                            <ListItemText primary="user1" />
                            <IconButton edge="end" aria-label="delete">
                                <EditIcon />
                            </IconButton>
                            <IconButton edge="end" aria-label="delete">
                                <DeleteIcon />
                            </IconButton>
                        </ListItem>
                        <ListItem button>
                            <ListItemText primary="user2" />
                            <IconButton edge="end" aria-label="delete">
                                <EditIcon />
                            </IconButton>
                            <IconButton edge="end" aria-label="delete">
                                <DeleteIcon />
                            </IconButton>
                        </ListItem>
                    </List>
                </TabPanel>
                <TabPanel value={tabActive} index={1}>
                    <Button
                        color="primary"
                        variant="outlined"
                    >Создать задачу</Button>
                    <List aria-label="secondary mailbox folders">
                        <ListItem button>
                            <ListItemText primary="Задача1" />
                            <IconButton edge="end" aria-label="delete">
                                <EditIcon />
                            </IconButton>
                            <IconButton edge="end" aria-label="delete">
                                <DeleteIcon />
                            </IconButton>
                        </ListItem>
                        <ListItem button>
                            <ListItemText primary="Задача2" />
                            <IconButton edge="end" aria-label="delete">
                                <EditIcon />
                            </IconButton>
                            <IconButton edge="end" aria-label="delete">
                                <DeleteIcon />
                            </IconButton>
                        </ListItem>
                    </List>
                </TabPanel>
            </React.Fragment>
        );
    }
}

function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box p={3}>
                    {children}
                </Box>
            )}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
};
// const mapStateToProps = (store) => {
//     return {
//         token: store.token,
//     }
// }
export default Admin;