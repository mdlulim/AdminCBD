import React, { useEffect, useState } from 'react';
import { HashLinkContainer } from 'components';

import menu from 'static/menu.json';

const NavItem = ({ active, href, icon, id, title, toggleSidebarSecondaryNav }) => (
    <li className={`nav-item ${active ? 'active' : ''}`} data-item={id}>
        <HashLinkContainer to={href}>
            <a
                className="nav-item-hold"
                href={href}
                // onBlur={() => toggleSidebarSecondaryNav()}
                // onMouseMove={() => toggleSidebarSecondaryNav()}
            >
                <i className={`nav-icon ${icon}`} />
                <span className="nav-text">{title}</span>
            </a>
        </HashLinkContainer>
        <div className="triangle" />
    </li>
);

const SideNav = props => {
    const { match, sidebarLeftOpen } = props;
    const { path } = match;
    const [activeNav, setActiveNav] = useState('overview');
    const [sidebarLeftSecondaryOpen, setSidebarLeftSecondaryOpen] = useState(false);

    useEffect(() => {
        setActiveNav(path.replace('/', ''));
    }, [path]);

    const toggleSidebarSecondaryNav = () => {
        setSidebarLeftSecondaryOpen(!sidebarLeftSecondaryOpen);
    };

    return (
        <div className="side-content-wrap">
            <div className={`sidebar-left ${sidebarLeftOpen ? 'open' : ''} rtl-ps-none ps ps--active-y`}>
                <ul className="navigation-left">
                    {menu.map(item => (
                        <NavItem
                            id={item.id}
                            key={item.id}
                            href={item.link}
                            icon={item.icon}
                            title={item.title}
                            active={activeNav === item.id}
                            toggleSidebarSecondaryNav={toggleSidebarSecondaryNav}
                        />
                    ))}
                    {/* <NavItem
                        active={activeNav === 'dashboard'}
                        href="/dashboard"
                        icon="i-Double-Tap"
                        id="dashboard"
                        title="Dashboard"
                    />
                    <NavItem
                        active={activeNav === 'defects'}
                        href="/defects"
                        icon="i-Safe-Box1"
                        id="defects"
                        title="Defects"
                    />
                    <NavItem
                        active={activeNav === 'users'}
                        href="/users"
                        icon="i-Administrator"
                        id="users"
                        title="Users"
                    /> */}
                </ul>
            </div>
            <div className={`sidebar-left-secondary rtl-ps-none ps ${sidebarLeftSecondaryOpen ? 'open' : ''}`}>
                
            </div>
            <div className={`sidebar-overlay ${sidebarLeftSecondaryOpen ? 'open' : ''}`} />
        </div>
    )
};

export default SideNav;
