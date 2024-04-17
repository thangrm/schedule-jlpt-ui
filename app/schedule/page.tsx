'use client';
import React, { useState } from 'react';
import { Alert, Badge, BadgeProps, Calendar, CalendarProps, Form } from 'antd';
import type { Dayjs } from 'dayjs';
import dayjs from 'dayjs';
import ModalNote from '../../src/components/schedule/ModalNote';
import ModalComplete from '../../src/components/schedule/ModalComplete';
import ModalSchedule from '../../src/components/schedule/ModalSchedule';
import { SelectInfo } from 'antd/es/calendar/generateCalendar';

const getListData = (value: Dayjs) => {
  let listData;
  switch (value.date()) {
    case 8:
      listData = [
        { type: 'warning', content: 'This is warning event.' },
        { type: 'success', content: 'This is usual event.' },
      ];
      break;
    case 10:
      listData = [
        { type: 'warning', content: 'This is warning event.' },
        { type: 'success', content: 'This is usual event.' },
        { type: 'error', content: 'This is error event.' },
      ];
      break;
    case 15:
      listData = [
        { type: 'warning', content: 'This is warning event' },
        { type: 'success', content: 'This is very long usual event......' },
        { type: 'error', content: 'This is error event 1.' },
        { type: 'error', content: 'This is error event 2.' },
        { type: 'error', content: 'This is error event 3.' },
        { type: 'error', content: 'This is error event 4.' },
      ];
      break;
    default:
  }
  return listData || [];
};
const getMonthData = (value: Dayjs) => {
  if (value.month() === 8) {
    return 1394;
  }
};
const App: React.FC = () => {
  const monthCellRender = (value: Dayjs) => {
    const num = getMonthData(value);
    return num ? (
      <div className="notes-month">
        <section>{num}</section>
        <span>Backlog number</span>
      </div>
    ) : null;
  };
  const dateCellRender = (value: Dayjs) => {
    const listData = getListData(value);
    return (
      <ul className="events">
        {listData.map((item) => (
          <li key={item.content}>
            <Badge
              status={item.type as BadgeProps['status']}
              text={item.content}
            />
          </li>
        ))}
      </ul>
    );
  };
  const cellRender: CalendarProps<Dayjs>['cellRender'] = (current, info) => {
    if (info.type === 'date') return dateCellRender(current);
    if (info.type === 'month') return monthCellRender(current);
    return info.originNode;
  };
  const [value, setValue] = useState(() => dayjs('2017-01-25'));
  const [openSchedule, setOpenSchedule] = useState(false);
  const [openComplete, setOpenComplete] = useState(false);
  const [openNote, setOpenNote] = useState(false);
  const [formSchedule] = Form.useForm<any>();
  const [formComplete] = Form.useForm<any>();
  const [formNote] = Form.useForm<any>();
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [modalText, setModalText] = useState('Content of the modal');
  const onSelect = (newValue: Dayjs, selectInfo: SelectInfo) => {
    if (selectInfo.source === 'date') {
      setValue(newValue);
      // setOpenSchedule(true);
      setOpenComplete(true);
    }
  };
  const onPanelChange = (newValue: Dayjs) => {
    setValue(newValue);
  };
  //Modal schedule
  const handleScheduleOk = () => {
    formSchedule.validateFields().then(() => {
      setOpenSchedule(false);
    });
  };
  const handleScheduleCancel = () => {
    setOpenSchedule(false);
  };

  //Modal complete
  const handleCompleteOk = () => {
    setOpenComplete(false);
  };
  const handleCompleteCancel = () => {
    setOpenComplete(false);
  };

  //Modal note
  const handleNoteOk = () => {
    setOpenNote(false);
  };
  const handleNoteCancel = () => {
    setOpenNote(false);
  };

  return (
    <>
      <div>
        <Alert message={`You selected date: ${value?.format('YYYY-MM-DD')}`} />
        <Calendar
          value={value}
          onSelect={onSelect}
          onPanelChange={onPanelChange}
        />
        <ModalSchedule
          date={value}
          form={formSchedule}
          open={openSchedule}
          handleOk={handleScheduleOk}
          confirmLoading={confirmLoading}
          handleCancel={handleScheduleCancel}
        />
        <ModalComplete
          date={value}
          form={formComplete}
          open={openComplete}
          handleOk={handleCompleteOk}
          confirmLoading={confirmLoading}
          handleCancel={handleCompleteCancel}
        />
        <ModalNote
          title="Grammar note"
          form={formNote}
          open={openNote}
          handleOk={handleNoteOk}
          confirmLoading={confirmLoading}
          handleCancel={handleNoteCancel}
        />
      </div>
    </>
  );
};
export default App;
