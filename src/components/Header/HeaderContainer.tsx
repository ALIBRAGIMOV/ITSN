import React from 'react';
import Header, {DispatchPropType, MapPropType} from "./Header";
import {logout} from "../../redux/auth-reducer";
import {connect} from "react-redux";


class HeaderContainer extends React.Component<MapPropType & DispatchPropType> {
    render() {
        return <Header {...this.props} />
    }
}

const mapStateToProps = (state: any) => ({
    isAuth: state.auth.isAuth,
    login: state.auth.login
})

export default connect(mapStateToProps, {
    logout
})(HeaderContainer);