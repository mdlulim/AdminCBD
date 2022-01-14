import React from 'react';

export default function (props) {
    return (
        <>
            <ul className="nav nav-tabs" id="myTab" role="tablist">
                <li className="nav-item">
                    <a className="nav-link text-bold active show" id="tab-1_" data-toggle="tab" href="#tab-1" role="tab" aria-controls="home" aria-selected="true">
                        Overview
                    </a>
                </li>
                <li className="nav-item">
                    <a className="nav-link text-bold" id="tab-2_" data-toggle="tab" href="#tab-2" role="tab" aria-controls="profile" aria-selected="false">
                        Details
                    </a>
                </li>
                <li className="nav-item">
                    <a className="nav-link text-bold" id="tab-3_" data-toggle="tab" href="#tab-3" role="tab" aria-controls="profile" aria-selected="false">
                        Notes
                    </a>
                </li>
                <li className="nav-item">
                    <a className="nav-link text-bold" id="tab-3_" data-toggle="tab" href="#tab-3" role="tab" aria-controls="profile" aria-selected="false">
                        Users
                    </a>
                </li>
            </ul>
        </>
    );
}