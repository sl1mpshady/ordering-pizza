import React from 'react';
import {Modal, List, Button, Typography} from 'antd';

export default({
    children,
    items,
    onCancel,
    onOk,
    loading,
    numberOfPizza,
    ...props
}) => (
    <Modal
        {...props}
            title="Confirm order"
            onCancel={onCancel}
            onOk={onOk}
        footer={[
            <Button key="back" disabled={loading} onClick={onCancel}>
              Cancel
            </Button>,
            <Button key="yes" loading={loading} type="primary" onClick={onOk}>
              Yes
            </Button>,
        ]}
        >
        <p>Based on your order, we will offer you the following:</p>
        <div>
            <List
                dataSource={items}
                renderItem={item => (
                <List.Item>
                    <Typography.Text mark>
                        {` ${item.summary.numberOfPizza} ${item.item} `}
                        {item.summary.excess > 0 && (`(${item.summary.excess} excess slices)`)}
                    </Typography.Text>
                </List.Item>
            )}/>
        </div>
        <p>A total of {" "}
            <Typography.Text>
                {numberOfPizza}
            </Typography.Text>
            {" Pizzas"}
        </p>
        <p>Are you sure you want to submit this order?</p>
    </Modal>
)
