import React from 'react';
import { Layout } from 'containers';

export default function Reports(props) {
    const breadcrumb = { heading: "Reports" };
	return (
		<Layout {...props} breadcrumb={breadcrumb}>
            reports
		</Layout>
	);
}
