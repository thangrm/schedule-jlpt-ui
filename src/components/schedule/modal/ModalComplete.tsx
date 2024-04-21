import {
  Button,
  Checkbox,
  Form,
  FormProps,
  InputNumber,
  Modal,
  Progress,
} from 'antd';
import React, { useState } from 'react';
import { SignatureOutlined } from '@ant-design/icons';
import ModalNote from '@/src/components/schedule/modal/ModalNote';
import { NOTE_TYPE } from '@/src/constants';

type ModalCompleteProps = {
  date: any;
  form: any;
  open: any;
  handleOk: any;
  isLoading: boolean;
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
  isLoading,
  handleCancel,
}: ModalCompleteProps) {
  const [openNote, setOpenNote] = useState(false);
  const [formNote] = Form.useForm<any>();
  const [noteType, setNoteType] = useState(NOTE_TYPE.GRAMMAR);
  const vocabulary = Form.useWatch('vocabulary', form);
  const onFinish: FormProps<FieldType>['onFinish'] = (values) => {
    console.log('Success:', values);
  };
  const onFinishFailed: FormProps<FieldType>['onFinishFailed'] = (
    errorInfo
  ) => {
    console.log('Failed:', errorInfo);
  };

  //Modal note
  const handleButtonNote = (type: string) => {
    setNoteType(type);
    setOpenNote(true);
  };
  const handleNoteOk = () => {
    setOpenNote(false);
  };
  const handleNoteCancel = () => {
    setOpenNote(false);
  };

  return (
    <>
      <Modal
        title={`Completed: ${date?.format('DD/MM/YYYY')}`}
        open={open}
        onOk={handleOk}
        okText="Save"
        confirmLoading={isLoading}
        onCancel={handleCancel}
      >
        <Form
          form={form}
          labelCol={{ span: 6 }}
          wrapperCol={{ span: 18 }}
          style={{ maxWidth: 600 }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item<FieldType> label="Time">12:00</Form.Item>
          <Form.Item label="Vocabulary">
            <Form.Item<FieldType>
              name="vocabulary"
              noStyle
              rules={[{ required: true, message: 'This field is required' }]}
            >
              <InputNumber placeholder="Words" min={0} max={100} />
            </Form.Item>
            <span className="ant-form-text" style={{ marginLeft: 8 }}>
              / 100 words
            </span>
            <Button
              icon={<SignatureOutlined />}
              title="Note"
              onClick={() => {
                handleButtonNote(NOTE_TYPE.VOCABULARY);
              }}
            />
          </Form.Item>
          <Form.Item wrapperCol={{ offset: 6, span: 18 }}>
            <Progress percent={(vocabulary / 100) * 100} />
          </Form.Item>
          <Form.Item label="Grammar" valuePropName="checked">
            <Button
              icon={<SignatureOutlined />}
              title="Note"
              onClick={() => {
                handleButtonNote(NOTE_TYPE.GRAMMAR);
              }}
            />
          </Form.Item>
          <Form.Item label="Listening" valuePropName="checked">
            <Checkbox>Done</Checkbox>
          </Form.Item>
          <Form.Item label="Reading" valuePropName="checked">
            <Checkbox>Done</Checkbox>
          </Form.Item>
        </Form>
      </Modal>

      <ModalNote
        type={noteType}
        form={formNote}
        open={openNote}
        handleOk={handleNoteOk}
        isLoading={isLoading}
        handleCancel={handleNoteCancel}
      />
    </>
  );
}
