import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Col, Row } from 'reactstrap';
import { Doughnut } from 'react-chartjs-2';

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

function DoughnutChart(props) {
    const { chartData, redraw, setRedraw } = props;
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            setLoaded(true);
            if (typeof setRedraw === 'function') {
                setRedraw(false);
            }
        };
        fetchData();
    }, [setRedraw]);

    return (
        <React.Fragment>
            {!loaded && <div>Loading...</div>}
            {loaded && chartData.labels
            && (
            <Doughnut
                data={chartData}
                redraw={redraw}
                legend={{
                    display: true,
                    position: 'bottom',
                    fullWidth: true,
                    reverse: false,
                }} 
            />)}
            {loaded && !chartData.labels && <NoData />}
        </React.Fragment>
    );
}

DoughnutChart.propTypes = {
    chartData: PropTypes.shape({}),
    redraw: PropTypes.bool,
    setRedraw: PropTypes.func,
};

DoughnutChart.deafaultProps = {
    chartData: {},
    redraw: false,
    setRedraw: ()=> {},
};

export default DoughnutChart;