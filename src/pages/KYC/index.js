import React, { useState, useEffect } from 'react';
import { Card, CardBody, Col, Row } from 'reactstrap';
import { Common, Pagination, KYC } from 'components';
import { AuthLayout } from 'containers';
import { KYCService } from '../../providers';

export default function KYCPage(props) {
    const [members, setMembers] = useState([]);
    const [filteredMembers, setFilteredMembers] = useState([]);
    const [pageLoading, setPageLoading] = useState(true);

    useEffect(() => {
        KYCService.getKYCApplicants()
        .then((res) => {
            const memberslist = res.data.data;
            setMembers(memberslist);
            setFilteredMembers(memberslist);
            setPageLoading(false)
        })
    }, []);


    return (
        <AuthLayout
            {...props}
            loading={pageLoading}
            breadcrumb={{
                items: [{ title: 'Dashboard', link: '/dashboard' }],
                active: "KYC"
            }}
            pageHeading={{
                title: 'KYC',
                caption: 'EXPLORE MEMBERS DASHBOARD FOR CRYPTO BASED INNOVATION',
            }}
        >
            {!pageLoading &&
                <>
                    {/* <div className="form-row margin-bottom-20">
                        <Col xs={12} lg={3}>
                            <Common.Widget
                                icon="li-user"
                                title="All KYC Members"
                                subtitle="All Members"
                                informer={<span className="text-bold">{kycDetails.level_0.total}</span>}
                                invert={false}
                            />
                        </Col>
                        <Col xs={12} lg={9}>
                            <Row>
                                <Col xs={12} lg={3}>
                                    <Common.Widget
                                        icon="li-user-lock"
                                        title="Level 0"
                                        informer={
                                            <>
                                                <span className="text-bold text-success m-2">{kycDetails.level_0.approved}</span>
                                                <span className="text-bold text-warning m-2">{kycDetails.level_0.pending}</span>
                                                <span className="text-bold text-danger m-2">{kycDetails.level_0.rejected}</span>
                                            </>
                                        }
                                        invert={false}
                                    />
                                </Col>
                                <Col xs={12} lg={3}>
                                    <Common.Widget
                                        icon="li-user-lock"
                                        title="Level 1"
                                        informer={
                                            <>
                                                <span className="text-bold text-success m-2">{kycDetails.level_1.approved}</span>
                                                <span className="text-bold text-warning m-2">{kycDetails.level_1.pending}</span>
                                                <span className="text-bold text-danger m-2">{kycDetails.level_1.rejected}</span>
                                            </>
                                        }
                                        invert={false}
                                    />
                                </Col>
                                <Col xs={12} lg={3}>
                                    <Common.Widget
                                        icon="li-user-minus"
                                        title="Level 2"
                                        informer={
                                            <>
                                                <span className="text-bold text-success m-2">{kycDetails.level_2.approved}</span>
                                                <span className="text-bold text-warning m-2">{kycDetails.level_2.pending}</span>
                                                <span className="text-bold text-danger m-2">{kycDetails.level_2.rejected}</span>
                                            </>
                                        }
                                        invert={false}
                                    />
                                </Col>
                                <Col xs={12} lg={3}>
                                    <Common.Widget
                                        icon="li-user-minus"
                                        title="Level 3"
                                        informer={
                                            <>
                                                <span className="text-bold text-success m-2">{kycDetails.level_3.approved}</span>
                                                <span className="text-bold text-warning m-2">{kycDetails.level_3.pending}</span>
                                                <span className="text-bold text-danger m-2">{kycDetails.level_3.rejected}</span>
                                            </>
                                        }
                                        invert={false}
                                    />
                                </Col>
                            </Row>
                        </Col>
                    </div> */}
                    <Card>
                        <Common.Widget
                            icon="li-users"
                            title="KYC Members"
                            subtitle={`Total pending ${members.length}`}
                            wrapperClass="widget--items-middle"
                        />
                        <CardBody className="padding-botton-0">
                            <KYC.KYCList members={members} filteredMembers={filteredMembers} setFilteredMembers={setFilteredMembers} />
                        </CardBody>
                    </Card></>
            }
        </AuthLayout>
    );
}
