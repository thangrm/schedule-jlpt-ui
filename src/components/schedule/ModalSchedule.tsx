import Image from 'next/image';
import {
  Button,
  Checkbox,
  Flex,
  Form,
  FormProps,
  InputNumber,
  Modal,
  Switch,
  TimePicker,
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
}

export default function ModalSchedule({
  date,
  form,
  open,
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
      title={`Schedule: ${date?.format('DD/MM/YYYY')}`}
      open={open}
      onOk={handleOk}
      confirmLoading={confirmLoading}
      onCancel={handleCancel}
      okText="Submit"
    >
      <Form
        name="basic"
        form={form}
        labelCol={{ span: 6 }}
        wrapperCol={{ span: 18 }}
        style={{ maxWidth: 600 }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item<FieldType> label="Time" name="time">
          <TimePicker format={'HH:mm'} minuteStep={5} needConfirm={false} />
        </Form.Item>
        <Form.Item<FieldType> label="Vocabulary" required={true}>
          <Form.Item<FieldType>
            name="vocabulary"
            noStyle
            rules={[{ required: true, message: 'This field is required' }]}
          >
            <InputNumber
              placeholder="Words"
              min={0}
              max={100}
              style={{ width: 136 }}
            />
          </Form.Item>
          <span className="ant-form-text" style={{ marginLeft: 8 }}>
            / 120 words
          </span>
        </Form.Item>
        <Form.Item label="Grammar" valuePropName="checked">
          <Switch defaultValue />
        </Form.Item>
        <Form.Item label="Listening" valuePropName="checked">
          <Switch defaultValue />
        </Form.Item>
        <Form.Item label="Reading" valuePropName="checked">
          <Switch defaultValue />
        </Form.Item>
      </Form>
    </Modal>
  );
}
