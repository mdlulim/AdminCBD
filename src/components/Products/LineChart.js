import React, { useState, useEffect } from 'react';
import { Col, Row } from 'reactstrap';
import { Line } from 'react-chartjs-2';

const NoData = () => {
    return (
        <Row>
            <Col xs={12} className="text-center">
                <Row>
                    <Col sm={2} />
                    <Col xs={12} sm={8} className="text-center mt-4">
                        &nbsp;
                    </Col>
                </Row>
                <Row>
                    <Col xs={12} className="text-center text-muted mt-5 mb-5">
                        <strong>no data available...</strong>
                    </Col>
                </Row>
            </Col>
        </Row>
    );
}

function LineChart(props) {
    const { chartData } = props;
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            setLoaded(true);
        };
        fetchData();
    }, []);

    return (
        <React.Fragment>
            {!loaded && <div>Loading...</div>}
            {loaded && chartData.labels && <Line data={chartData} legend={{ display: false }} />}
            {loaded && !chartData.labels && <NoData />}
        </React.Fragment>
    );
}

export default LineChart;