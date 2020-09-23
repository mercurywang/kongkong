import React from 'react';
import { Modal, Button, Form, Input, Select, InputNumber } from 'antd';

export class FormModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      age: 0,
      firstName: '',
      lastName: '',
      email: '',
      gender: '',
    };
  }
  render() {
    const { visible, handleCancel } = this.props;
    const {
      name: { first, last },
      email,
      dob: { age },
      gender,
    } = this.props.formData;
    return (
      <>
        <Modal
          visible={visible}
          title="Add a new member"
          onCancel={handleCancel}
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
              <Input onChange={this.firstName} value={first || ''} />
            </Form.Item>
            <Form.Item label="Last Name">
              <Input onChange={this.lastName} value={last || ''} />
            </Form.Item>
            <Form.Item label="Age">
              <InputNumber onChange={this.age} value={age || 0} />
            </Form.Item>
            <Form.Item label="Gender">
              <Select onChange={this.gender} value={gender || ''}>
                <Select.Option value="female">Female</Select.Option>
                <Select.Option value="male">Male</Select.Option>
              </Select>
            </Form.Item>
            <Form.Item label="Email">
              <Input onChange={this.email} value={email || ''} />
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
}
