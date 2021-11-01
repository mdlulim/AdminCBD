import React, { useState } from 'react';

export default function Dropdown(props) {
    const { actions } = props;
    const [expanded, setExpanded] = useState(false);
    return (
        <div className={`dropdown float-right ${expanded ? 'show' : ''}`}>
            <div
                className="rw-btn rw-btn--card rw-btn--lg"
                data-toggle="dropdown"
                aria-expanded={expanded}
                onClick={() => setExpanded(!expanded)}
            >
                <div />
            </div>
            <div
                className={`dropdown-menu dropdown-menu-right ${expanded ? 'show' : ''}`}
                x-placement="bottom-end"
                style={{
                    position: 'absolute',
                    willChange: 'transform',
                    top: 0,
                    left: 0,
                    transform: 'translate3d(-160px, 40px, 0px)',
                }}
            >
                {actions.map(item => (
                <a
                    key={item.label}
                    href={item.link || '/'}
                    className="dropdown-item"
                    data-demo-action="update"
                    onClick={e => {
                        if (!item.link) {
                            e.preventDefault();
                        }
                    }}
                >
                    {item.label}
                </a>))}
            </div>
        </div>
    );
}