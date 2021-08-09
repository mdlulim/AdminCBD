import React, { useEffect, useState } from 'react';
import { FileManagerProvider } from 'providers';

const FileThumbnail = props => {
    const { Key } = props;
    const [ imageUrl, setImageUrl ] = useState(null);

    const fetchData = async () => {
        const imageUrl = await FileManagerProvider.resizeImage(Key);
        setImageUrl(imageUrl);
    }
    useEffect(() => {
        fetchData();
    }, [ setImageUrl ]);

    return (
        <div
            className="card-file-thumb tx-danger"
            style={{
                backgroundImage: `url(${imageUrl})`,
                backgroundRepeat: 'no-repeat',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
            }}
        >
            <i className="far fa-file-pdf" title={Key} />
        </div>
    );
};

export default FileThumbnail;
