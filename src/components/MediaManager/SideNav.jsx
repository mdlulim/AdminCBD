import React from 'react';

const SideNav = props => {
    const { active, fetchData, items, setActive } = props;
    return (
        <div className="sidenav">
            {items && items.length > 0 &&
            <ul className="folder-list">
                {items.map((item, index) => (
                    <li
                        className={`${active === item ? 'active' : ''}`}
                        key={index.toString()}
                        onClick={() => {
                            fetchData(item);
                            setActive(item);
                        }}
                    >
                        {item}
                    </li>
                ))}
            </ul>}
        </div>
    );
};

export default SideNav;
