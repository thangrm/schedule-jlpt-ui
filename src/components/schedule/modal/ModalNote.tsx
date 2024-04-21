import { ConfigProvider, Form, Modal } from 'antd';
import TextArea from 'antd/es/input/TextArea';
import React from 'react';
import { NOTE_TYPE } from '@/src/constants';

type ModalNoteProps = {
  form: any;
  open: any;
  type: string;
  isLoading: boolean;
  handleOk: any;
  handleCancel: any;
};

export default function ModalNote({
  form,
  open,
  type,
  isLoading,
  handleOk,
  handleCancel,
}: ModalNoteProps) {
  return (
    <ConfigProvider
      theme={{
        components: {
          Modal: {
            colorBgMask: 'rgba(0, 0, 0, 0)',
          },
        },
      }}
    >
      <Modal
        title={type === NOTE_TYPE.GRAMMAR ? 'Grammar note' : 'Vocabulary note'}
        open={open}
        onOk={handleOk}
        confirmLoading={isLoading}
        onCancel={handleCancel}
        okText="Save"
      >
        <Form
          form={form}
          style={{ maxWidth: 600, minHeight: 325 }}
          autoComplete="off"
        >
          <Form.Item>
            <TextArea showCount style={{ height: 300, marginBottom: 16 }} />
          </Form.Item>
        </Form>
      </Modal>
    </ConfigProvider>
  );
}
