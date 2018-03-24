export {
    SET_INITIAL,
    LOADING,
    ERROR
} from '../actionType'
import { AsyncStorage } from 'react-native';
import { db } from '../../firebase'
import axios from 'axios';

export function setInitAuth() {
    return (dispatch) =>{
        dispatch(loading())
        AsyncStorage.getItem('uid',(err,result)=>{
            if(result){
                db.ref('Users').child(result).on('value', snapshot=>{
                    dispatch(successFB(snapshot.val()))
                    dispatch(success(result))
                })
            }else if(err){
                dispatch(error(err))
            }else{
                dispatch(success(null))
            }
        })
    }
}

export function logOut() {
    return (dispatch) =>{
        AsyncStorage.removeItem('uid',(err)=>{
            if(!err){
                dispatch(success(null))
                dispatch(successFB(null))
            }else if(err){
                dispatch(error(err))
            }
        })
    }
}
function successFB(payload) {
    return {
        type : "SET_INITIAL",
        payload
    }
}
function success(payload) {
    return {
        type : "SET_AUTH",
        payload
    }
}
function loading() {
    return {
        type: "LOADING_AUTH"
    }
}
function error(payload) {
    return {
        type: "ERROR_AUTH",
        payload 
    }
}