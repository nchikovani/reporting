import React from 'react';
import {Typography} from "@material-ui/core";
import PropTypes from "prop-types";


function UserRead({user}) {
    return (
        <div>
            <Typography variant="body1">Имя: {user.name}</Typography>
        </div>
    );
}
UserRead.propTypes = {
    user: PropTypes.object,
};
export default UserRead;