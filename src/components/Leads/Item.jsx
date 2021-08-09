import React from 'react';

export default function Item(props) {
    const { id, dropdownActive, setDropdownActive } = props;
    return (
        <div className="ul-widget5__item">
            <div className="ul-widget5__content">
                <div className="ul-widget5__pic"><img src={require("images/template1.jpeg")} alt="Third slide" /></div>
                <div className="ul-widget5__section"><a className="ul-widget4__title" href="/">Sandile Ngeleka</a>
                    <p className="ul-widget5__desc">#109923001</p>
                    <div className="ul-widget5__info">
                        <span>[e]: </span>
                        <span className="text-primary">sandile.ngeleka@gmail.com</span>
                        <span>[t]: </span>
                        <span className="text-primary">071 123 4567</span>
                    </div>
                </div>
            </div>
            <div className="ul-widget5__content">
                <div className="ul-widget5__stats">
                    <span className="ul-widget5__number">540</span>
                    <span className="ul-widget5__sales text-mute">Listings</span>
                </div>
                <div className="ul-widget5__stats">
                    <span className="ul-widget5__number">99</span>
                    <span className="ul-widget5__sales text-mute">Leads</span>
                </div>
            </div>
            <div className="ul-widget5__content">
                <span className="badge badge-pill badge-outline-success p-2 m-1">
                    Active
                </span>
            </div>
            <div
                className={`ul-widget5__content ${(dropdownActive === id) ? 'show' : ''}`}
                style={{ position: 'relative' }}
            >
                <button
                    className="btn bg-white _r_btn border-0"
                    type="button"
                    data-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded={(dropdownActive === id)}
                    onClick={() => {
                        if (dropdownActive === id) {
                            return setDropdownActive(null);
                        }
                        return setDropdownActive(id);
                    }}
                >
                    <span className="_dot _inline-dot bg-primary"></span>
                    <span className="_dot _inline-dot bg-primary"></span>
                    <span className="_dot _inline-dot bg-primary"></span>
                </button>
                <div
                    className={`dropdown-menu ${(dropdownActive === id) ? 'show' : ''}`}
                    x-placement="bottom-start"
                    style={{
                        right: 0,
                        left: 'auto'
                    }}
                >
                    <a className="dropdown-item ul-widget__link--font" href="/">
                        <i className="i-Bar-Chart-4"> </i> Preview
                    </a>
                    <a className="dropdown-item ul-widget__link--font" href="/">
                        <i className="i-Data-Save"> </i> Save
                    </a>
                    <a className="dropdown-item ul-widget__link--font" href="/">
                        <i className="i-Duplicate-Layer"></i> Import
                    </a>
                    <div className="dropdown-divider"></div>
                    <a className="dropdown-item ul-widget__link--font" href="/">
                        <i className="i-Folder-Download"></i> Update
                    </a>
                    <a className="dropdown-item ul-widget__link--font" href="/">
                        <i className="i-Gears-2"></i> Customize
                    </a>
                </div>
            </div>
        </div>
    );

}