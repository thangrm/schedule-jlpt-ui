import {
  Button,
  DatePicker,
  Form,
  FormProps,
  InputNumber,
  Modal,
  Switch,
  TimePicker,
} from 'antd';
import React, { useState } from 'react';
import { API_ENDPOINT } from '../../../constants';
import Cookies from 'js-cookie';
import dayjs, { Dayjs } from 'dayjs';

type ModalCompleteProps = {
  date: any;
  form: any;
  open: any;
  handleOk: any;
  handleCancel: any;
  callBackOnSuccess: () => void;
};

interface FieldType {
  date?: Dayjs;
  time?: Dayjs;
  vocabulary?: string;
  grammar?: boolean;
  listening?: boolean;
  reading?: boolean;
}

export default function ModalEditSchedule({
  date,
  form,
  open,
  handleOk,
  handleCancel,
  callBackOnSuccess,
}: ModalCompleteProps) {
  const token = Cookies.get('token') ?? '';
  const [isLoading, setIsLoading] = useState(false);

  const onFinish: FormProps<FieldType>['onFinish'] = (formValues) => {
    setIsLoading(true);
    fetch(API_ENDPOINT + 'schedules', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token,
        Accept: 'application/json',
      },
      body: JSON.stringify({
        is_update: true,
        date: formValues?.date?.format('YYYY-MM-DD'),
        time_start: formValues?.time?.format('HH:mm'),
        number_word: formValues?.vocabulary,
        is_study_grammar: formValues?.grammar,
        is_study_listening: formValues?.listening,
        is_study_reading: formValues?.reading,
      }),
    })
      .then((res) => {
        setIsLoading(false);
        res.ok && callBackOnSuccess();
      })
      .catch((err) => {
        setIsLoading(false);
        console.log(err);
      });
  };

  const handleDeleteSchedule = () => {
    setIsLoading(true);
    fetch(API_ENDPOINT + 'schedules', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token,
        Accept: 'application/json',
      },
      body: JSON.stringify({
        date: date?.format('YYYY-MM-DD'),
      }),
    })
      .then((res) => {
        setIsLoading(false);
        res.ok && callBackOnSuccess();
      })
      .catch((err) => {
        setIsLoading(false);
        console.log(err);
      });
  };

  return (
    <Modal
      title={`Schedule: ${date?.format('DD/MM/YYYY')}`}
      open={open}
      onOk={handleOk}
      confirmLoading={isLoading}
      onCancel={handleCancel}
      footer={[
        <Button key="back" onClick={handleCancel}>
          Cancel
        </Button>,
        <Button
          key="delete"
          type="primary"
          loading={isLoading}
          danger
          onClick={handleDeleteSchedule}
        >
          Delete
        </Button>,
        <Button
          key="submit"
          type="primary"
          loading={isLoading}
          onClick={handleOk}
        >
          Save
        </Button>,
      ]}
    >
      <Form
        form={form}
        labelCol={{ span: 6 }}
        wrapperCol={{ span: 18 }}
        style={{ maxWidth: 600 }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        autoComplete="off"
      >
        <Form.Item<FieldType> name="date" hidden>
          <DatePicker />
        </Form.Item>
        <Form.Item<FieldType>
          label="Time"
          name="time"
          initialValue={dayjs().set('hour', 21).set('minutes', 0)}
        >
          <TimePicker
            format={'HH:mm'}
            defaultValue={dayjs().set('hour', 21).set('minutes', 0)}
            minuteStep={5}
            needConfirm={false}
          />
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
              max={200}
              style={{ width: 136 }}
            />
          </Form.Item>
          <span className="ant-form-text" style={{ marginLeft: 8 }}></span>
        </Form.Item>
        <Form.Item
          label="Grammar"
          name="grammar"
          valuePropName="checked"
          initialValue={true}
        >
          <Switch defaultValue />
        </Form.Item>
        <Form.Item
          label="Listening"
          name="listening"
          valuePropName="checked"
          initialValue={true}
        >
          <Switch defaultValue />
        </Form.Item>
        <Form.Item
          label="Reading"
          name="reading"
          valuePropName="checked"
          initialValue={true}
        >
          <Switch defaultValue />
        </Form.Item>
      </Form>
    </Modal>
  );
}
