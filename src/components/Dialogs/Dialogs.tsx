import React from 'react';
import classes from "./Dialogs.module.css"
import DialogItem from "./DialogItem/DialogItem";
import Message from "./Message/Message";
import {initialStateType} from "../../redux/dialogs-reducer";
import AddMessageFormRedux from "./AddMessageForm/AddMessageForm";

type PropsType = {
    dialogsPage: initialStateType,
    sendMessage: (messageText: string) => void
}

export type NewMessageFormValuesType = {
    newMessageBody: string
}

const Dialogs: React.FC<PropsType> = (props) => {
    let state = props.dialogsPage

    let addNewMessage = (values: NewMessageFormValuesType) => {
        props.sendMessage(values.newMessageBody)
    }

    let dialogsElements = state.dialogs
        .map(d => <DialogItem name={d.name} id={d.id} key={d.id}/>);
    let messagesElements = state.messages
        .map(m => <Message message={m.message} key={m.id}/>);


    return (
        <div className={classes.dialogs}>
            <div className={classes.dialogsItems}>
                {dialogsElements}
            </div>
            <div className={classes.messages}>
                {messagesElements}
            </div>
            <AddMessageFormRedux onSubmit={addNewMessage}/>
        </div>)
}


export default Dialogs;