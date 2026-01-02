import React, { useState } from 'react';
import { TabContent, TabPane, Nav, NavItem, NavLink, Row, Col } from 'reactstrap';
import classnames from 'classnames';


const ProductTabs = ({ product }) => {
    const [activeTab, setActiveTab] = useState('1');

    const toggle = tab => {
        if (activeTab !== tab) setActiveTab(tab);
    }

    const SubmitHandler = (e) => {
        e.preventDefault()
    }



    return (
        <div className="row">
            <div className="col col-xs-12">
                <div className="product-info">
                    <Nav tabs>
                        <NavItem>
                            <NavLink
                                className={classnames({ active: activeTab === '1' })}
                                onClick={() => { toggle('1'); }}
                            >
                                Description
                            </NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink
                                className={classnames({ active: activeTab === '2' })}
                                onClick={() => { toggle('2'); }}
                            >
                                Additional Information
                            </NavLink>
                        </NavItem>
                    </Nav>
                    <TabContent activeTab={activeTab}>
                        <TabPane tabId="1">
                            <Row>
                                <Col sm="12">
                                    <div id="Schedule">
                                        {product?.description ? (
                                            <p style={{ lineHeight: '1.8', fontSize: '16px' }}>
                                                {product.description}
                                            </p>
                                        ) : (
                                            <p>No description available for this product.</p>
                                        )}

                                        {product?.short_description && (
                                            <p style={{
                                                marginTop: '20px',
                                                padding: '15px',
                                                background: 'rgba(245, 240, 232, 0.5)',
                                                borderRadius: '8px',
                                                fontStyle: 'italic'
                                            }}>
                                                {product.short_description}
                                            </p>
                                        )}
                                    </div>
                                </Col>
                            </Row>
                        </TabPane>
                        <TabPane tabId="2">
                            <Row>
                                <Col sm="12">
                                    <div className="additional-info" style={{ padding: '20px 0' }}>
                                        <table style={{
                                            width: '100%',
                                            borderCollapse: 'separate',
                                            borderSpacing: 0
                                        }}>
                                            <tbody>
                                                <tr style={{
                                                    background: 'rgba(245, 240, 232, 0.3)',
                                                    borderBottom: '1px solid rgba(27, 27, 27, 0.1)'
                                                }}>
                                                    <td style={{
                                                        padding: '15px 20px',
                                                        fontWeight: '600',
                                                        width: '30%'
                                                    }}>
                                                        Category
                                                    </td>
                                                    <td style={{ padding: '15px 20px' }}>
                                                        {product?.category || 'N/A'}
                                                    </td>
                                                </tr>
                                                {product?.sku && (
                                                    <tr style={{
                                                        borderBottom: '1px solid rgba(27, 27, 27, 0.1)'
                                                    }}>
                                                        <td style={{
                                                            padding: '15px 20px',
                                                            fontWeight: '600'
                                                        }}>
                                                            SKU
                                                        </td>
                                                        <td style={{ padding: '15px 20px' }}>
                                                            {product.sku}
                                                        </td>
                                                    </tr>
                                                )}
                                                <tr style={{
                                                    background: 'rgba(245, 240, 232, 0.3)',
                                                    borderBottom: '1px solid rgba(27, 27, 27, 0.1)'
                                                }}>
                                                    <td style={{
                                                        padding: '15px 20px',
                                                        fontWeight: '600'
                                                    }}>
                                                        Price
                                                    </td>
                                                    <td style={{ padding: '15px 20px' }}>
                                                        ${product?.price ? parseFloat(product.price).toFixed(2) : 'N/A'} per rental
                                                    </td>
                                                </tr>
                                                <tr style={{
                                                    borderBottom: '1px solid rgba(27, 27, 27, 0.1)'
                                                }}>
                                                    <td style={{
                                                        padding: '15px 20px',
                                                        fontWeight: '600'
                                                    }}>
                                                        Availability
                                                    </td>
                                                    <td style={{ padding: '15px 20px' }}>
                                                        {product?.quantity_available > 0 ? (
                                                            <span style={{ color: '#34c759', fontWeight: '600' }}>
                                                                {product.quantity_available} units available
                                                            </span>
                                                        ) : (
                                                            <span style={{ color: '#ff3b30', fontWeight: '600' }}>
                                                                Out of stock
                                                            </span>
                                                        )}
                                                    </td>
                                                </tr>
                                                {product?.tags && product.tags.length > 0 && (
                                                    <tr style={{
                                                        background: 'rgba(245, 240, 232, 0.3)'
                                                    }}>
                                                        <td style={{
                                                            padding: '15px 20px',
                                                            fontWeight: '600'
                                                        }}>
                                                            Tags
                                                        </td>
                                                        <td style={{ padding: '15px 20px' }}>
                                                            {product.tags.join(', ')}
                                                        </td>
                                                    </tr>
                                                )}
                                            </tbody>
                                        </table>
                                    </div>
                                </Col>
                            </Row>
                        </TabPane>
                    </TabContent>
                </div>
            </div>
        </div>
    );
}

export default ProductTabs;