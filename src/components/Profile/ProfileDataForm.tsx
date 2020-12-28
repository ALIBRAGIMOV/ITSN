import React, {FC} from "react";
import {createField, Input, Textarea} from "../common/FormControls/FormsControls";
import {InjectedFormProps, reduxForm} from "redux-form";
import classes from './ProfileInfo.module.css'
import {profileType} from "../../types/types";

type PropsType = {
    profile: profileType
}

const ProfileDataForm: FC<InjectedFormProps<profileType, PropsType> & PropsType> = ({handleSubmit, profile, error}) => {
    return <form onSubmit={handleSubmit}>
        <div>
            <button>save</button>
        </div>
        {error &&
        <div className={classes.saveError}>
            {error}
        </div>}
        <div>
            <b>Name: </b>
            <a>{createField("Full name", "fullName", [], Input)}</a>
        </div>
        <div>
            <div>
                <b>Looking for a job</b>:
                { createField("", "lookingForAJob", [], Input, {type: "checkbox"})}
            </div>
            <div>
                <b>My professional skills</b>:
                { createField("My professional skills", "lookingForAJobDescription", [], Textarea)}
            </div>
        </div>
        <div>
            <b>Description: </b>
            { createField("About me", "aboutMe", [], Textarea)}
            <br/>
            <b>Contacts:</b>
            {Object.keys(profile.contacts).map(key => {
                return <div key={key} className={classes.contact}>
                    <b>{key}: {createField(key, "contacts." + key, [], Input)}</b>
                </div>
            })}
            <br/>
            <a>Status: </a>
        </div>
    </form>
}

const ProfileDataFormReduxForm = reduxForm<profileType, PropsType>({form: 'edit-profile'})(ProfileDataForm)

export default ProfileDataFormReduxForm;