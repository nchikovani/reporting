import React from 'react';
import {Table, TableBody, TableCell, TableRow} from "@material-ui/core";
import PropTypes from "prop-types";

function UserRead({user}) {
    return (
        <div className='user-read'>
            <Table aria-label="simple table">
                <TableBody>
                    <TableRow>
                        <TableCell component="th" scope="row">Имя:</TableCell>
                        <TableCell>{user.firstName}</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell component="th" scope="row">Фамилия:</TableCell>
                        <TableCell>{user.lastName}</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell component="th" scope="row">Отчество:</TableCell>
                        <TableCell>{user.patronymic}</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell component="th" scope="row">Должность:</TableCell>
                        <TableCell>{user.position}</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell component="th" scope="row">Команда:</TableCell>
                        <TableCell>{user.team}</TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </div>
    );
}
UserRead.propTypes = {
    user: PropTypes.object,
};
export default UserRead;