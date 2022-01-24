import { SessionProvider, UserService } from 'providers';
import React, { useEffect, useState, useMemo } from 'react';
import menu from 'static/mainmenu.json';
import Moment from 'react-moment';

const SubNavItem = props => {
    const {
        link,
        title,
        parentLink,
    } = props;
    return (
        <li>
            <a
                href={`${parentLink + link}`}
                className="no-icon"
            >
                <span className="text">{title}</span>
            </a>
        </li>
    );
}

const NavItem = props => {
    const {
        id,
        icon,
        link,
        title,
        openItem,
        setOpenItem,
        childitems,
        openClass,
        activeClass,
        openableClass,
        role
    } = props;

    return (
        <li
            className={activeClass(link) + openableClass(childitems) + openClass(id)}
        >
            <a
                href={link}
                onClick={e => {
                    if (childitems && childitems.length > 0) {
                        setOpenItem(openItem === id ? null : id);
                        e.preventDefault();
                    }
                }}
            >
                <span className={`icon ${icon}`}></span>
                <span className="text">{title}</span>
            </a>
            {childitems && childitems.length > 0 && 
                <ul>
                    {childitems.map(childitem => (
                        role && role.childitems && role.childitems[childitem.id] && role.childitems[childitem.id].read_access &&
                        <SubNavItem
                            key={`${id}-${childitem.id}`}
                            {...childitem}
                            parentLink={link}
                        />))}
                </ul>}
        </li>
    );
};

export default function AuthSidenav(props) {
    const { hidden, minimized, setMinimized, match } = props;
    const [openItem, setOpenItem] = useState(null);
    const [activeNav, setActiveNav] = useState(null);
    const [navClass, setNavClass] = useState('');
    const [showProfileDropdown, setShowProfileDropdown] = useState(false);
    const [showProfileDropdown2, setShowProfileDropdown2] = useState(false);
    const [user, setUser] = useState({});
    const [role, setRole] = useState({})

    const fetchData = async () => {
        const role = await UserService.getUserRole();
        setRole(role)
    }

    useEffect(() => {
        let user = {};
        if (SessionProvider.isValid()) {
            user = SessionProvider.get();
            setUser(user)
        } else {
            window.location = '/login';
        }
        const { path } = match;
        if (path) {
            setActiveNav(path);
        }
        window.addEventListener('scroll', () => {
            if (window.scrollY > 59) {
                setNavClass('padding-top-0');
            } else {
                setNavClass('');
            }
        });

        fetchData()
    }, [match, setNavClass]);

    const activeClass = link => {
        if (link && activeNav) {
            const ilink = link.split('/')[1];
            const anav = activeNav.split('/')[1];
            return (link && anav === ilink) ? 'active ' : '';
        }
        return '';
    };

    const openableClass = childitems => {
        return childitems && childitems.length > 0 ? 'openable ' : '';
    };

    const openClass = id => {
        return openItem === id ? 'open' : '';
    };

    return (
        <div
            id="page-aside"
            className={`page-aside invert page-aside-animation-show ${minimized ? 'page-aside--minimized' : ''} ${hidden ? 'page-aside--hidden' : ''} ${navClass}`}
            style={{ overflow: 'auto' }}
        >
            <div className="navigation navigation--condensed" id="navigation-default">
                <div className="user user--bordered user--lg user--w-lineunder user--controls">
                    <img src="/assets/img/users/user_1.jpeg" className="mCS_img_loaded" />
                    <div className="user__name">
                        <strong>{user.first_name + ' ' + user.last_name}</strong><br />
                        <span className="text-muted">{user.group_name}</span>
                        <div className="user__controls">
                            <div className={`dropdown ${showProfileDropdown ? 'show' : ''}`}>
                                <button
                                    className="btn btn-light btn-sm btn-icon"
                                    aria-expanded={showProfileDropdown}
                                    data-toggle="dropdown"
                                    aria-haspopup="true"
                                    onClick={() => setShowProfileDropdown(!showProfileDropdown)}
                                >
                                    <span className="fa fa-cog"></span>
                                </button>
                                <div
                                    className={`dropdown-menu dropdown-menu-right ${showProfileDropdown ? 'show' : ''}`}
                                    aria-labelledby="dropdownMenuButton"
                                >
                                    <a className="dropdown-item" href="/profile">Profile</a>
                                    <a className="dropdown-item" href="/settings">Settings</a>
                                    <div className="dropdown-divider" />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="user__lineunder">
                        <div className="text">Last visit <Moment date={user.time} format="hh:mm:ss" /></div>
                        <div className="buttons">
                            <div className={`dropdown ${showProfileDropdown2 ? 'show' : ''}`}>
                                <button
                                    className="button button-settings"
                                    data-toggle="dropdown"
                                    aria-haspopup="true"
                                    aria-expanded={showProfileDropdown2}
                                    onClick={() => setShowProfileDropdown2(!showProfileDropdown2)}
                                />
                                <div className={`dropdown-menu ${showProfileDropdown2 ? 'show' : ''}`} aria-labelledby="dropdownMenuButton">
                                    <a className="dropdown-item" href="/profile">Profile</a>
                                    <a className="dropdown-item" href="/settings">Settings</a>
                                    <div className="dropdown-divider"></div>
                                    <a className="dropdown-item" href="/">Log out</a>
                                </div>
                            </div>
                            <div className={`button button-minimize ${minimized ? '' : 'active'}`}
                                data-action="aside-minimize"
                                data-toggle="tooltip"
                                data-placement="top"
                                data-original-title="Minimize navigation"
                                onClick={() => setMinimized(!minimized)}
                            />
                        </div>
                    </div>
                </div>
                {Object.keys(menu).map(section => (
                    <ul key={section}>
                        <li className="title">{section}</li>
                        {
                            menu[section].map(item => (
                                role && role.permissions && role.permissions[item.id].allow_access &&
                                <NavItem
                                    key={item.id}
                                    {...item}
                                    openItem={openItem}
                                    openClass={openClass}
                                    activeClass={activeClass}
                                    openableClass={openableClass}
                                    setOpenItem={setOpenItem}
                                    role={role.permissions[item.id]}
                                />
                            ))
                        }
                    </ul>))}
            </div>
        </div>
    );
}