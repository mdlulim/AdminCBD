import React, { useEffect, useState } from 'react';
import { Card, CardBody, Col } from 'reactstrap';
import { Common, Products } from 'components';
import { AuthLayout } from 'containers';
import { ProductService } from 'providers';
import useForm from 'react-hook-form';

export default function ProductCancellationsPage(props) {
    const { register, handleSubmit, reset } = useForm();
    const [filteredCancellations, setFilteredCancellations] = useState([]);
    const [cancellations, setCancellations] = useState([]);
    const [pageLoading, setPageLoading] = useState(true);
    const [products, setProducts] = useState([]);

    async function fetchData() {
        const products = await ProductService.getProducts();
        const cancellations = await ProductService.getProductCancellations();
        setFilteredCancellations(cancellations.results || []);
        setCancellations(cancellations.results || []);
        setProducts(products.results || []);
        setPageLoading(false);
    }

    useEffect(() => {
        fetchData();
    }, []);

    function onSubmit(data) {
        handleFilter(data);
    }

    function handleFilter(data) {
        const {
            search,
            status,
            product_id,
        } = data;
        if (search.length === 0 && status.length === 0 && product_id.length === 0) {
            return setFilteredCancellations(cancellations);
        }

        const filteredData = cancellations.filter(item => {
            let filter = true;
            filter = (
                item.user.first_name.toLowerCase().includes(search.toLowerCase()) ||
                item.user.last_name.toLowerCase().includes(search.toLowerCase()) ||
                item.user.referral_id.includes(search)
            );
            if (status.length > 0) {
                filter = item.cancellation_status.toLowerCase() === status.toLowerCase();
            }
            if (product_id.length > 0) {
                filter = item.product_id === product_id;
            }
            return filter;
        });
        setFilteredCancellations(filteredData);
    }

    function handleClearFilters() {
        reset();
        setFilteredCancellations(cancellations);
    }

    return (
        <AuthLayout
            {...props}
            loading={pageLoading}
            breadcrumb={{
                items: [{ title: 'Dashboard', link: '/dashboard' }, { title: 'Products', link: '/products' }],
                active: "Cancellations"
            }}
            pageHeading={{
                title: 'Product Cancellations',
                caption: 'EXPLORE PRODUCTS CANCELLATIONS FOR CRYPTO BASED INNOVATION',
            }}
        >
            {!pageLoading &&
            <Card id="users">
                <Common.Widget
                    icon="li-layers-crossed"
                    title="Product Cancellation Requests"
                    subtitle="List of all user product cancellation requests"
                    wrapperClass="widget--items-middle"
                />
                <CardBody>
                    <form
                        noValidate
                        role="form"
                        autoComplete="off"
                        className="text-start"
                        onSubmit={handleSubmit(onSubmit)}
                    >
                        <div className="form-row">
                            <Col xs={6} lg={4}>
                                <input
                                    type="text"
                                    id="search"
                                    name="search"
                                    className="form-control form-control-m"
                                    placeholder="Filter by member's name..."
                                    ref={register({ required: false })}
                                />
                            </Col>
                            <Col xs={6} lg={2}>
                                <select
                                    type="text"
                                    id="product_id"
                                    name="product_id"
                                    className="form-control"
                                    ref={register({ required: false })}
                                >
                                    <option value="">Filter by Product</option>
                                    {products.map(item => (
                                        <option key={item.id} value={item.id}>
                                            {item.title} ({item.product_code})
                                        </option>
                                    ))}
                                </select>
                            </Col>
                            <Col xs={6} lg={2}>
                                <select
                                    id="status"
                                    type="text"
                                    name="status"
                                    className="form-control"
                                    ref={register({ required: false })}
                                >
                                    <option value="">Filter by Status</option>
                                    <option value="Pending">Pending</option>
                                    <option value="Complete">Complete</option>
                                    <option value="Rejected">Rejected</option>
                                </select>
                            </Col>
                            <Col xs={6} lg={4}>
                                <button
                                    type="submit"
                                    className="btn btn-secondary"
                                >
                                    <i className="fa fa-search margin-right-10" />
                                    Search
                                </button>
                                <button
                                    type="button"
                                    className="btn btn-link text-primary"
                                    onClick={() => handleClearFilters()}
                                >
                                    Clear Filter
                                </button>
                            </Col>
                        </div>
                    </form>
                </CardBody>
                <hr className="margin-top-0 margin-bottom-0" />
                <Products.Cancellations
                    data={filteredCancellations}
                />
            </Card>}
        </AuthLayout>
    );
} 
