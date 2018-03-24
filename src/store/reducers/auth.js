export default function auth(state = {
    loading: true,
    error: false,
    uid: null
}, action) {
    console.log(action);
    switch (action.type) {
        case "SET_AUTH":
            return {
                ...state,
                uid: action.payload,
                loading: false
            }
        case "ERROR_AUTH":
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        case "LOADING_AUTH":
            return {
                ...state,
                loading: true
            }
        default:
            return state
    }
}