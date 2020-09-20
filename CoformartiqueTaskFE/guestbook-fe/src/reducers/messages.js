export default function messagesReducer(state = {}, action) {
    switch (action.type) {
        case 'MESSAGE_LIST':
            return { ...state, list: action.payload };
        case 'MESSAGE_DETAILS':
            return { ...state, details: action.payload };
        default:
            return state;
    }
}

// export default function projects(state: ProjectsState = initialState, action: ProjectsActionsTypes) {
//     switch (action.type) {
//         case PROJECTS_LIST:
//             return { ...state, list: action.payload }
//         case PROJECT_DETAILS:
//             return { ...state, details: action.payload }
//         default:
//             break;
//     }
// return state;
// }