import React from 'react';
import { Col, Row } from 'reactstrap';

import FilePreview from './FilePreview';
import Loader from './Loader';
import Pagination from './Pagination';

const RightNav = props => {
    const {
        active,
        files,
        loading,
        searchTerm,
        displayFiles,
        handleImageSearch,
        noSearchResultsFound,
    } = props;
    if (files.length === 1) {
        if (files[0].Size === 0) {
            return (
                <div className="rightnav">
                    {loading && <Loader />}
                    <div className="mg-y-80 text-center">
                        No {active} files found
                    </div>
                </div>
            );
        }
    }
    return (
        <div className="rightnav">
            {loading && <Loader />}
            <div className="search-filter">
                <input
                    type="search"
                    className="form-control"
                    placeholder={`Search for image in '${active}'...`}
                    onChange={e => handleImageSearch(e.target.value)}
                    value={searchTerm}
                />
            </div>
            <div className="file-list">
                {files && files.length > 0 &&
                <>
                    <Row>
                        {displayFiles.map(file => {
                            if (file.Size > 0) {
                                return (
                                    <Col xs={4} key={file.Key}>
                                        <FilePreview {...props} {...file} />
                                    </Col>
                                );
                            }
                        })}
                    </Row>
                    {files.length > 10 &&
                    <div className="text-right">
                        <Pagination
                            {...props}
                        />
                    </div>}
                </>}
                {files && files.length === 0 && <div className="text-center">No {active} files found</div>}
                {noSearchResultsFound && <div className="text-center">No {active} files found for your search.</div>}
            </div>
        </div>
    );
};

export default RightNav;
