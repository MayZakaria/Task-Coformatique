export default function usersReducer(state = {}, action) {
    switch (action.type) {
        case 'REGISTER':
            return { ...state, userObj: action.payload };
        default:
            return state;
    }
}