import React, { useState } from 'react';
import { Col, Row } from 'reactstrap';
import { AuthLayout } from 'containers';
import { Broadcast } from 'components';

const AddBroadcastPage = props => {
	const [pageLoading, setPageLoading] = useState(true);

	return (
		<AuthLayout {...props}
			loading={pageLoading}
			breadcrumb={{ active: "Broadcast" }}
			pageHeading={{
				title: 'Broadcast Messages',
				caption: 'ADD BROADCAST MESSAGES FOR CRYPTO BASED INNOVATION'
			}}>
			<Row className="mt-4">
				<Col lg={12} xl={12}>
					<Col md={12}>
						<Broadcast.BroadcastForm 
							pageLoading={pageLoading} 
							setPageLoading={setPageLoading} 
							{...props}
						/>
					</Col>
				</Col>
			</Row>
		</AuthLayout>
	);
};

export default AddBroadcastPage;
