import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { SessionProvider } from 'providers';

function PrivateRoute({ component: Component, ...rest }) {
    return (
        <Route
            {...rest}
            render={props =>
                SessionProvider.isValid() ? (
                    <Component {...props} />
                ) : (
                    <Redirect to={`/auth/login?rurl=${window.location.pathname.substr(1)}`} />
                )
            }
        />
    );
}

export default PrivateRoute;
