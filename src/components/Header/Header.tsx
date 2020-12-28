import React from 'react';
import style from './Header.module.css'
import {NavLink} from "react-router-dom";

export type MapPropType = {
    isAuth: boolean,
    login: string | null
}

export type DispatchPropType = {
    logout: () => void
}

const Header: React.FC<MapPropType & DispatchPropType> = (props) => {

    return (
        <header  className={style.header}>
            <NavLink to={'/'}>
                <img
                    className={style.imgHeader}
                    src={require('../../kisspng-starfleet-starship-enterprise-united-federation-of-morbius-5b1fed205ce3f0.0087458515288189763805.png')}
                    alt=""
                    height="60"
                />
            </NavLink>

        <div className={style.loginBlock}>
            <NavLink to={'/login'}>
                { props.isAuth ? <div>
                    <div>
                        {props.login}
                    </div>
                    <button onClick={props.logout}>LogOut</button>
                </div>  : <span> Login </span> }
            </NavLink>
        </div>
    </header>)
}

export default Header;