import React from 'react';
import spinner from '../../assets/img/loading-buffering.gif';

export default function Default() {
        return (
                <div className="headerTwoDiv" style={{ textAlign: 'center' }}>
                        <img src={spinner} alt="Loading" width="150" height="150" />
                </div>
        );
}