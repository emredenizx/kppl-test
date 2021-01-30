import * as actions from '../context/actions'

const  DataReducer = (state, action) => {
    switch (action.type) {
        case actions.SET_STRUCTURE:
            return {
                ...state,
                structure: action.payload
            };        
        default:
            return state;
    }
}

export default DataReducer;