import streams from '../api/streams'
import history from '../history'
import { 
    SIGN_IN, 
    SIGN_OUT, 
    CREATE_STREAM,
    EDIT_STREAM,
    DELETE_STREAM,
    FETCH_STREAM,
    FETCH_STREAMS
} from './types'

export const signIn = (userId) => {
    return {
        type: SIGN_IN,
        payload: userId
    }

}
export const signOut = () => {
    return {
        type: SIGN_OUT
    }
}

/* export const createStream = (formValues) => {
    return (dispatch) => {

    }

} */

//create stream //post()
//we need to know who create the streams
export const createStream = formValues => async (dispatch, getState) => {
    const { userId } = getState().auth
    const response = await streams.post('/streams', { ...formValues, userId })
    //Action creator
    dispatch({
        type: CREATE_STREAM,
        payload: response.data
    })
    //do some programactic navigation 
    //to get the user back to the root route
    history.push('/')
}

//fetch ONE stream //get()
export const fetchStream = id => async dispatch => {
    const response = await streams.get(`/streams/${id}`)
    dispatch({
        type: FETCH_STREAM,
        payload: response.data
    })
}
//fetch ALL streams //get()
export const fetchStreams = () => async dispatch => {
    const response = await streams.get(`/streams`)
    dispatch({
        type: FETCH_STREAMS,
        payload: response.data
    })
}

//edit stream //put() --> update ALL properties   /patch()-->update SOME properties
export const editStream = (id, formValues) => async dispatch => {
    const response = await streams.patch(`/streams/${id}`, formValues)
    dispatch({
        type: EDIT_STREAM,
        payload: response.data
    })
    history.push('/') // navigate the page back to streamlist
}

//delete stream  //delete()
export const deleteStream = id => async dispatch => {
    await streams.delete(`/streams/${id}`)
    dispatch({
        type: DELETE_STREAM,
        payload: id
    })
}