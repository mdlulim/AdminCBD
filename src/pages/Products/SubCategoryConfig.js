import React, { useEffect, useState } from 'react';
import { Card, CardBody, CardHeader } from 'reactstrap';
import { Common, Products } from 'components';
import { AuthLayout } from 'containers';
import { ProductService } from 'providers';
import moment from 'moment';

export default function SubCategoryConfigurations(props) {
    const { match } = props;
    const { params } = match;
    const { id } = params;
    const [step, setStep] = useState(2);
    const [currency, setCurrency] = useState(null);
    const [subcategory, setSubcategory] = useState(null);
    const [pageLoading, setPageLoading] = useState(true);
    const [calcHistory, setCalcHistory] = useState(null);
    const [todayCalculated, setTodayCalculated] = useState(false);

    async function fetchData() {
        const subcategory = await ProductService.getProductSubcategory(id);
        const calcHistory = await ProductService.getSubcategoryCalculations(id);
        if (calcHistory && calcHistory.results) {
            let calculated = false;
            let currency = null;
            calcHistory.results.map(item => {
                calculated = (moment().format('YYYY-MM-DD') === moment(item.date).format('YYYY-MM-DD'));
                if (!currency) {
                    currency = item.currency;
                }
            });
            setCurrency(currency);
            setCalcHistory(calcHistory.results);
            setTodayCalculated(calculated);
        }
        setSubcategory(subcategory);
        setPageLoading(false);
    }

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <AuthLayout
            {...props}
            breadcrumb={{
                items: [
                    { title: 'Dashboard', link: '/dashboard' },
                    { title: 'Products', link: '/products' },
                    { title: 'Sub-Categories', link: '/products/subcategories' }
                ],
                active: subcategory ? subcategory.title : 'Configurations'
            }}
            loading={pageLoading}
            pageHeading={{
                title: `${subcategory ? subcategory.title : ''} Configurations`,
                caption: 'EXPLORE SUBCATEGORY CONFIGURATION FOR CRYPTO BASED INNOVATION',
            }}
        >
            {!pageLoading &&
            <Card>
                <Common.Widget
                    icon="li-cog"
                    title={`${subcategory.title} Configurations`}
                    subtitle={`Use the form below to configure settings for the ${subcategory.title}`}
                    wrapperClass="widget--items-middle"
                />
                <div className="wizard margin-bottom-0">
                    <CardHeader>
                        <ul className="nav nav-tabs card-header-tabs">
                            <li className="nav-item">
                                <a
                                    href="/"
                                    className={`nav-link ${step === 1 ? 'active selected' : 'done'}`}
                                    onClick={e => {
                                        e.preventDefault();
                                        setStep(1);
                                    }}
                                >
                                   <strong>{subcategory.title} Indicators</strong>
                                </a>
                            </li>
                            <li className="nav-item">
                                <a
                                    href="/"
                                    className={`nav-link ${step === 2 ? 'active selected' : 'done'}`}
                                    onClick={e => {
                                        e.preventDefault();
                                        setStep(2);
                                    }}
                                >
                                   <strong>{subcategory.title} Calculations</strong>
                                </a>
                            </li>
                        </ul>
                    </CardHeader>
                </div>
                <CardBody>
                    <div className="stepContainer margin-top-0">
                        {step === 1 &&
                        <Products.Indicators
                            {...subcategory}
                            fetchData={fetchData}
                            setPageLoading={setPageLoading}
                        />}
                        {step === 2 &&
                        <Products.Calculations
                            {...subcategory}
                            currency={currency}
                            history={calcHistory}
                            fetchData={fetchData}
                            setPageLoading={setPageLoading}
                            todayCalculated={todayCalculated}
                        />}
                    </div>
                </CardBody>
            </Card>}
        </AuthLayout>
    );
} 
