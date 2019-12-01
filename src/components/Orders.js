import React, {Component} from 'react';
import {
    Card,
    Typography,
    List,
    Comment,
    Skeleton
} from 'antd';
import {Subscription} from 'react-apollo';
import {SUBSCRIPTION_ORDERS } from '../queries';
import {FaPizzaSlice} from 'react-icons/fa';

class Orders extends Component {
    constructor(props) {
        super(props);

        this.state = {};
    }

    componentDidMount() { }
    
    onCompleteQueryOrders = (data) => {
        this.setState({ orders: data.orders });
    }

    onCompleteSubscriptionOrders = (data) => {
        this.setState({ orders: data.payload.data.orders });
    }

    render() {
        return (
            <Card style={{
                minHeight: 500
            }}>
                <Typography.Title level={2}>
                    Orders
                </Typography.Title>
                <Subscription subscription={SUBSCRIPTION_ORDERS}>
                    {({loading, error, data}) => {
                        if (loading) 
                            return (
                                <div>
                                    <Skeleton active/>
                                    <Skeleton active/>
                                    <Skeleton active/>
                                </div>
                            )
                        if (error)
                            return (
                                alert(error)
                        )
                        return (
                            <div style={{
                                maxHeight: '100vh',
                                overflow: 'auto'
                            }}>
                                {data.orders.map(order => (
                                    order.order_items.length ? (
                                        <Comment
                                            key={order.id}
                                            author={
                                                <Typography.Text>{`Order ${order.id}`}</Typography.Text>
                                            }
                                        avatar={<FaPizzaSlice />}
                                        content={
                                            <List
                                                className="orders"
                                                dataSource={order.order_items}
                                                renderItem={item => (
                                                <List.Item>
                                                    <Typography.Text mark>
                                                        {` ${item.pieces} ${item.pizza} `}
                                                        {item.excess > 0 && (`(${item.excess} excess slices)`)}
                                                    </Typography.Text>
                                                </List.Item>
                                            )}/>
                                        }
                                        />
                                    ) : ''
                                ))
}

                            </div>
                        )
                    }}
                    </Subscription>
            </Card>
        )
    }
}

export default Orders;
