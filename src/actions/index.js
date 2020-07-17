export function addToken(newToken) {
    return {
        type: "ADD_TOKEN",
        newToken,
    }
}
export function openModal(body) {
    return {
        type: 'OPEN_MODAL',
        body,
    }
}
export function closeModal() {
    return {
        type: 'CLOSE_MODAL',
    }
}