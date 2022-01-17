import React from 'react';

export default function FixedPanel(props) {
    const {
        show,
        setShow,
        title,
        content,
    } = props;
    const handleClose = () => setShow(false);

    return (
        <div className={`fixed-panel ${show ? 'show' : ''}`} id="fixed_panel">
            <div className="fixed-panel__header">
                <h5 className="title">
                    {title}
                </h5>
                <button
                    className="btn btn-light btn-icon"
                    data-action="fixedpanel-toggle"
                    onClick={() => handleClose()}
                >
                    <span className="li-cross" />
                </button>
            </div>
            <div className="fixed-panel__content scroll mCustomScrollbar _mCS_2 mCS-autoHide">
                {content || ''}
            </div>
        </div>
    );
}