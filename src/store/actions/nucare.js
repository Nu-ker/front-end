export {
    SET_INITIAL,
    LOADING,
    ERROR
} from '../actionType'
import { AsyncStorage } from 'react-native';
import { db } from '../../firebase'
import axios from 'axios';

export function setInit() {
    return (dispatch) =>{
        AsyncStorage.getItem('uid',(err,result)=>{
            if(result){
                db.ref('Users').child(result).on('value', snapshot=>{
                    dispatch(success(snapshot.val()))
                })
            }else if(err){
                dispatch(error(err))
            }
        })
    }
}
function success(payload) {
    return {
        type : "SET_INITIAL",
        payload
    }
}
function loading() {
    return {
        type: "LOADING"
    }
}
function error(payload) {
    return {
        type: "ERROR",
        payload 
    }
}