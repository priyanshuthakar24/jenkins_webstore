import React from "react";

import { Input, Button, Form, Select, InputNumber } from "antd";

function AddressForm({ onSubmit, shippingInfo }) {
  const [form] = Form.useForm();

  const Option = Select;

  const handleSubmit = (value) => {
    onSubmit(value);
  };

  const prefixSelector = (
    <Form.Item name="prefix" noStyle>
      <Select
        style={{
          width: 70,
        }}
        defaultValue={"+91"}
      >
        <Option value="86">+91</Option>
      </Select>
    </Form.Item>
  );

  return (
    <Form
      form={form}
      onFinish={handleSubmit}
      initialValues={shippingInfo}
      className="w-full"
    >
      <Form.Item
        name="phone"
        rules={[
          {
            required: true,
            message: "Please input your phone number!",
          },
        ]}
      >
        <InputNumber
          addonBefore={prefixSelector}
          maxLength={10}
          minLength={10}
          style={{
            width: "100%",
          }}
          size="large"
          placeholder="Please input your phone number!"
        />
      </Form.Item>

      <Form.Item
        name="address"
        rules={[{ required: true, message: "Please input the product name!" }]}
      >
        <Input name="address" placeholder="Address" size="large" />
      </Form.Item>

      <Form.Item
        name="city"
        rules={[{ required: true, message: "Please enter City Name" }]}
      >
        <Input
          name="city"
          placeholder="City"
          size="large"
          variant="filled"
          onChange={(e) => {
            const city =
              e.target.value.charAt(0).toUpperCase() + e.target.value.slice(1);
            form.setFieldsValue({ city: city });
          }}
        />
      </Form.Item>

      <Form.Item
        name="state"
        rules={[{ required: true, message: "Please enter State Name" }]}
      >
        <Input
          name="state"
          placeholder="State"
          size="large"
          onChange={(e) => {
            const state =
              e.target.value.charAt(0).toUpperCase() + e.target.value.slice(1);
            form.setFieldsValue({ state: state });
          }}
        />
      </Form.Item>

      <Form.Item
        name="postalCode"
        rules={[{ required: true, message: "Please input the Postal code" }]}
      >
        <Input
          name="postalCode"
          variant="filled"
          placeholder="Postal Code"
          size="large"
        />
      </Form.Item>

      <Form.Item
        name="country"
        rules={[{ required: true, message: "Please input the product name!" }]}
      >
        <Input
          name="country"
          placeholder="Country"
          size="large"
          onChange={(e) => {
            const uppercase =
              e.target.value.charAt(0).toUpperCase() + e.target.value.slice(1);
            form.setFieldsValue({ country: uppercase });
          }}
        />
      </Form.Item>

      <Button
        className="w-full"
        size="large"
        color="default"
        variant="solid"
        htmlType="submit"
      >
        Next
      </Button>
    </Form>
  );
}

export default AddressForm;
