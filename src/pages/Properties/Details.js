import React from 'react';
import { Layout } from 'containers';

export default function PropertyDetails(props) {
    const breadcrumb = { heading: "Property Details" };
    return (
        <Layout {...props} breadcrumb={breadcrumb}>
            details
        </Layout>
    );
}