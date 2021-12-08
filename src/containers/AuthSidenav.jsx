import { PagePermissionService, SessionProvider } from 'providers';
import React, { useEffect, useState, useMemo } from 'react';
import menu from 'static/mainmenu.json';
import { Session } from 'bc-react-session';
import Moment from 'react-moment';

const session = Session.get();
var vl =[];
var member_page;
const SubNavItem = props => {
    const [hasAccess, setHasAccess] = useState(false);
    const [perm, setPerm] = useState('');
    var t='';
    //var ul = localStorage.getItem('userLevel');

    const {
        link,
        title,
        parentLink,
    } = props;

    useMemo(() => {
        let user = {};
        if (SessionProvider.isValid()) {
            user = SessionProvider.get();
            console.log(user);
        }else{
            window.location = '/login';
        }
        let ul = user.permission_level;
        PagePermissionService.getPagePermissionsByPage((title.toLowerCase()).replace(/\s/g, "")).then((res) => {
            // console.log(ul);
            if(ul == 1){
                setHasAccess(res.data.low);
            }else if(ul == 2){
                setHasAccess(res.data.basic);
            }else if(ul == 3){
                setHasAccess(res.data.medium);
            }else if(ul == 4){
                setHasAccess(res.data.high);
            }else if(ul == 5){
                setHasAccess(res.data.veryhigh);
            }
            if(title === 'User Permissions' || title === 'Users' || title === 'User Roles'  || title === 'Countries'  || title === 'Settings'  || title === 'Forms Configuration'){
                setHasAccess(true);
            }
        });
        }, []);
         if(hasAccess == true){
             vl.push(title);             
         }
         Session.setPayload({
            vlist: vl,
        });
            
        //  Session.start({ 
        //     payload: {
        //         vlist: vl,
        //     },
        // }); 
    return (
       
        (hasAccess == true ? <li>
            <a
                href={`${parentLink + link}`}
                className="no-icon"
            >
                <span className="text">{title}</span>
            </a>
        </li> : '')
        
    );

    
}

// sessionStorage.setItem('members', member_page);

// console.log(vl);
// window.sessionStorage.setItem("items",vl);
// console.log(window.sessionStorage.getItem('items'));
// localStorage.setItem('vlist', vl);

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
    let cnt = 0;
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
    const [user, setUser] = useState({});
    
    useEffect(() => {
        let user = {};
        if (SessionProvider.isValid()) {
            user = SessionProvider.get();
            setUser(user)
        }else{
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
                        <strong>{user.first_name+' '+user.last_name}</strong><br />
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
                                    <a className="dropdown-item" href="/">Profile</a>
                                    <a className="dropdown-item" href="/">Settings</a>
                                    <div className="dropdown-divider"></div>
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