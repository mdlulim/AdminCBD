import React from 'react';
import moment from 'moment';
import PropTypes from 'prop-types';
import { Card, CardBody, CardFooter } from 'reactstrap';

import FileThumbnail from './FileThumbnail';

const FilePreview = props => {
    const { Key, LastModified, onPreviewClick, selected, Size } = props;
    const arr = Key.split('/');
    const name = arr[arr.length - 1];
    return (
        <div
            className="file-preview"
            onClick={() => onPreviewClick(Key)}
        >
            <Card className={`card-file mg-b-10 ${selected === Key ? 'selected' : ''}`}>
                <FileThumbnail {...props} />
                <CardBody>
                    <h6><a href="/" className="link-02" onClick={e => e.preventDefault()}>{name}</a></h6>
                    <span>{parseInt(Size / 1024)}kb</span>
                </CardBody>
                <CardFooter>
                    <span className="d-none d-sm-inline">Last modified: </span>
                    {moment(LastModified).fromNow()}
                </CardFooter>
            </Card>
        </div>
    );
};

FilePreview.propTypes = {
    Key: PropTypes.string.isRequired,
    LastModified: PropTypes.any.isRequired,
    Size: PropTypes.number.isRequired,
    onPreviewClick: PropTypes.func,
};

FilePreview.defaultProps = {
    onPreviewClick: () => {},
};

export default FilePreview;
