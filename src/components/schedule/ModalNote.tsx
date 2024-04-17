import Image from 'next/image';
import { Flex, Form, Modal } from 'antd';
import TextArea from 'antd/es/input/TextArea';
import React from 'react';

type ModalNoteProps = {
  title: string;
  form: any;
  open: any;
  handleOk: any;
  confirmLoading: any;
  handleCancel: any;
};

export default function ModalNote({
  title,
  form,
  open,
  handleOk,
  confirmLoading,
  handleCancel,
}: ModalNoteProps) {
  return (
    <Modal
      title={title}
      open={open}
      onOk={handleOk}
      confirmLoading={confirmLoading}
      onCancel={handleCancel}
      okText="Submit"
    >
      <Form
        name="basic"
        form={form}
        style={{ maxWidth: 600 }}
        autoComplete="off"
      >
        <Form.Item name="note">
          <TextArea showCount style={{ height: 240, marginBottom: 16 }} />
        </Form.Item>
      </Form>
    </Modal>
  );
}
