import React from 'react';
import { Modal, AutoComplete, Button } from 'antd';

export default ({ children, dataSource, onChange, onCancel, onSearch, onOk, ...props }) => (
    <Modal
        title="Add item"
        {...props}
        onOk={onOk}
        footer={[
            <Button key="back" onClick={onCancel}>
              Cancel
            </Button>,
            <Button key="add" type="primary" onClick={onOk}>
              Add
            </Button>,
          ]}
    >
        <AutoComplete
            style={{width: '100%'}}
            dataSource={dataSource}
            onSelect={onChange}
            placeholder="Type the pizza"
            onSearch={onSearch}
            autoFocus={true}
        />
    </Modal>
)