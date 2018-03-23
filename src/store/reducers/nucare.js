export {
    SET_INITIAL,
    LOADING,
    ERROR
} from '../actionType'

export default function nucare(state = {
    loading: true,
    error: false,
    data: null
}, action) {
    console.log(action);
    switch (action.type) {
        case "SET_INITIAL":
            return {
                ...state,
                data: action.payload,
                loading: false
            }
        case "ERROR":
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        case "LOADING":
            return {
                ...state,
                loading: true
            }
        default:
            return state
    }
}