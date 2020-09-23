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
    showModal: false,
    insert: true,
    editIdx: -1,
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
                    this.edit(item, idx);
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
              span: 16,
            }}
            layout="horizontal"
            onValuesChange={this.valuesChange}
          >
            <Form.Item label="First Name">
              <Input
                onChange={(e) => {
                  this.firstName(e);
                }}
                value={this.state.current.name.first}
              />
            </Form.Item>
            <Form.Item label="Last Name">
              <Input
                onChange={(e) => {
                  this.lastName(e);
                }}
                value={this.state.current.name.last}
              />
            </Form.Item>
            <Form.Item label="Age">
              <InputNumber
                onChange={(e) => {
                  this.age(e);
                }}
                value={this.state.current.dob.age}
              />
            </Form.Item>
            <Form.Item label="Gender">
              <Select
                onChange={(e) => {
                  this.gender(e);
                }}
                value={this.state.current.gender}
              >
                <Select.Option value="female">Female</Select.Option>
                <Select.Option value="male">Male</Select.Option>
              </Select>
            </Form.Item>
            <Form.Item label="Email">
              <Input
                onChange={(e) => {
                  this.email(e);
                }}
                value={this.state.current.email}
              />
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
    this.setState(() => ({
      showModal: true,
      insert: true,
    }));
  };

  delete = (idx) => {
    const { list } = this.state;
    list.splice(idx, 1);
    this.setState(() => ({ list }));
  };

  edit = (item, idx) => {
    this.setState(() => ({
      showModal: true,
      current: item,
      insert: false,
      editIdx: idx,
    }));
  };

  handleCancel = () => {
    let { current } = this.state;

    current = {
      name: {
        last: '',
        first: '',
      },
      email: '',
      gender: '',
      dob: { age: 0 },
    };
    this.setState({ showModal: false, current });
  };

  submit = () => {
    if (this.state.insert) {
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
    } else {
      const { list, editIdx } = this.state;
      let { current } = this.state;
      list[editIdx] = current;
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
        showModal: false,
        current,
      });
    }
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
