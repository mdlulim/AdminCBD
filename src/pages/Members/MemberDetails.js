import React, { useMemo, useRef, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { Card, CardBody, Col, Row } from 'reactstrap';
import { Rating, RatingView } from 'react-simple-star-rating'
import { MemberService } from '../../providers';
import { AuthLayout } from 'containers';
import { Members, Transactions, Products, KYC } from 'components';
import { KYCService, SessionProvider } from '../../providers';
    
const Status = ({ status }) => {
    let badge = 'primary';
    if (status === 'Pending') {
      badge = 'warning';
    }
    if (status === 'Active') {
      badge = 'success';
    }
    if (status === 'Blocked') {
      badge = 'danger';
    }
    return (
      // <span className={`badge badge-${badge}`}>{status}</span>
      <div className={`btn btn-outline-${badge} btn-block disabled btn-sm`}>{status}</div>
    );
  };

const MemberDetails = props => {
    const breadcrumb = { heading: "Member Details" };
    const [activeTab, setActiveTab] = useState('kyc');
    const [member, setMember] = useState({});
    const [pageLoading, setPageLoading] = useState(true);
    const [wallet, setWallet] = useState({});
    const [address, setAddress] = useState({});
    const [kycDetails, setkycDetails] = useState({});
    const [rating, setRating] = useState(0);
    const [walletID, setWalletID] = useState(null);
    const [adminLevel, setAdminLevel] = useState(0)
    const params = useParams();
    const { id } = params;
    const [ kycLevel, setKycLevel] = useState(null);

    async function fetchData(){
        const member = await MemberService.getMember(id);
            setMember(member);
            console.log(member)

        const walletDetails = await MemberService.getMemberWallet(id);
            setWallet(walletDetails);
            setWalletID(walletDetails.id);

            const memberAddress = await MemberService.getMemberAddress(id);
                const address = memberAddress.results;
                setAddress(address[address.length - 1]);

            //Get member details
            await KYCService.getkycLlevel(id).then((res) => {
                setKycLevel(res.data.data.kyc_level)
                //console.log(res.data.data)
                if(res.data.data.kyc_level != -1){
                    setRating(res.data.data.kyc_level);
                }
            })

            await MemberService.getMemberKYC(id).then(res=>{
                    setkycDetails(res.data.data)
                // console.log(res.data.data)
            })

            setPageLoading(false);
    }

    useState(() => {
        //Get member details
        if (SessionProvider.isValid()) {
            const user = SessionProvider.get();
             setAdminLevel(user.permission_level)
         }
         fetchData();
    }, [
        setPageLoading,
    ]);


    const toggleTab = (e, tab) => {
        e.preventDefault();
        setActiveTab(tab);
    };

    // const numRows = address.length

    return (
        <AuthLayout
            {...props}
            loading={pageLoading}
            breadcrumb={{ active: "Member Details" }}
            pageHeading={{
                title: 'Member Details',
                caption: 'EXPLORE OVERVIEW MEMBER DETAILS FOR CRYPTO BASED INNOVATION'
            }}
        >
            <Row>
                <Col md={12} lg={4} xl={4}>
                    <Card className="o-hidden author-box" style={{ minHeight: 300 }}>
                        <CardBody>

                            {member ?
                                <div className="author-box-center mt-3">
                                    <img
                                        alt={member.first_name}
                                        src={require("images/1.jpeg")}
                                        className="rounded-circle author-box-picture"
                                    />
                                    <div className="clearfix"></div>
                                    <div className="author-box-name mt-3">
                                        <h4 className="text-primary mt-0 mb-1">{member.first_name} {member.last_name}</h4>
                                        {/* < span className={wallet.balance > 0 ? 'text-success' :'text-danger'} >
                                                Balance: {wallet.currency_code} {wallet.balance}
                                            </span><br /> */}
                                            < span className={wallet.available_balance > 0 ? 'text-success' :'text-danger'}>
                                                Available Balance: {wallet.currency_code} {parseFloat(wallet.available_balance).toFixed(4)}<br />
                                            </span>
                                            Wallet ID : { adminLevel === 5 ? walletID: walletID ? '........'+walletID.slice(walletID.length - 5): ''}
                                        </div>
                                        <div className="author-box-job">
                                            <table>
                                                <tbody>
                                                <tr><td>ID/Passport No </td><td> : {member.id_number}</td></tr>
                                                <tr><td>Phone </td><td> : {member.mobile}</td></tr>
                                                <tr><td>Email </td><td> :<a href={`mailto:${member.email}`}>{member.email}</a></td></tr>
                                                <tr><td>KYC Level </td><td> : {kycLevel === -1?'unAssigned':kycLevel}</td></tr>
                                                <tr><td>Type </td><td> : {member.group ? member.group.label : 'Member'}</td></tr>
                                                <tr><td>Status </td><td><Status {...member} /></td></tr>
                                        </tbody>
                                            </table>
											<hr />
                                            <Rating ratingValue={rating} />
                                            <hr />
											<strong>Address</strong>
											{address ?
                                                <p>
                                                    {address.city}, {address.country} &nbsp;
                                                    <br />
                                                    {/* {addresses.province || ''}&nbsp;
                                                    {addresses.postalCode || ''} */}
                                            </p> : <p> <br />Address not provided</p>}
                                    </div>
                                </div>
                                : ''}
                        </CardBody>
                    </Card>
                </Col>
                <Col md={12} lg={8} xl={8}>
                    <Card>
                        <CardBody>
                            <ul className="nav nav-tabs nav-tabs__round mt-0">
                                <li className="nav-item">
                                    <a
                                        className={`nav-link show ${activeTab === 'referals' ? 'active' : ''}`}
                                        onClick={e => toggleTab(e, 'referals')}
                                        data-toggle="tab"
                                        href="/"
                                    >
                                        Referrals
                                    </a>
                                </li>
                                <li className="nav-item">
                                    <a
                                        className={`nav-link show ${activeTab === 'products' ? 'active' : ''}`}
                                        onClick={e => toggleTab(e, 'products')}
                                        data-toggle="tab"
                                        href="/"
                                    >
                                        Products
                                    </a>
                                </li>
                                <li className="nav-item">
                                    <a
                                        className={`nav-link show ${activeTab === 'transactions' ? 'active' : ''}`}
                                        onClick={e => toggleTab(e, 'transactions')}
                                        data-toggle="tab"
                                        href="/"
                                    >
                                        Transactions
                                    </a>
                                </li>
                                <li className="nav-item">
                                    <a
                                        className={`nav-link show ${activeTab === 'banking-details' ? 'active' : ''}`}
                                        onClick={e => toggleTab(e, 'banking-details')}
                                        data-toggle="tab"
                                        href="/"
                                    >
                                        Banking Details
                                    </a>
                                </li>
                                <li className="nav-item">
                                    <a
                                        className={`nav-link show ${activeTab === 'kyc' ? 'active' : ''}`}
                                        onClick={e => toggleTab(e, 'kyc')}
                                        data-toggle="tab"
                                        href="/"
                                    >
                                        KYC
                                    </a>
                                </li>
                            </ul>
                            <div className="tab-content">
                                <div role="tabpanel" className={`tab-pane show ${activeTab === 'referals' ? 'active' : ''}`}>
                                    <CardBody className="pl-0 pr-0 pb-0">
                                        <Members.Referals member={member} />
                                    </CardBody>
                                </div>
                                <div role="tabpanel" className={`tab-pane show ${activeTab === 'products' ? 'active' : ''}`}>
                                    <div className="profile-setting__card">
                                        <CardBody className="pl-0 pr-0 pb-0">
                                            <Products.ProductsByMember member={member} />
                                        </CardBody>
                                    </div>
                                </div>
                                <div role="tabpanel" className={`tab-pane show ${activeTab === 'transactions' ? 'active' : ''}`}>
                                    <div className="profile-setting__card">
                                        <CardBody className="pl-0 pr-0 pb-0">
                                            <Transactions.TransactionsByMember member={member} userWallet={wallet}/>
                                        </CardBody>
                                    </div>
                                </div>
                                <div role="tabpanel" className={`tab-pane show ${activeTab === 'banking-details' ? 'active' : ''}`}>
                                    <div className="profile-setting__card">
                                        <CardBody className="pl-0 pr-0 pb-0">
                                            <Members.BankDetails member={member} />
                                        </CardBody>
                                    </div>
                                </div>
                                <div role="tabpanel" className={`tab-pane show ${activeTab === 'kyc' ? 'active' : ''}`}>
                                    <div className="profile-setting__card">
                                        <CardBody className="pl-0 pr-0 pb-0">
                                            <KYC.KYC member={member} address={address} kycDetails={kycDetails} setPageLoading={setPageLoading}/>
                                        </CardBody>
                                    </div>
                                </div>
                            </div>
                        </CardBody>
                    </Card>
                </Col>
            </Row>

        </AuthLayout>
    );
};

export default MemberDetails;
