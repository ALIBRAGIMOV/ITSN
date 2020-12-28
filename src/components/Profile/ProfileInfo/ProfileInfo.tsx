import React, {FC, useState} from 'react';
import classes from './ProfileInfo.module.css'
import Preloader from "../../common/Preloader/Preloader";
import ProfileStatusWithHooks from "./ProfileStatusWithHooks";
import ProfileDataForm from "../ProfileDataForm";
import {contactsType, profileType} from "../../../types/types";

type PropsType = {
    profile: profileType | null
    status: string
    updateStatus: (status: string) => void
    isOwner: boolean
    savePhoto: (file: File) => void
    saveProfile: (profile: profileType) => Promise<any>
}

const ProfileInfo: FC<PropsType> = ({profile, status, updateStatus, isOwner, savePhoto, saveProfile}) => {

    let [editMode, setEditMode] = useState(false)

    if (!profile) {
        return <Preloader/>
    }

    const onMainPhotoSelected = (e: any) => {
        if (e.target.files.length) {
            savePhoto(e.target.files[0])
        }
    }

    const onSubmit = (formData: any) => {
        saveProfile(formData).then(
            () =>{
                setEditMode(false);
            })
    }

    return (
        <div>
            <div className={classes.descriptionBlock}>
                {profile.photos.large != null &&
                <img className={classes.profileImg} height="170"
                     src={profile.photos.large}/>
                }
                {profile.photos.small == null &&
                <a style={{fontSize: 120, cursor: "none"}}>‍🧑🏻‍💻</a>
                }
                <br/>
                {isOwner && <input type={"file"} onChange={onMainPhotoSelected}/>}
                <br/>
                { editMode
                    ? <ProfileDataForm initialValues={profile}
                                       profile={profile}
                                       onSubmit={onSubmit}/>
                    : <ProfileData goToEditMode={() => {setEditMode(true)}}
                                   profile={profile} isOwner={isOwner}/>
                }
                <div>
                    <ProfileStatusWithHooks status={status} updateStatus={updateStatus}/>
                </div>
            </div>
        </div>


    )
}

type ProfileDataType = {
    isOwner: boolean
    goToEditMode: () => void
    profile: profileType
}

const ProfileData: FC<ProfileDataType> = ({profile, isOwner, goToEditMode}) =>{
    return <div>
        {isOwner && <div><button onClick={goToEditMode}>edit</button></div>}
        <div>
            <b>Name: </b>
            <a>{profile.fullName}</a>
        </div>
        <div>
            <div>
                <b>Looking for a job</b>: {profile.lookingForAJob ? "yes": "no"}
            </div>
            { profile.lookingForAJob &&
            <div>
                <b>My professional skills</b>: {profile.lookingForAJobDescription}
            </div>

            }
        </div>
        <div>
            <b>Description: </b>
            <a>{profile.aboutMe}</a>
            <br/>
            <b>Contacts:</b>
            {Object.keys(profile.contacts).map(key =>{
                return <Contact key={key} contactTitle={key} contactValue={profile.contacts[key as keyof contactsType]}/>
            })}
            <br/>
            <a>Status: </a>
        </div>
    </div>
}

type ContactPropsType = {
    contactTitle: string | null
    contactValue: string | null
}

const Contact: FC<ContactPropsType> = ({contactTitle, contactValue}) =>{
    return <div className={classes.contact}><b>{contactTitle}</b>: {contactValue}</div>
}

export default ProfileInfo;