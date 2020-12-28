import {authUser} from "./auth-reducer";
import {InferActionsTypes} from "./redux-store";

let initialState = {
    initialized: false
}

export type initialStateType = typeof initialState
type ActionsType = InferActionsTypes<typeof actions>

const appReducer = (state = initialState, action: ActionsType): initialStateType /* function return this type*/ => {
    switch (action.type) {
        case 'SN/APP/INITIALIZED_SUCCESS':
            return {
                ...state,
                initialized: true
                }
        default:
            return state;
    }
}

export const actions = {
    initializedSuccess: () =>({type: 'SN/APP/INITIALIZED_SUCCESS'} as const)
}




export const initializeApp = () => (dispatch: any) => {
    let promise = dispatch(authUser());
            //dispatch(authUser());

            //dispatch(initializedSuccess());
    Promise.all([promise]) //  when all promise (of array) resolve to do then
        .then(() => {
            dispatch(actions.initializedSuccess())
        })
    }

export default appReducer;