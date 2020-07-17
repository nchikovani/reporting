import React from 'react';
import {Table, TableBody, TableCell, TableRow} from "@material-ui/core";
import PropTypes from "prop-types";


function UserRead({user}) {
    return (
        <Table aria-label="simple table">
            <TableBody>
                <TableRow>
                    <TableCell component="th" scope="row">Имя:</TableCell>
                    <TableCell>{user.name}</TableCell>
                </TableRow>
            </TableBody>
        </Table>
    );
}
UserRead.propTypes = {
    user: PropTypes.object,
};
export default UserRead;