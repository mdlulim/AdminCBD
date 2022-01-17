import React from 'react';

const PageNotFound = props => {
    const { history, location } = props;
    document.title = 'Page Not Found';

    // change the url
    if (history) {
        if (location.pathname.indexOf('/404') === -1) {
            history.push('/404');
        }
    }

    return (
        <div className="not-found-wrap text-center">
            <h1 className="text-60">404</h1>
            <p className="text-36 subheading mb-3">Error!</p>
            <p className="mb-5 text-muted text-18">Sorry! The page you were looking for doesn't exist.</p>
            <a className="btn btn-lg btn-primary btn-rounded" href="/dashboard">Go back to Dashboard</a>
        </div>
    )
};

export default PageNotFound;
