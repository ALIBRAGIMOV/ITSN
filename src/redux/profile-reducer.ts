import {FormAction, stopSubmit} from "redux-form";
import {photosType, postsType, profileType} from "../types/types";
import {BaseThunkType, InferActionsTypes} from "./redux-store";
import {profileAPI} from "../api/profile-api";

let initialState = {
    posts: [
        {id: 1, message: 'Hi, how are you?👁', likeCount: 12},
        {id: 2, message: 'It`s my first post?!', likeCount: 15},
        {id: 3, message: 'Good, nice, wow?!', likeCount: 15},
        {id: 4, message: 'Lo4', likeCount: 15},
    ] as Array<postsType>,
    profile: null as profileType | null,
    status: ""
}


const profileReducer = (state = initialState, action: ActionsTypes): initialStateType => {

    switch (action.type) {
        case 'SN/PROFILE/ADD_POST': {
            return {
                ...state,
                posts: [...state.posts, {id: 5, message: action.newPostBody, likeCount: 0}],
            }
        }
        case 'SN/PROFILE/SET_STATUS': {
            return {
                ...state,
                status: action.status
            }
        }
        case 'SN/PROFILE/SET_USER_PROFILE': {
            return {...state, profile: action.profile}
        }
        case 'SN/PROFILE/DELETE_POST': {
            return {...state, posts: state.posts.filter(p => p.id != action.postId)}
        }

        case 'SN/PROFILE/SAVE_PHOTO_SUCCESS': {
            return {...state, profile: {...state.profile, photos: action.photos} as profileType}
        }
        default:
            return state;
    }
}


export const actions = {
    addPostActionCreator: (newPostBody: string) => ({type: "SN/PROFILE/ADD_POST", newPostBody} as const),

    setUserProfile: (profile: profileType) => ({type: "SN/PROFILE/SET_USER_PROFILE", profile} as const),

    setStatus: (status: string) => ({type: "SN/PROFILE/SET_STATUS", status} as const),

    deletePost: (postId: number) => ({type: 'SN/PROFILE/DELETE_POST', postId} as const),

    savePhotoSuccess:(photos: photosType) => ({type: "SN/PROFILE/SAVE_PHOTO_SUCCESS", photos} as const)

}

export const getUserProfile = (userId: number): ThunkType => async (dispatch) => {
    const data = await profileAPI.getProfile(userId)
    dispatch(actions.setUserProfile(data))
}

export const getStatus = (userId: number): ThunkType => async (dispatch) => {
    const data = await profileAPI.getStatus(userId)
    dispatch(actions.setStatus(data))
}

export const updateStatus = (status: string): ThunkType => async (dispatch) => {
    const data = await profileAPI.updateStatus(status)
    if (data.resultCode === 0) {
        dispatch(actions.setStatus(status))
    }
}

export const savePhoto = (file: File): ThunkType => async (dispatch) => {
    const data = await profileAPI.savePhoto(file)
    if (data.resultCode === 0) {
        dispatch(actions.savePhotoSuccess(data.data.photos))
    }
}

export const saveProfile = (profile: profileType): ThunkType => async (dispatch, getState) => {
    const userId = getState().auth.userId;
    const data = await profileAPI.saveProfile(profile)

    if (data.resultCode === 0) {
        if(userId != null){
            dispatch(getUserProfile(userId))
        }else {
            throw new Error("userId is not null")
        }
    } else {
        dispatch(stopSubmit("edit-profile", {_error: data.messages[0]}))
        return Promise.reject(data.messages[0])
    }
}

export type initialStateType = typeof initialState
type ActionsTypes = InferActionsTypes<typeof actions>
type ThunkType = BaseThunkType<ActionsTypes | FormAction>


export default profileReducer;