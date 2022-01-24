import React, {useState, useMemo} from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { Card, CardBody, Col, Row } from 'reactstrap';
import { Common, Settings, ProductConfig } from 'components';
import { AuthLayout } from 'containers';
import { ProductService } from '../../providers';


export default function ProductConfiguration(props) {
    const [activeTab, setActiveTab] = useState('general');

    const toggleTab = (e, tab) => {
        e.preventDefault();
        setActiveTab(tab);
    };
    return (
        <AuthLayout
            {...props}
            breadcrumb={{
                items: [{ title: 'Dashboard', link: '/dashboard' }],
                active: "Update Subcategory Configuration"
            }}
            pageHeading={{
                title: 'Update Subcategory Configuration',
                caption: 'EXPLORE SUBCATEGORY UPDATE CONFIGURATION FOR CRYPTO BASED INNOVATION',
            }}
        >
            <Card>
                <Common.Widget
                    icon="li-cog"
                    title="Update Subcategory"
                    wrapperClass="widget--items-middle"
                />
                <CardBody className="padding-botton-0">
                    <ProductConfig.SubCategoryUpdate />
                </CardBody>
            </Card>
        </AuthLayout>
    );
} 
