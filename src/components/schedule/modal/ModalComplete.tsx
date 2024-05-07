import {
  Button,
  Checkbox,
  Form,
  FormProps,
  InputNumber,
  Modal,
  Progress,
  Tooltip,
} from 'antd';
import React, { useState } from 'react';
import { EditOutlined, SignatureOutlined } from '@ant-design/icons';
import { NOTE_TYPE } from '@/src/constants';
import ModalNote from './ModalNote';
import { API_ENDPOINT } from '../../../constants';
import Cookies from 'js-cookie';

type ModalCompleteProps = {
  date: any;
  lesson: any;
  form: any;
  open: any;
  handleOk: any;
  handleCancel: any;
  handleEditSchedule: any;
  callBackOnSuccess: () => void;
};

interface FieldType {
  vocabulary?: string;
  listening?: string;
  reading?: string;
}

export default function ModalComplete({
  date,
  lesson,
  open,
  form,
  handleOk,
  handleCancel,
  handleEditSchedule,
  callBackOnSuccess,
}: ModalCompleteProps) {
  const token = Cookies.get('token') ?? '';
  const [isLoading, setIsLoading] = useState(false);
  const [openNote, setOpenNote] = useState(false);
  const [formNote] = Form.useForm<any>();
  const [noteType, setNoteType] = useState(NOTE_TYPE.GRAMMAR);
  const vocabulary = Form.useWatch('vocabulary', form);
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
        date: lesson?.date,
        number_word_completed: formValues.vocabulary,
        listening_checked: !!formValues?.listening,
        reading_checked: !!formValues?.reading,
      }),
    })
      .then((res) => {
        setIsLoading(false);
        lesson.number_word_completed = formValues.vocabulary;
        lesson.listening_checked = !!formValues?.listening;
        lesson.reading_checked = !!formValues?.reading;
        res.ok && callBackOnSuccess();
      })
      .catch((err) => {
        setIsLoading(false);
        console.log(err);
      });
  };

  //Modal note
  const handleButtonNote = (type: string) => {
    setNoteType(type);
    const lessonNote =
      type === NOTE_TYPE.GRAMMAR
        ? lesson?.grammar_note
        : lesson?.vocabulary_note;
    formNote.setFieldValue('note', lessonNote);
    setOpenNote(true);
  };
  const handleNoteOk = () => {
    formNote.validateFields().then(() => {
      formNote.submit();
    });
    setOpenNote(false);
  };
  const handleNoteCancel = () => {
    setOpenNote(false);
  };

  return (
    <>
      <Modal
        title={
          <>
            <span>Completed: {date?.format('DD/MM/YYYY')}</span>
            <Tooltip title="Edit schedule">
              <EditOutlined
                style={{ marginLeft: 10, color: '#1677ff', cursor: 'pointer' }}
                onClick={handleEditSchedule}
              />
            </Tooltip>
          </>
        }
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
          style={{ maxWidth: 600, minHeight: 200 }}
          onFinish={onFinish}
          autoComplete="off"
        >
          <Form.Item<FieldType> label="Time">
            {lesson?.time_start?.substring(0, 5)}
          </Form.Item>
          <Form.Item label="Vocabulary">
            <Form.Item<FieldType>
              name="vocabulary"
              noStyle
              rules={[{ required: true, message: 'This field is required' }]}
            >
              <InputNumber
                placeholder="Words"
                min={0}
                max={lesson?.number_word}
              />
            </Form.Item>
            <span className="ant-form-text" style={{ marginLeft: 8 }}>
              / {lesson?.number_word} words
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
            <Progress
              percent={Math.round((vocabulary / lesson?.number_word) * 100)}
            />
          </Form.Item>
          <Form.Item
            label="Grammar"
            valuePropName="checked"
            hidden={!lesson?.is_study_grammar}
          >
            <Button
              icon={<SignatureOutlined />}
              title="Note"
              onClick={() => {
                handleButtonNote(NOTE_TYPE.GRAMMAR);
              }}
            />
          </Form.Item>
          <Form.Item
            name="listening"
            label="Listening"
            valuePropName="checked"
            hidden={!lesson?.is_study_listening}
          >
            <Checkbox>Done</Checkbox>
          </Form.Item>
          <Form.Item
            name="reading"
            label="Reading"
            valuePropName="checked"
            hidden={!lesson?.is_study_reading}
          >
            <Checkbox>Done</Checkbox>
          </Form.Item>
        </Form>
      </Modal>

      <ModalNote
        type={noteType}
        form={formNote}
        date={date}
        lesson={lesson}
        open={openNote}
        handleOk={handleNoteOk}
        handleCancel={handleNoteCancel}
        callBackOnSuccess={() => {}}
      />
    </>
  );
}
