import actionType from '../../store/actions/actionTypes';
import {updatedObject} from '../utility';


const initialState = {
    token: null,
    userId: null,
    error: null,
    loading: false
}

const authStart = (state, action) => {
    return updatedObject(state, {
        loading: true,
        error: null
    });
}

const authSuccess = (state, action) => {
    return updatedObject(state, {
        loading: false,
        token: action.idToken,
        error: null,
        userId: action.userId
    });
}

const authFail = (state, action) => {
    return updatedObject(state, {
        loading: false,
        error: action.error
    });
}

const authLogout = (state ,action)=>{
    return updatedObject(state,{
        token : null,
        userId : null
    })
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionType.AUTH_START:
            return authStart(state, action);
        case actionType.AUTH_SUCCESS:
            return authSuccess(state, action);
        case actionType.AUTH_FAIL:
            return authFail(state, action);
        case actionType.AUTH_LOGOUT:
            return authLogout(state , action);   
        default:
            return state;
    }
}

export default reducer;