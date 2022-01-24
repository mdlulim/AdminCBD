import React from 'react';
import { Card, CardBody } from 'reactstrap';
import { Common, Products } from 'components';
import { AuthLayout } from 'containers';

export default function UpdateSubCategory(props) {
    return (
        <AuthLayout
            {...props}
            breadcrumb={{
                items: [
                    { title: 'Dashboard', link: '/dashboard' },
                    { title: 'Products', link: '/products' },
                    { title: 'Sub-Categories', link: '/products/subcategories' }
                ],
                active: 'Update'
            }}
            pageHeading={{
                title: 'Update Subcategory Configuration',
                caption: 'EXPLORE SUBCATEGORY UPDATE CONFIGURATION FOR CRYPTO BASED INNOVATION',
            }}
        >
            <Card>
                <Common.Widget
                    icon="li-layers"
                    title="Update Subcategory"
                    wrapperClass="widget--items-middle"
                />
                <CardBody className="padding-botton-0">
                    <Products.UpdateSubCategory />
                </CardBody>
            </Card>
        </AuthLayout>
    );
} 
