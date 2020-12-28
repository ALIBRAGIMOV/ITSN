import React, {FC} from "react";
import styles from "./users.module.css";
import userPhoto from "../../assets/images/Ei-user.png";
import {NavLink} from "react-router-dom";
import {usersType} from "../../types/types";

type PropsType = {
    user: usersType
    followingInProgress: Array<number>
    unfollow: (userId: number)=>void
    follow: (userId: number)=>void
}

let User: FC<PropsType> = ({user, followingInProgress, follow, unfollow}) => {

    return (
        <div className={styles.profile}>
                <span>
                    <div>
                        <NavLink to={`/profile/` + user.id}>
                            <img height="60"
                                 src={user.photos.small != null ? user.photos.small : userPhoto}/>
                        </NavLink>
                    </div>
                </span>
            <div>
                {
                    user.followed ?
                        <button disabled={followingInProgress.some(id => id === user.id)} onClick={() => {
                            unfollow(user.id)
                        }}>
                            UnFollow
                        </button> :
                        <button disabled={followingInProgress.some(id => id === user.id)} onClick={() => {
                            follow(user.id)
                        }}>
                            Follow
                        </button>}
            </div>
            <span>
                    <span>
                        <div>{user.name}</div>
                        <div>{user.status}</div>
                    </span>
                    <span>
                        <div>{"user.location.city"}</div>
                        <div>{"user.location.country"}</div>
                    </span>
                </span>
            <span>
                </span>
        </div>
    )
}


export default User;