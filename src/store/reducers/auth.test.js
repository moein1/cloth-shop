import reducer from './auth';

import actionTypes from '../actions/actionTypes';

describe('auth reducer', () => {

    it('should return the initial state', () => {
        expect(reducer({token: 'test',
            userId: null,
            error: null,
            loading: false}, {})).toEqual(
            {token: 'test',
            userId: null,
            error: null,
            loading: false});
    });

    it('should store the token upon login',()=>{
        expect(reducer({token: 'test',
        userId: null,
        error: null,
        loading: false},{type : actionTypes.AUTH_SUCCESS ,idToken:'test token' , userId : 'test user' })).toEqual({
            token : 'test token',
            userId : 'test user',
            error : null,
            loading : false
        })
    })

});