import React from 'react';
import {
  List,
  Avatar,
  Button,
  Modal,
  Form,
  Input,
  Select,
  InputNumber,
} from 'antd';

const data = require('./data.json');

class EmployeeList extends React.Component {
  state = {
    initLoading: true,
    loading: false,
    list: [],
    showModal: true,
    current: {
      name: {
        last: '',
        first: '',
      },
      email: '',
      gender: '',
      dob: { age: 0 },
    },
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

        <Modal
          visible={this.state.showModal}
          title="Add a new member"
          onCancel={this.handleCancel}
          footer={null}
        >
          <Form
            labelCol={{
              span: 5,
            }}
            wrapperCol={{
              span: 18,
            }}
            layout="horizontal"
            onValuesChange={this.valuesChange}
          >
            <Form.Item label="First Name">
              <Input onChange={this.firstName} />
            </Form.Item>
            <Form.Item label="Last Name">
              <Input onChange={this.lastName} />
            </Form.Item>
            <Form.Item label="Age">
              <InputNumber onChange={this.age} />
            </Form.Item>
            <Form.Item label="Gender">
              <Select onChange={this.gender}>
                <Select.Option value="female">Female</Select.Option>
                <Select.Option value="male">Male</Select.Option>
              </Select>
            </Form.Item>
            <Form.Item label="Email">
              <Input onChange={this.email} />
            </Form.Item>
            <Form.Item
              wrapperCol={{
                xs: { span: 24, offset: 26 },
                sm: { span: 16, offset: 18 },
              }}
            >
              <Button type="primary" onClick={this.submit}>
                Submit
              </Button>
            </Form.Item>
          </Form>
        </Modal>
      </>
    );
  }

  add = () => {
    this.setState({
      showModal: true,
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
      current: item,
    });
  };

  handleCancel = () => {
    this.setState({ showModal: false });
  };

  submit = () => {
    const { list } = this.state;
    let { current } = this.state;
    list.push(current);

    current = {
      name: {
        last: '',
        first: '',
      },
      email: '',
      gender: '',
      dob: { age: 0 },
    };

    this.setState({
      list,
      current,
      showModal: false,
    });
  };

  age = (e) => {
    const { current } = this.state;
    current.dob.age = e;
    this.setState({
      current,
    });
  };

  gender = (e) => {
    const { current } = this.state;
    current.gender = e;
    this.setState({
      current,
    });
  };

  firstName = (e) => {
    const { current } = this.state;
    current.name.first = e.target.value;
    this.setState({
      current,
    });
  };

  lastName = (e) => {
    const { current } = this.state;
    current.name.last = e.target.value;
    this.setState({
      current,
    });
  };

  email = (e) => {
    const { current } = this.state;
    current.email = e.target.value;
    this.setState({
      current,
    });
  };
}

export default EmployeeList;
