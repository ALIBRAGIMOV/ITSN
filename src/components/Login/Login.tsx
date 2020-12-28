import React, {FC} from "react";
import {InjectedFormProps, reduxForm} from "redux-form";
import classes from './Login.module.css'
import {connect} from "react-redux";
import {Redirect} from "react-router-dom";
import {loginUser} from "../../redux/auth-reducer";
import {createField, Input} from "../common/FormControls/FormsControls";
import {required} from "../utils/validators/validators";
import {AppStateType} from "../../redux/redux-store";

type LoginFormOwnProps = {
    captchaUrl: string | null
}

const LoginForm: FC<InjectedFormProps<LoginFormValuesType, LoginFormOwnProps> & LoginFormOwnProps> =
    ({handleSubmit, error, captchaUrl}) => {
        return (
            <form onSubmit={handleSubmit}>
                <div className={classes.loginForm}>
                    {createField<LoginFormValuesTypeKeys>("Email",  "email", [required], Input)}
                    {createField<LoginFormValuesTypeKeys>("Password", "password", [required], Input, {type: "password"})}
                    {createField<LoginFormValuesTypeKeys>(undefined, "rememberMe", [], Input, {type: "checkbox"}, "remember me")}

                    {captchaUrl && <img src={captchaUrl}/>}
                    {captchaUrl && createField<LoginFormValuesTypeKeys>("Symbols from img", "captcha", [required], Input, {})}

                    <div>
                        <button>
                            Login
                        </button>
                    </div>
                    <div className={classes.formSummaryError}>
                        {error}
                    </div>
                </div>
            </form>
        )
    }

const LoginReduxForm = reduxForm<LoginFormValuesType, LoginFormOwnProps>({
    form: 'login'
})(LoginForm)

type MapStatePropsType = {
    captchaUrl: string | null
    isAuth: boolean
}
type MapDispatchPropsType = {
    loginUser: (email: string, password: string, rememberMe: boolean, captcha: string) => void
}

type LoginFormValuesType = {
    captcha: string
    rememberMe: boolean
    password: string
    email: string
}

type LoginFormValuesTypeKeys = Extract<keyof LoginFormValuesType, string>

const Login: FC<MapStatePropsType & MapDispatchPropsType> = (props) => {
    const onSubmit = (formData: any) => {
        props.loginUser(formData.email, formData.password, formData.rememberMe, formData.captcha)
    }
    if (props.isAuth) {
        return <Redirect to={"/profile"}/>
    }
    return (
        <div>
            <h1 style={{padding: 10, margin: 0}}>Login</h1>
            <LoginReduxForm
                onSubmit={onSubmit} captchaUrl={props.captchaUrl}/>
        </div>
    )
}


const mapStateToProps = (state: AppStateType): MapStatePropsType => ({
    captchaUrl: state.auth.captchaUrl,
    isAuth: state.auth.isAuth
})

export default connect(mapStateToProps, {
    loginUser
})(Login);
