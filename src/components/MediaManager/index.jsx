import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { FileManagerProvider } from 'providers';
import media from 'static/media-manager.json';
import SideNav from './SideNav';
import RightNav from './RightNav';

/**
 * Media Manager Component
 *  Handles and manages Mondo Media Files residing on the Mondo AWS S3 Bucket.
 *  This allows user to navigate through the different parent folders and select
 *  objects.
 * 
 * @param {object} props 
 */
const MediaManager = props => {
    const { activeFolder, folders, setActiveFolder } = props;
    // const [ activeFolder, setActiveFolder ] = useState('banners');
    const [ loading, setLoading ] = useState(false);
    const [ files, setFiles ] = useState([]);
    const [ searchTerm, setSearchTerm ] = useState('');
    const [ displayFiles, setDisplayFiles ] = useState([]);
    const [ pageCount, setPageCount ] = useState(1);
    const [ activePage, setActivePage ] = useState(1);
    const [ noSearchResultsFound, setNoSearchResultsFound ] = useState(false);
    const [ perPage ] = useState(12);
    const fetchData = async (folder) => {
        setNoSearchResultsFound(false);
        setSearchTerm('');
        setLoading(true);
        /**
         * On the Mondo AWS S3 bucket, naming convention
         * is not the same as the list on UI Specs, so
         * below are the exceptions to consider, so that
         * the script reads correct folder on the S3.
         */
        let filter = folder;
        if (folder === 'deals') {
            filter = 'deal-image';
        }
        if (folder === 'articles') {
            filter = 'tech-news';
        }
        if (folder === 'emails') {
            filter = 'email-assets';
        }
        const result = await FileManagerProvider.list(filter);
        if (result) {
            const pgCount = ((result.length % perPage) > 0) ? parseInt(result.length / perPage) + 1 : parseInt(result.length / perPage);
            setFiles(result);
            setPageCount(pgCount);
            setActivePage(1);

            const disp = result.filter((item, index) => index < 12);
            setDisplayFiles(disp);
        }
        setLoading(false);
    };
	useEffect(() => {
		fetchData(activeFolder);
    }, [ activeFolder, setFiles ]);
    if (files.length === 0) return false;

    const handleImageSearch = term => {
        setSearchTerm(term);
        const filtered = files.filter(item => {
            if (item.Size > 0) {
                return item.Key.toLowerCase().indexOf(term.toLowerCase()) !== -1;
            }
            return false;
        });
        setNoSearchResultsFound(filtered.length === 0);
        setDisplayFiles(filtered);
    };

    return (
        <div className="media-manager">
            <SideNav
                items={folders}
                active={activeFolder}
                fetchData={fetchData}
                setActive={setActiveFolder}
            />
            <RightNav
                files={files}
                perPage={perPage}
                active={activeFolder}
                loading={loading}
                pageCount={pageCount}
                searchTerm={searchTerm}
                activePage={activePage}
                displayFiles={displayFiles}
                setActivePage={setActivePage}
                setDisplayFiles={setDisplayFiles}
                handleImageSearch={handleImageSearch}
                noSearchResultsFound={noSearchResultsFound}
                {...props}
            />
        </div>
    );
};

MediaManager.propTypes = {
    activeFolder: PropTypes.string,
    folders: PropTypes.instanceOf(Array),
    setActiveFolder: PropTypes.func,
};

MediaManager.defaultProps = {
    activeFolder: 'banners',
    folders: media.folders.default,
    setActiveFolder: () => {},
};

export default MediaManager;
