import React, { useState, useMemo } from 'react';
import { Col, Row } from 'reactstrap';
import { AuthLayout } from 'containers';
import { Broadcast } from 'components';
import { useParams } from 'react-router-dom';

const EditBroadcastPage = props => {
	const [pageLoading, setPageLoading] = useState(true);
	const params = useParams();
	const { id } = params;

	return (
		<AuthLayout {...props}
			loading={pageLoading}
			breadcrumb={{ active: "Broadcast" }}
			pageHeading={{
				title: 'Broadcast Messages',
				caption: 'EDIT BROADCAST MESSAGES FOR CRYPTO BASED INNOVATION'
			}}>
			<Row className="mt-4">
				<Col lg={12} xl={12}>
					<Col md={12}>
						<Broadcast.BroadcastForm
							{...props}
							pageLoading={pageLoading}
							setPageLoading={setPageLoading}
							id={id}
						/>
					</Col>
				</Col>
			</Row>
		</AuthLayout>
	);
};

export default EditBroadcastPage;
