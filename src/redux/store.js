import profileReducer from "./profile-reducer";
import dialogsReducer from "./dialogs-reducer";
import sidebarReducer from "./sidebar-reducer";

let store = {
    _state:{
        profilePage:{
            posts: [
                {id: 1, message: 'Hi, how are you', likeCount: 12},
                {id: 2, message: 'It`s my first post?!', likeCount: 15}
            ],
            newPostText: 'it-kamasutra'
        },
        dialogsPage:{
            messages: [
                {id: 1, message: 'AYO'},
                {id: 2, message: 'What?'},
                {id: 3, message: 'Oh man'},
                {id: 4, message: 'Okay, okay'},
                {id: 5, message: 'Fukk'}
            ],
            dialogs: [
                {id: 1, name: 'Dimych'},
                {id: 2, name: 'Ali'},
                {id: 3, name: 'Sasha'},
                {id: 4, name: 'Masha'},
                {id: 5, name: 'Dasha'},
                {id: 6, name: 'Natasha'}
            ],
            newMessageBody: "",
        },
        sideBar: {}
    },
    getState(){
        return this._state;
    },
    _callSubscriber ()  {
        console.log('State changed')
    },
    subscribe (observer)  {
        this._callSubscriber = observer // observer - patern // publisher - subscriber
    },
    dispatch(action){ // ( type: 'ADD-POST' )
       this._state.profilePage = profileReducer(this._state.profilePage, action);
       this._state.dialogsPage = dialogsReducer(this._state.dialogsPage, action);
       this._state.sideBar = sidebarReducer(this._state.sideBar, action);

       this._callSubscriber(this._state)

    }
}




export default store;
window.store = store;