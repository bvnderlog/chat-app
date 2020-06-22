import { createReducer, createSlice } from '@reduxjs/toolkit';
import actions from '../actions';
import messages from './reducers';


export default createSlice({
    name: 'messages',
    initialState: [],
    reducers: {
        messageAdd: (state, action) => [...state, action.payload.message],
    },
});

// export default createReducer([], {
//     [actions.addMessage]: (state, action) => [...state, action.payload.message],
// });


// export default (state = [], action) => {
//     switch (action.type) {
//         case 'MESSAGE_ADD': {
//             const message = action.payload.message;
//             return [...state, message];
//         }
//         default:
//         return state;
//     }
// };
