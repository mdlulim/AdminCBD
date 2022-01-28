import React, { useState, useMemo } from 'react';
import { Col, Row } from 'reactstrap';
import { AuthLayout } from 'containers';
import { Broadcast } from 'components';
import { useParams } from 'react-router-dom';
import { BroadcastService } from '../../providers';

const EditBroadcastPage = props => {
	const [pageLoading, setPageLoading] = useState(true);
	const params = useParams();
	const { id } = params;
	const [broadcast, setBroadcast] = useState(null)
	const [startDate, setStartDate] = useState(new Date());
	const [endDate, setEndDate] = useState(new Date());

	useMemo(() => {
		console.log('usememo ', id)
		BroadcastService.get(id)
			.then(res => {
				console.log('fetch')
				setBroadcast(res.results[0])
				setStartDate(new Date(res.results[0].published))
				setEndDate(new Date(res.results[0].expiry))
				setPageLoading(false)
			})
	})

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
						{/* <Broadcast.BroadcastForm
							{...props}
							pageLoading={pageLoading}
							setPageLoading={setPageLoading}
							broadcast={broadcast}
							startDate={startDate}
							setStartDate={setStartDate}
							endDate={endDate}
							setEndDate={setEndDate}
						/> */}
					</Col>
				</Col>
			</Row>
		</AuthLayout>
	);
};

export default EditBroadcastPage;
