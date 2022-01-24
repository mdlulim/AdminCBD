import React, { useState } from 'react';
import { Card, CardBody, Col, Row } from 'reactstrap';
import { Common, ProductConfig } from 'components';
import { AuthLayout } from 'containers';


export default function ProductSubCategories(props) {
    return (
        <AuthLayout
            {...props}
            breadcrumb={{
                items: [{
                    title: 'Dashboard', link: '/dashboard'
                }, {
                    title: 'Products', link: '/products'
                }],
                active: "Sub-Categories"
            }}
            pageHeading={{
                title: 'Manage Product Sub-Categories',
                caption: 'EXPLORE PRODUCT CONFIGURATION FOR CRYPTO BASED INNOVATION',
            }}
        >
            <Card className="border-0">
                <Common.Widget
                    icon="li-layers"
                    title="Product Sub-Categories"
                    subtitle="List of all product sub-categories"
                    wrapperClass="widget--items-middle"
                />
                <CardBody className="pl-0 pr-0 pb-0 border-0">
                    <ProductConfig.SubCategoryOverview />
                </CardBody>
            </Card>
        </AuthLayout>
    );
} 
