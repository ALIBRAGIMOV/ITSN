import axios from "axios";
import {authAPI} from "./auth-api";
import {usersType} from "../types/types";

export const instance = axios.create({
    withCredentials: true,
    baseURL: 'https://social-network.samuraijs.com/api/1.0/',
    headers: {
        "API-KEY": "715dcd1d-1842-40c9-a30d-cba809d4a301"
    }
})

export enum ResultCodeEnum {
    Success = 0,
    Error = 1,
}

export enum ResultCodeForCaptchaEnum {
    CaptchaIsRequired = 10
}

export type GetItemsType = {
    items: Array<usersType>
    totalCount: number
    error: string | null
}

authAPI.me().then((res) => res.data)


export type APIResponseType<D = {}, RC = ResultCodeEnum> = {
    data: D
    messages: Array<string>
    resultCode: RC
}