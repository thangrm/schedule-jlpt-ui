import { ConfigProvider, Form, FormProps, Modal } from 'antd';
import TextArea from 'antd/es/input/TextArea';
import React, { useState } from 'react';
import { NOTE_TYPE } from '@/src/constants';
import { API_ENDPOINT } from '../../../constants';
import { Dayjs } from 'dayjs';
import Cookies from 'js-cookie';

type ModalNoteProps = {
  form: any;
  open: any;
  date?: Dayjs;
  lesson: any;
  type: string;
  handleOk: any;
  handleCancel: any;
  callBackOnSuccess: any;
};

interface FieldType {
  note?: string;
}

export default function ModalNote({
  form,
  date,
  lesson,
  open,
  type,
  handleOk,
  handleCancel,
  callBackOnSuccess,
}: ModalNoteProps) {
  const token = Cookies.get('token') ?? '';
  const [isLoading, setIsLoading] = useState(false);

  const onFinish: FormProps<FieldType>['onFinish'] = (formValues) => {
    setIsLoading(true);
    let bodyRequest: any = {
      [type === NOTE_TYPE.GRAMMAR ? 'grammar_note' : 'vocabulary_note']:
        formValues?.note,
    };

    if (type === NOTE_TYPE.GRAMMAR) {
      bodyRequest = { ...bodyRequest, grammar_checked: true };
    }

    fetch(API_ENDPOINT + 'schedules', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token,
        Accept: 'application/json',
      },
      body: JSON.stringify({
        is_update: true,
        date: date?.format('YYYY-MM-DD'),
        ...bodyRequest,
      }),
    })
      .then((res) => {
        setIsLoading(false);
        res.ok && callBackOnSuccess();
        lesson[
          type === NOTE_TYPE.GRAMMAR ? 'grammar_note' : 'vocabulary_note'
        ] = formValues?.note;
        if (type === NOTE_TYPE.GRAMMAR) {
          lesson.grammar_checked = true;
        }
      })
      .catch((err) => {
        setIsLoading(false);
        console.log(err);
      });
  };

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
          onFinish={onFinish}
        >
          <Form.Item name="note">
            <TextArea showCount style={{ height: 300, marginBottom: 16 }} />
          </Form.Item>
        </Form>
      </Modal>
    </ConfigProvider>
  );
}
