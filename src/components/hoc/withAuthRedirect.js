import React from "react";
import {Redirect} from "react-router-dom";
import {connect} from "react-redux";
import {compose} from "redux";

let mapStateToPropsForRedirect = (state) => ({
    isAuth: state.auth.isAuth
})

export const withAuthRedirect = (Component) => {
    class RedirectComponent extends React.Component{
        render() {
            if(!this.props.isAuth) return <Redirect to='/login'/>
            return <Component {...this.props}/>
        }
    }
    let ConnectedAuthRedirectComponent = compose(connect(mapStateToPropsForRedirect))(RedirectComponent);

    return ConnectedAuthRedirectComponent;
}