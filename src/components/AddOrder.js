import React, {Component} from 'react';
import {Card, Typography, Row, Col, Button, message} from 'antd';
import {Mutation} from 'react-apollo';
import {MUTATION_ORDER} from '../queries';
import AddItem from './AddItem';
import List from './List';
import ConfirmOrder from './ConfirmOrder';

class AddOrder extends Component {
    constructor(props) {
        super(props);
        this.state = {
            items: [],
            isAddItem: false,
            tempPizza: '',
            numberOfPizza: 0,
            excess: 0,
            confirmOrder: false,
            orderId: ''
        };
        this.maxSlice = 8;
    }

    componentDidMount() {}

    addSlice = (index) => {
        const {items} = this.state;
        items[index].slice += 1;
        this.setState({items});
    };

    reduceSlice = (index) => {
        const {items} = this.state;
        items[index].slice > 1
            ? items[index].slice -= 1
            : delete items[index];
        this.setState({items});
    }

    onPizzaChange = (value) => {
        this.setState({tempPizza: value});
    }

    onAddItem = () => {
        this.setState({isAddItem: true});
    }

    onCancelAddItem = () => {
        this.setState({isAddItem: false});
    }

    onCancelConfirmOrder = () => {
        this.setState({confirmOrder: false});
    }

    onConfirmSubmitOrder = (e, order) => {
        const {items, numberOfPizza, excess} = this.state;
        const slices = items.reduce((count, obj) => {
            return count + obj.slice;
        }, 0);
        let order_items = [];
        items.map(item => { 
            order_items.push({pizza: item.item, slices: item.slice, pieces: item.summary.numberOfPizza, excess: item.summary.excess});
        });

        if (items.length > 0) {
            order({
                variables: {
                    order_pizzas: numberOfPizza,
                    order_excess: excess,
                    order_slices: slices,
                    order_items: order_items
                }
            });
        }
    }

    onSearchPizza = (value) => {
        this.setState({tempPizza: value});
    }

    onAddItemSubmit = () => {
        let {items, tempPizza} = this.state;
        let found = false;
        if (tempPizza) {
            items.forEach(item => {
                if (item.item === tempPizza) {
                    found = true;
                    item.slice += 1;
                    return;
                }
            })
            if (!found) 
                items.unshift({item: tempPizza, slice: 1});
            
            this.setState({items: items, isAddItem: false, tempPizza: ''});
        }
    }

    onSubmitOrder = () => {
        let {items} = this.state;
        let numberOfPizza1 = 0;
        let excess1 = 0;
        items.forEach(item => {
            const numberOfPizza = Math.ceil(item.slice / this.maxSlice);
            const excess = item.slice % this.maxSlice === 0
                ? 0
                : this.maxSlice - (item.slice % this.maxSlice);
            item.summary = {
                numberOfPizza: numberOfPizza,
                excess: excess
            };
            numberOfPizza1 += numberOfPizza;
            excess1 += excess;
        });
        this.setState({confirmOrder: true, items: items, numberOfPizza: numberOfPizza1, excess: excess1});
    }

    onAddOrderSuccess = (order) => {
         message.success(`Successfully added the order ${order.insert_orders.returning[0].id}`);
        this.setState({ items: [], tempPizza: '', numberOfPizza: 0, excess: 0, confirmOrder: false });
    }

    render() {
        const {items, isAddItem, tempPizza, confirmOrder, numberOfPizza} = this.state;
        const total = items.reduce((count, obj) => {
            return count + obj.slice;
        }, 0);
        let pizzas = items.map(({item}) => item);
        if (typeof(pizzas) != 'array') 
            pizzas = [];
        if (tempPizza) 
            pizzas = [
                tempPizza, ...pizzas
            ];
        
        return (
            <Mutation mutation={MUTATION_ORDER} onCompleted={this.onAddOrderSuccess}>
                {(order, { error, data, loading}) => {
                    if (error) 
                        alert('Something went wrong');
                    return (
                        <Card className="ordering-list">
                            {isAddItem && (<AddItem
                                dataSource={pizzas}
                                onSearch={this.onSearchPizza}
                                visible={isAddItem}
                                onChange={this.onPizzaChange}
                                onOk={this.onAddItemSubmit}
                                onCancel={this.onCancelAddItem}/>)
}
                            {confirmOrder && (<ConfirmOrder
                                items={items}
                                visible={confirmOrder}
                                onCancel={this.onCancelConfirmOrder}
                                loading={loading}
                                numberOfPizza={numberOfPizza}
                                onOk={(e) => {
                                this.onConfirmSubmitOrder(e, order)
                            }}/>)}
                            <Typography.Title level={2}>
                                Ordering List
                            </Typography.Title>
                            
                            <Row className="order-list-header">
                                <Col span={17}>item</Col>
                                <Col
                                    span={7}
                                    style={{
                                    textAlign: 'center'
                                }}>slice</Col>
                            </Row>
                            <div className="order-items">
                                <List items={items} addSlice={this.addSlice} reduceSlice={this.reduceSlice}/>
                                <Row>
                                    <Col span={17}></Col>
                                    <Col
                                        span={7}
                                        style={{
                                        textAlign: 'center'
                                    }}>
                                        <div className="total-slices">
                                            <Typography.Title level={3}>
                                                {total}
                                            </Typography.Title>
                                        </div>
                                    </Col>
                                </Row>
                            </div>
                            <div className="order-controls">
                                <Row>
                                    <Col span={17}>
                                        <Button onClick={this.onAddItem} type="primary">add item</Button>
                                    </Col>
                                </Row>
                                <Row
                                    style={{
                                    marginTop: '1em'
                                }}>
                                    <Col>
                                        <Button
                                            disabled={total
                                            ? false
                                            : true}
                                            block
                                            onClick={this.onSubmitOrder}>submit</Button>
                                    </Col>
                                </Row>
                            </div>
                        </Card>
                    )
                }
}

            </Mutation>
        )
    }
}

export default AddOrder;