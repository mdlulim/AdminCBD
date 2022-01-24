import React, { useState, useMemo } from 'react';
import { Card, CardBody } from 'reactstrap';
import { Common, Products } from 'components';
import { ProductService } from 'providers';
import { AuthLayout } from 'containers';

export default function ProductSubCategories(props) {
    const [pageLoading, setPageLoading] = useState(true);
    const [subCategories, setSubCategories] = useState([]);
    const [filteredSubCategories, setFilteredSubCategories] = useState([]);
  
    async function fetchData() {
        const subcategories = await ProductService.getProductSubCategories();
        setFilteredSubCategories(subcategories.results || []);
        setSubCategories(subcategories.results || []);
        setPageLoading(false);
    }
  
    useMemo(() => {
        fetchData();
    }, []);

    const onSearchFilter = val => {
        const filteredItems = subCategories.filter(item => (
            (item && item.title && item.title.toLowerCase().includes(val.toLowerCase())) ||
            (item && item.description && item.description.toLowerCase().includes(val.toLowerCase())) ||
            (item && item.code && item.code.toLowerCase().includes(val.toLowerCase()))
        ));
        setFilteredSubCategories(filteredItems);
    }

    return (
        <AuthLayout
            {...props}
            breadcrumb={{
                items: [{
                    title: 'Dashboard', link: '/dashboard'
                }, {
                    title: 'Products', link: '/products'
                }],
                active: 'Sub-Categories'
            }}
            loading={pageLoading}
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
                    <div className="card-title border-bottom d-flex align-items-center m-0 padding-bottom-20">
                        <div>&nbsp;</div>
                        <span className="flex-grow-1" />
                        <input
                            type="text"
                            name="search"
                            className={`form-control form-control-m`}
                            placeholder="Search..."
                            onKeyUp={e => onSearchFilter(e.target.value)}
                            style={{
                                width: '30%',
                                marginRight: '20px'
                            }}
                        />
                    </div>
                    <Products.SubCategories
                        data={filteredSubCategories}
                    />
                </CardBody>
            </Card>
        </AuthLayout>
    );
} 
