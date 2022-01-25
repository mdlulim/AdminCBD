import React, { useState, useMemo} from 'react';
import { Card, CardBody, Col, Row } from 'reactstrap';
import { AuthLayout } from 'containers';
import { Common, Transactions } from 'components';
import { AccountService } from '../../providers'

const Filter = () => {
    const [show, setShow]= useState(false);
    return (
        <>
            <Common.Dropdown
                actions={[
                    { label: 'Filter by Date Range' },
                    { label: 'Filter by Date' },
                    { label: 'Filter Month' },
                    { label: 'Filter Year' }
                ]}
            />
            <button
                className="btn d-none d-md-block float-right margin-right-5"
                id="dashboard-rp-customrange"
                onClick={e => {
                    setShow(true);
                  }}
            >
                Transfer
            </button>
        </>
    );
}

export default function DebitCredit(props) {
    const [mainAccount, setMainAccount] = useState({});
    const [pageLoading, setPageLoading] = useState(true);
    const [processing, setProcessing] = useState(false);

    async function fetchData() {
        const res = await AccountService.getMainAccount();
        setMainAccount(res);
        setPageLoading(false);
    }


    useMemo(() => {
        fetchData()

      }, []);

    return (
        <AuthLayout
            {...props}
            loading={pageLoading}
            breadcrumb={{ active: "Debit/Credit" }}
            pageHeading={{
                title: 'Debit/Credit',
                caption: 'EXPLORE OVERVIEW DEBIT/CREDIT FOR CRYPTO BASED INNOVATION',
                actions: <Filter />
            }}
        >
             {!pageLoading &&
                    <Card id="reports">
                        <Common.Widget
                            icon="li-wallet"
                            title="Debit Or Credit"
                            subtitle="User Account"
                            wrapperClass="widget--items-middle"
                        />
                        <hr className="margin-top-0 margin-bottom-0" />
                        <Transactions.DebitCredit />
                    </Card>}
        </AuthLayout>
    );
}