import React from 'react';
import classes from './ProfileInfo.module.css'
import Profile from "./Profile";
import {getStatus, getUserProfile, savePhoto, saveProfile, updateStatus} from "../../redux/profile-reducer";
import {connect} from "react-redux";
import {RouteComponentProps, withRouter} from "react-router-dom";
import {compose} from "redux";
import {AppStateType} from "../../redux/redux-store";
import {profileType} from "../../types/types";

type MapStatePropsType = {
    profile: profileType | null
    status: string
    authUserId: number | null
    isAuth: boolean
}

type MapDispatchPropsType = {
    getUserProfile: (userId: number)=> void
    getStatus: (userId: number)=> void
    updateStatus: (status: string)=>void
    savePhoto: (file: File) => void
    saveProfile: (profile: profileType) => Promise<any>
}

type PathParamsType = {
    userId: string
}

type PropsType = MapStatePropsType & MapDispatchPropsType & RouteComponentProps<PathParamsType>

class ProfileContainer extends React.Component<PropsType> {

    refreshProfile() {
        let userId: number | null = +this.props.match.params.userId;
        if (!userId) {
            userId = this.props.authUserId;
            if (!userId) {
                // todo: may be replace push with Redirect??
                this.props.history.push("/login");
            }
        }

        if (!userId) {
            console.error("ID should exists in URI params or in state ('authorizedUserId')");
        } else {
            this.props.getUserProfile(userId)
            this.props.getStatus(userId)
        }
    }

componentDidMount()
{
    this.refreshProfile()
}

componentDidUpdate(prevProps: PropsType, prevState: MapStatePropsType)
{
    if(this.props.match.params.userId != prevProps.match.params.userId)
    this.refreshProfile()

}

render()
{
    return (
        <div className={classes.content}>
            <Profile
                {...this.props} // give all props to component
                isOwner={!this.props.match.params.userId}
                profile={this.props.profile}
                status={this.props.status}
                updateStatus={this.props.updateStatus}
                savePhoto={this.props.savePhoto}
            />
        </div>
    )
}
}

let mapStateToProps = (state: AppStateType): MapStatePropsType => ({
    profile: state.profilePage.profile,
    status: state.profilePage.status,
    authUserId: state.auth.userId,
    isAuth: state.auth.isAuth
})

export default compose<React.ComponentType>(
    connect(mapStateToProps, {
        getUserProfile,
        getStatus,
        updateStatus,
        savePhoto,
        saveProfile
    }),
    withRouter)(ProfileContainer);