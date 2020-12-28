import React from 'react';
import './App.css';
import NavBar from "./components/NavBar/NavBar";
import News from "./components/News/News";
import Music from "./components/Music/Music"
import Settings from "./components/Settings/Settings"
import {withRouter, Redirect, Switch, Route, BrowserRouter} from "react-router-dom"
import UsersContainer from "./components/Users/UsersContainer";
import HeaderContainer from "./components/Header/HeaderContainer";
import Login from "./components/Login/Login";
import {connect, Provider} from "react-redux";
import {compose} from "redux";
import {initializeApp} from "./redux/app-reducer";
import Preloader from "./components/common/Preloader/Preloader";
import store, {AppStateType} from "./redux/redux-store";
import {withSuspense} from "./components/hoc/withSuspense";

const DialogsContainer = React.lazy(() => import('./components/Dialogs/DialogsContainer'))

const ProfileContainer = React.lazy(() => import('./components/Profile/ProfileContainer'))

type MapPropsType = ReturnType<typeof mapStateToProps>
type DisPropsType = {
    initializeApp: () => void
}

// use exact from Route or Switch
class App extends React.Component<MapPropsType & DisPropsType> {

    catchAllUnhandleErrors = (e: PromiseRejectionEvent) =>{
        alert("Some error occured")
        //console.error(promiseRejectionEvent)
}

    componentDidMount() {
        this.props.initializeApp()
        window.addEventListener("unhandledrejection", this.catchAllUnhandleErrors);
    }

    componentWillUnmount() {
        window.removeEventListener("unhandledrejection", this.catchAllUnhandleErrors);
    }

    render() {
        if(!this.props.initialized){
            return <Preloader/>
        }
        return (
            <div className="app-wrapper">
                <HeaderContainer/>
                <NavBar/>
                <div className="app-wrapper-content">
                    <Switch>

                        <Route exact
                               path={'/'}
                               render={() =><Redirect from="/" to="/profile" />}/>

                        <Route path="/dialogs"
                               render={withSuspense(DialogsContainer)}/>
                        <Route path="/profile/:userId?"
                               render={withSuspense(ProfileContainer)}/>
                        <Route path="/news" render={() => <News/>}/>
                        <Route path="/music" component={Music}/>
                        <Route path="/settings" component={Settings}/>
                        <Route path="/users" render={() => <UsersContainer pageTitle={"Samurai"}/>}/>

                        <Route path="/login" render={() => <Login/>}/>

                        <Route path="*" render={() => <div>404</div>}/>
                    </Switch>
                </div>
            </div>
        );
    }

}


const mapStateToProps = (state: AppStateType) => ({
    initialized: state.app.initialized
})

let AppContainer = compose<React.ComponentType>(withRouter,
    connect(mapStateToProps, {
    initializeApp
}))(App);

let SamuraiJsApp: React.FC = () => {
    return (
        <BrowserRouter>
        <Provider store={store}>
            <AppContainer/>
        </Provider>
    </BrowserRouter>
    )
}

export default SamuraiJsApp;