import actionType from './actionTypes';
import axios from 'axios';

 const auth = {
    authStart : ()=>{
        return {
            type : actionType.AUTH_START
        }
    },
    authSuccess : (authData)=>{
        return{
            type : actionType.AUTH_SUCCESS,
            authData : authData
        }

    },
    authFail : (error) =>{
        return{
            type : actionType.AUTH_FAIL,
            error : error
        }

    },
    auth : (email , password) =>{
       return dispatch=>{
            dispatch(auth.authStart());
            const API_KEY = 'AIzaSyAvR9dLWpN31vc6ItrAoYf7F05Qqr7-KFQ';
            const url = `https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=${API_KEY}`;
            const authData = {
                email : email,
                password : password,
                returnSecureToken : true
            }
            axios.post(url ,authData).then(response=>{
                console.log('response from firebase in action auth ' , response);
                dispatch(auth.authSuccess(response.data));
            }).catch(error=>{
                dispatch(auth.authFail(error));
            })
        }
    }
} 

export default auth;