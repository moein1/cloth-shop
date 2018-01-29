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

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionType.AUTH_START:
            return authStart(state, action);
        case actionType.AUTH_SUCCESS:
            console.log(action);
            return authSuccess(state, action);
        case actionType.AUTH_FAIL:
            return authFail(state, action);
        default:
            return state;
    }
}

export default reducer;