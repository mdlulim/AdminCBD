import React from 'react';
import spinner from '../../assets/img/loading-buffering.gif'
export default function Default(props) {
    return (
        <div className="headerTwoDiv">
              <img src={spinner} alt="Loading" width="150" height="150" />
        </div> );
}