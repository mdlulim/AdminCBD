import React, { useEffect, useState } from 'react';
import menu from 'static/mainmenu.json';

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
    
    useEffect(() => {
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
    }, [match, setNavClass]);

    const activeClass = link => {
        return (link && activeNav === link) ? 'active ' : '';
    };

    const openableClass = childitems => {
        return childitems && childitems.length > 0 ? 'openable ' : '';
    };

    const openClass = id => {
        return openItem === id ? 'open' : '';
    };

    return (
        <div
            className={`page-aside invert page-aside-animation-show ${minimized ? 'page-aside--minimized' : ''} ${hidden ? 'page-aside--hidden' : ''} ${navClass}`}
            id="page-aside"
        >
            <div className="navigation navigation--condensed" id="navigation-default">
                <div className="user user--bordered user--lg user--w-lineunder user--controls"> 
                    <img src="/assets/img/users/user_1.jpeg" className="mCS_img_loaded" />
                    <div className="user__name">
                        <strong>Mduduzi Mdluli</strong><br />
                        <span className="text-muted">Administrator</span>
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
                                    <a className="dropdown-item" href="/">Profile</a>
                                    <a className="dropdown-item" href="/">Projects</a>
                                    <a className="dropdown-item" href="/">Invoices</a>
                                    <a className="dropdown-item" href="/">Settings</a>
                                    <div className="dropdown-divider"></div>
                                    <a className="dropdown-item" href="/">Log out</a>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="user__lineunder">
                        <div className="text">Last visit 15min ago</div>
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
                                    <a className="dropdown-item" href="/">Profile</a>
                                    <a className="dropdown-item" href="/">Projects</a>
                                    <a className="dropdown-item" href="/">Invoices</a>
                                    <a className="dropdown-item" href="/">Settings</a>
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
                    {menu[section].map(item => (
                    <NavItem
                        key={item.id}
                        {...item}
                        openItem={openItem}
                        openClass={openClass}
                        activeClass={activeClass}
                        openableClass={openableClass}
                        setOpenItem={setOpenItem}
                    />))}
                </ul>))}
            </div>
        </div>
    );
}