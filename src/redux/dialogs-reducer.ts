import {InferActionsTypes} from "./redux-store";

type Message = {
    id: number,
    message: string
};

type Dialogs =
    {
        id: number,
        name: string
    };


let initialState = {
    messages: [
        {id: 1, message: 'AYO'},
        {id: 2, message: 'What?'},
        {id: 3, message: 'Oh man'},
        {id: 4, message: 'Okay, okay'},
        {id: 5, message: 'Fukk'}
    ] as Array<Message>,
    dialogs: [
        {id: 1, name: 'Dimych'},
        {id: 2, name: 'Ali'},
        {id: 3, name: 'Sasha'},
        {id: 4, name: 'Masha'},
        {id: 5, name: 'Dasha'},
        {id: 6, name: 'Natasha'}
    ] as Array<Dialogs>,
}

export type initialStateType = typeof initialState;

const dialogsReducer = (state = initialState, action: ActionsTypes): initialStateType => {

    switch (action.type) {
        case 'SN/DIALOGS/ADD_MESSAGE':
            let body = action.newMessageBody;
            return {
                ...state,
                messages: [...state.messages, {id: 6, message: body}]
            }
        default:
            return state;
    }

}

type ActionsTypes = InferActionsTypes<typeof actions>

export const actions = {
    sendMessage: (newMessageBody: string) => ({type: 'SN/DIALOGS/ADD_MESSAGE', newMessageBody} as const)
}


export default dialogsReducer;