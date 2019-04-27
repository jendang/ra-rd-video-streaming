import _ from 'lodash'
import { 
    CREATE_STREAM,
    EDIT_STREAM,
    DELETE_STREAM,
    FETCH_STREAM,
    FETCH_STREAMS
} from "../actions/types";


//Array-based approach
/* const streamReducer = (state=[], action) => {
    switch(action.type){
        case EDIT_STREAM:
            return state.map(stream => {
                if(stream.id === action.payload.id){
                    return action.payload
                }else {
                    return stream
                }

            })
        default:
            return state
    }
} */

//Object-based approach
export default (state={}, action) => {
    switch(action.type){
        /* const newState= {...state }
            newState[action.payload.id] = action.payload
            return newState 
            ==> new syntax of E6: Obj key interpolation
            {...state}: create new state
            [action.payload.id]: action.payload : getting Id of that stream and return a stream
       */
        case FETCH_STREAM:
            return {...state, [action.payload.id]: action.payload}
        case CREATE_STREAM: 
            return {...state, [action.payload.id]: action.payload}    
        case EDIT_STREAM: 
            return {...state, [action.payload.id]: action.payload}    
        case FETCH_STREAMS:
            return {...state, ..._.mapKeys(action.payload, 'id')}
        case DELETE_STREAM:
            return _.omit(state, action.payload)
        default: 
            return state
    }
}