import React from 'react';
import { List, Avatar, Button } from 'antd';
import { FormModal } from './Modal';

const data = require('./data.json');

class EmployeeList extends React.Component {
  state = {
    initLoading: true,
    loading: false,
    list: [],
    showModal: true,
    insert: true,
    current: {},
  };

  componentDidMount() {
    this.setState({
      initLoading: false,
      list: data,
    });
  }

  render() {
    const { initLoading, list } = this.state;

    return (
      <>
        <Button
          type="primary"
          style={{ display: 'block', marginLeft: '85%' }}
          onClick={this.add}
        >
          Add
        </Button>
        <List
          className="demo-loadmore-list"
          loading={initLoading}
          itemLayout="horizontal"
          dataSource={list}
          renderItem={(item, idx) => (
            <List.Item
              actions={[
                <Button
                  type="primary"
                  onClick={() => {
                    this.edit(item);
                  }}
                >
                  Edit
                </Button>,
                <Button
                  type="dashed"
                  onClick={() => {
                    this.delete(idx);
                  }}
                >
                  Delete
                </Button>,
              ]}
            >
              <List.Item.Meta
                avatar={<Avatar src={item?.picture?.thumbnail} />}
                title={
                  <>
                    {item?.name?.first} {item?.name?.last}
                  </>
                }
                description={item?.email}
              />
              <div>{item?.cell}</div>
            </List.Item>
          )}
        />

        <FormModal
          visible={this.state.showModal}
          handleOk={this.handleOk}
          handleCancel={this.handleCancel}
          modalLoading={this.state.modalLoading}
          formData={this.state.insert ? {} : this.state.current}
        />
      </>
    );
  }

  add = () => {
    this.setState({
      showModal: true,
      insert: true,
    });
  };

  delete = (idx) => {
    const { list } = this.state;
    list.splice(idx, 1);
    this.setState(() => ({ list }));
  };

  edit = (item) => {
    console.log(item);
    this.setState({
      showModal: true,
      insert: false,
      current: item,
    });
  };

  handleCancel = () => {
    this.setState({ showModal: false });
  };
}

export default EmployeeList;
