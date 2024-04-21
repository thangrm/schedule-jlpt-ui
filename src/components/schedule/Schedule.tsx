import React, { useState } from 'react';
import {
  Alert,
  Calendar,
  CalendarProps,
  ConfigProvider,
  Flex,
  Form,
} from 'antd';
import './schedule.css';
import type { Dayjs } from 'dayjs';
import dayjs from 'dayjs';
import ModalComplete from './modal/ModalComplete';
import ModalSchedule from './modal/ModalSchedule';
import { SelectInfo } from 'antd/es/calendar/generateCalendar';
import { SELECT_INFO_CALENDAR } from '@/src/constants';
import updateLocale from 'dayjs/plugin/updateLocale';
import { AppBreadcrumb, BreadcrumbItem } from '../common/app/AppBreadcrumb';
import t from '@/dictionaries/en.json';
import { AppContent } from '../common/app/AppContent';

dayjs.extend(updateLocale);
dayjs.updateLocale('en', {
  weekStart: 1,
});

const breadcrumbs: BreadcrumbItem[] = [
  {
    title: t.home,
    href: '/',
  },
  {
    title: t.schedule,
  },
];
export default function Schedule() {
  const dateCellRender = (day: Dayjs) => {
    if (day.date() === 18) {
      return (
        <Flex gap="small" vertical>
          <Alert message="80/100 words" type="success" showIcon />
          <Alert message="Grammar" type="info" showIcon />
          <Alert message="Listening" type="success" showIcon />
          <Alert message="Reading" type="success" showIcon />
        </Flex>
      );
    }
  };
  const cellRender: CalendarProps<Dayjs>['cellRender'] = (current, info) => {
    if (info.type === 'date') return dateCellRender(current);
    return info.originNode;
  };
  const [value, setValue] = useState(() => dayjs());
  const [openSchedule, setOpenSchedule] = useState(false);
  const [openComplete, setOpenComplete] = useState(false);
  const [scheduleForm] = Form.useForm<any>();
  const [completeForm] = Form.useForm<any>();
  const [isLoading] = useState(false);
  const onSelect = (newValue: Dayjs, selectInfo: SelectInfo) => {
    if (selectInfo.source === SELECT_INFO_CALENDAR.DATE) {
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
    scheduleForm.validateFields().then(() => {
      setOpenSchedule(false);
    });
  };
  const handleScheduleCancel = () => {
    setOpenSchedule(false);
  };

  //Modal complete
  const handleCompleteOk = () => {
    completeForm.validateFields().then(() => {
      setOpenComplete(false);
    });
  };
  const handleCompleteCancel = () => {
    setOpenComplete(false);
  };

  return (
    <>
      <ConfigProvider
        theme={{
          components: {
            Modal: {
              colorBgMask: 'rgba(0, 0, 0, 0)',
            },
            Alert: {
              defaultPadding: '0 5px',
            },
          },
        }}
      >
        <AppBreadcrumb items={breadcrumbs} />
        <AppContent>
          <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
            <Calendar
              value={value}
              onSelect={onSelect}
              onPanelChange={onPanelChange}
              cellRender={cellRender}
            />
            <ModalSchedule
              date={value}
              form={scheduleForm}
              open={openSchedule}
              handleOk={handleScheduleOk}
              isLoading={isLoading}
              handleCancel={handleScheduleCancel}
            />
            <ModalComplete
              date={value}
              form={completeForm}
              open={openComplete}
              handleOk={handleCompleteOk}
              isLoading={isLoading}
              handleCancel={handleCompleteCancel}
            />
          </div>
        </AppContent>
      </ConfigProvider>
    </>
  );
}
