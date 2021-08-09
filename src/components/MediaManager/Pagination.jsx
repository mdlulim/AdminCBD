import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Pagination from '@material-ui/lab/Pagination';

const useStyles = makeStyles((theme) => ({
    root: {
        '& > *': {
            display: 'inline-block',
            marginTop: theme.spacing(2),
        },
    },
}));

const PaginationSize = props => {
    const {
        files,
        perPage,
        pageCount,
        activePage,
        setActivePage,
        setDisplayFiles,
    } = props;
    const classes = useStyles();

    const onChange = (e, page) => {
        const offset = (page - 1) * perPage;
        const limit = page * perPage;
        const disp = files.filter((item, index) => (index >= offset && index < limit));
        setDisplayFiles(disp);
        setActivePage(page);
    }

    return (
        <div className={classes.root}>
            <Pagination
                count={pageCount}
                page={activePage}
                size="small"
                onChange={onChange}
                showFirstButton
                showLastButton
            />
        </div>
    );
}

export default PaginationSize;
