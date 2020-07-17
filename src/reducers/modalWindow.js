const initial = {
	isOpen: false, 
	child: null,
}

function modalWindow(state=initial, action) {
  switch (action.type) {
    case 'OPEN_MODAL':
      return {
      	isOpen: true,
      	body: action.body,
      };
    case 'CLOSE_MODAL':
      return {
      	isOpen: false,
      	child: null,
      };
    default:
      return state;
  }
}

export default modalWindow;