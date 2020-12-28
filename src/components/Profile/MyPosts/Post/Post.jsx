import React from 'react';
import classes from './Post.module.css'

const Post = (props) => {
    return (
        <div>
            {props.message}
            <br/>
            {props.likeCount}
            {' '} <a className={classes.emoj}>❤️</a>
        </div>


    )
}

export default Post;