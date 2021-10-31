import React from 'react';
import { Row, Col } from 'react-bootstrap';
import { itemType } from '../App';
import ProductItem from '../ProductItem/ProductItem';

type props = {
    products: itemType[];
}
const Products: React.FC<props> = ({ products }) => {
    return (
        <div>
            <Row>
            {products.map((product)=><Col key={product.id} xs={12} sm={6} md={4} lg={3} style={{marginTop:"30px"}}><ProductItem product={product}/> </Col>)}
            </Row>
        </div>
    )
}

export default Products
