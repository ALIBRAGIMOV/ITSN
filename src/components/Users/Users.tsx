import React, {FC} from "react";
import styles from "./users.module.css";
import Paginator from "../common/Paginator/Paginator";
import User from "./User";
import {usersType} from "../../types/types";

type PropsType = {
    totalUsersCount: number
    pageSize: number
    currentPage: number
    onPageChanged: (pageNumber: number) => void
    users: Array<usersType>
    followingInProgress: Array<number>
    unfollow: (userId: number)=>void
    follow: (userId: number)=>void
}

let Users: FC<PropsType> = ({totalUsersCount,
                                      pageSize,
                                      currentPage,
                                      onPageChanged,
                                      users, ...props }) => {

    return (

        <div className={styles.profile}>
            <Paginator currentPage={currentPage} onPageChanged={onPageChanged}
                       totalUsersCount={totalUsersCount} pageSize={pageSize}/>
                       <div>
                           {users.map(u => <User user={u}
                                                 key={u.id}
                                                 followingInProgress={props.followingInProgress}
                                                 follow={props.follow}
                                                 unfollow={props.unfollow}
                               />
                           )}
                       </div>
        </div>
    )
}

export default Users;