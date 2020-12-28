import React, {FC} from 'react';
import classes from './ProfileInfo.module.css'
import ProfileInfo from "./ProfileInfo/ProfileInfo";
import MyPostsContainer from "./MyPosts/MyPostsContainer";
import {profileType} from "../../types/types";

type PropsType = {
    profile: profileType | null
    status: string
    updateStatus: (status: string) => void
    isOwner: boolean
    savePhoto: (file: File) => void
    saveProfile: (profile: profileType) => Promise<any>
}

const Profile: FC<PropsType> = (props) => {
    return (
        <div className={classes.content}>
        <ProfileInfo
                     isOwner={props.isOwner}
                     profile={props.profile}
                     status={props.status}
                     updateStatus={props.updateStatus}
                     savePhoto={props.savePhoto}
                     saveProfile={props.saveProfile}
        />
        <MyPostsContainer  />
        </div>
    )
}

export default Profile;