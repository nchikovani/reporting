import React from 'react';
import PropTypes from 'prop-types';
import {IconButton, Button, Toolbar, AppBar, Tabs, Tab, Box, List, ListItem, ListItemText} from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import './style.scss';

function Admin() {
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    document.title = "Личный кабинет";
    return(
        <React.Fragment>
            <AppBar position="static">
                <Toolbar className="admin__toolbar">
                    <Tabs value={value} onChange={handleChange} aria-label="simple tabs example">
                        <Tab label="Пользователи" id="simple-tab-0"/>
                        <Tab label="Задачи" id="simple-tab-1"/>
                    </Tabs>
                    <Button color="inherit">Выход</Button>
                </Toolbar>
            </AppBar>
            <TabPanel value={value} index={0}>
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
            <TabPanel value={value} index={1}>
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

export default Admin;