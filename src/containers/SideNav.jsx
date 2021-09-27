import React, { useEffect, useState } from 'react';
import { HashLinkContainer } from 'components';

import menu from 'static/menu.json';

const NavItem = props => {
    const {
        item,
        active,
        href,
        icon,
        id,
        title,
        childitems,
        setSelectedItem,
        toggleSidebarSecondaryClass,
        selectedItem,
        wrapperClass,
    } = props;
    return (
        <li className={`nav-item lvl1 ${active ? 'active' : ''}`} data-item={id}>
            <HashLinkContainer to={href}>
                <div
                    className="nav-item-hold"
                    href={href}
                    onClick={e => {
                        setSelectedItem({});
                        if (childitems && childitems.length > 0) {
                            e.preventDefault();
                            setSelectedItem(item);
                            if (wrapperClass === 'sidenav-collapsed' || selectedItem.id === id) {
                                return toggleSidebarSecondaryClass();
                            }
                            return true;
                        }
                        if (wrapperClass === 'sidenav-open') {
                            toggleSidebarSecondaryClass();
                        }
                    }}
                >
                    <i className={`nav-icon ${icon}`} />
                    <span className="nav-text">{title}</span>
                </div>
            </HashLinkContainer>
            <div className="triangle" />
        </li>
    );
}

const SecondaryNav = item => {
    const { id, title, link, description, childitems } = item;
    if (id) {
        return (
            <>
                <header>
                    <div className="logo">
                        <img alt="" src="/images/logo.png" />
                    </div>
                    <h6>{title}</h6>
                    <p>{description}</p>
                </header>
                <ul className="childNav">
                    {childitems.map(subitem => (
                        <li key={`${id}-${subitem.id}`} className="nav-item">
                            <HashLinkContainer to={link + subitem.link}>
                                <a
                                    href={link + subitem.link}
                                >
                                    <i className={`nav-icon ${subitem.icon}`} />
                                    <span className="item-name lvl1">
                                        {subitem.title}
                                    </span>
                                </a>
                            </HashLinkContainer>
                        </li>
                    ))}
                </ul>
            </>
        );
    }
    return <div />;
};

const SideNav = props => {
    const { match, sidebarClass } = props;
    const { path } = match;
    const [activeNav, setActiveNav] = useState('overview');
    const [selectedItem, setSelectedItem] = useState({});

    useEffect(() => {
        setActiveNav(path.replace('/', ''));
    }, [path]);

    return (
        <div className="side-content-wrap">
            <div className={`sidebar-left rtl-ps-none ps ps--active-y ${sidebarClass}`}>
                <div className="logo">
                    <img src="/assets/img/logo.png" alt="CBI" />
                </div>
                <ul className="navigation-left">
                    {menu.map(item => (
                        <NavItem
                            {...props}
                            item={item}
                            id={item.id}
                            key={item.id}
                            href={item.link}
                            icon={item.icon}
                            title={item.title}
                            childitems={item.childitems}
                            active={activeNav === item.id}
                            setSelectedItem={setSelectedItem}
                            selectedItem={selectedItem}
                        />
                    ))}
                </ul>
            </div>
            <div className={`sidebar-left-secondary rtl-ps-none ps ${sidebarClass}`}>
                <i className="sidebar-close i-Close" />
                <SecondaryNav
                    {...selectedItem}
                />
            </div>
        </div>
    )
};

export default SideNav;
