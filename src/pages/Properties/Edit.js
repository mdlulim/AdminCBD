import React from 'react';
import { Layout } from 'containers';

export default function EditProperty(props) {
    const breadcrumb = { heading: "Update Property" };
    return (
        <Layout {...props} breadcrumb={breadcrumb}>
            edit
        </Layout>
    );
}