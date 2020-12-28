import React from 'react';
import classes from './MyPosts.module.css'
import Post from "./Post/Post";
import {Field, reduxForm} from "redux-form";
import {maxLengthCreator, required} from "../../utils/validators/validators";
import {Textarea} from "../../common/FormControls/FormsControls";

const maxLength50 = maxLengthCreator(50);

const  MyPosts = React.memo(props => {
    let postsElements =
        [...props.posts]
            .reverse() // first element go in last, and last go in first
            .map( p => <Post key={p.id} message={p.message} likeCount={p.likeCount}/>);

    let onAddPost = (values) => {
        props.addPost(values.newPostElement);
    }

    return (

        <div className={classes.postsBlock}>
            <h3>My Posts</h3>
            <div>
                <MyPostFormRedux onSubmit={onAddPost}/>
            </div>
            <div className={classes.posts}>
                {postsElements}
            </div>
        </div>

    )
})

const MyPostsForm = (props) => {
    return(
        <form className={classes.postsForm} onSubmit={props.handleSubmit}>
            <Field component={Textarea}
                   name={'newPostElement'}
                   placeholder={'Enter New-Post text'}
                   validate={[ required, maxLength50 ]}
            />
            <button>App post</button>
        </form>
    )
}

const MyPostFormRedux = reduxForm({ form: "myPostForm" })(MyPostsForm)


export default MyPosts;