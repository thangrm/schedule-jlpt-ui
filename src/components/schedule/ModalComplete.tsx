import Image from 'next/image';
import {
  Button,
  Checkbox,
  Flex,
  Form,
  FormProps,
  InputNumber,
  Modal,
} from 'antd';
import TextArea from 'antd/es/input/TextArea';
import React from 'react';
import { SignatureOutlined } from '@ant-design/icons';

type ModalCompleteProps = {
  date: any;
  form: any;
  open: any;
  handleOk: any;
  confirmLoading: any;
  handleCancel: any;
};

interface FieldType {
  time?: string;
  vocabulary?: string;
  remember?: string;
}

export default function ModalComplete({
  date,
  open,
  form,
  handleOk,
  confirmLoading,
  handleCancel,
}: ModalCompleteProps) {
  const onFinish: FormProps<FieldType>['onFinish'] = (values) => {
    console.log('Success:', values);
  };
  const onFinishFailed: FormProps<FieldType>['onFinishFailed'] = (
    errorInfo
  ) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <Modal
      title={`Completed: ${date?.format('DD/MM/YYYY')}`}
      open={open}
      onOk={handleOk}
      okText="Submit"
      confirmLoading={confirmLoading}
      onCancel={handleCancel}
    >
      <Form
        name="basic"
        form={form}
        labelCol={{ span: 6 }}
        wrapperCol={{ span: 18 }}
        style={{ maxWidth: 600 }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item<FieldType> label="Time" name="time">
          12:00
        </Form.Item>
        <Form.Item label="Vocabulary">
          <Form.Item<FieldType> name="vocabulary" noStyle>
            <InputNumber placeholder="Words" min={0} max={100} />
          </Form.Item>
          <span className="ant-form-text" style={{ marginLeft: 8 }}>
            / 120 words
          </span>
          <Button icon={<SignatureOutlined />} title="Note" />
        </Form.Item>
        <Form.Item label="Grammar" valuePropName="checked">
          <Button icon={<SignatureOutlined />} title="Note" />
        </Form.Item>
        <Form.Item label="Listening" valuePropName="checked">
          <Checkbox value="1">Done</Checkbox>
        </Form.Item>
        <Form.Item label="Reading" valuePropName="checked">
          <Checkbox value="1">Done</Checkbox>
        </Form.Item>
      </Form>
    </Modal>
  );
}
