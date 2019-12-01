import React from 'react';
import {Row, Col, Typography, Button} from 'antd';
import {FaPizzaSlice} from 'react-icons/fa';

export default({
    children,
    items,
    addSlice,
    reduceSlice,
    ...props
}) => (items.map((item, i) => (
    <Row className="item" key={i}>
        <Col span={17} className="name">
            <FaPizzaSlice size={40}/>
            <Typography.Title level={4}>{item.item}</Typography.Title>
        </Col>
        <Col span={7}>
            <Row className="quantity">
                <Col span={8}>
                    <Button
                        onClick={() => {
                        reduceSlice(i)
                    }}
                        shape="circle"
                        size="small">-</Button>
                </Col>
                <Col span={8}>
                    <Typography.Title level={3}>{item.slice}</Typography.Title>
                </Col>
                <Col span={8}>
                    <Button
                        onClick={() => {
                        addSlice(i)
                    }}
                        style={{
                        paddingTop: '2px'
                    }}
                        shape="circle"
                        size="small">+</Button>
                </Col>
            </Row>
        </Col>
    </Row>
)))