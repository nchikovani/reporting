export default function token(state = "", action) {
    switch (action.type) {
        case ('ADD_TOKEN'):
            return action.newToken;
        default:
            return state;
    }
}