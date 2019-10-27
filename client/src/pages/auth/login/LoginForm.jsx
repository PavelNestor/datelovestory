import React from 'react';

import { Form, Input, Button, Checkbox } from 'antd';

import './style.css';

const LoginForm = ({ form }) => {
  const { getFieldDecorator, validateFields } = form;

  const onHandleSubmit = event => {
    event.preventDefault();

    validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
      }
    });
  };

  return (
    <Form onSubmit={onHandleSubmit} className="login-form">
      <Form.Item>
        {getFieldDecorator('email', {
          rules: [{ required: true, message: 'Please enter your Email address' }],
        })(
          <Input
            placeholder="Email"
          />,
        )}
      </Form.Item>

      <Form.Item>
        {getFieldDecorator('password', {
          rules: [{ required: true, message: 'Please Enter Your Password' }],
        })(
          <Input
            type="password"
            placeholder="Password"
          />,
        )}
      </Form.Item>

      <Form.Item>
        {getFieldDecorator('remember', {
          valuePropName: 'checked',
          initialValue: true,
        })(<Checkbox>Keep me logged in</Checkbox>)}

        <a className="login-form-forgot" href="">
          Forgot password
        </a>

        <Button type="primary" htmlType="submit" className="login-form__button">
          Login
        </Button>

      </Form.Item>

      <Form.Item>
        Not a member? <a href="">Join Free Now!</a>
      </Form.Item>

    </Form>
  );
};

const WrappedLoginForm = Form.create({ name: 'login_form' })(LoginForm);

export default WrappedLoginForm;
