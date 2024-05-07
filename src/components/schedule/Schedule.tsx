import React, { useEffect, useState } from 'react';
import {
  Alert,
  Calendar,
  CalendarProps,
  ConfigProvider,
  Flex,
  Form,
  Spin,
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
import { API_ENDPOINT } from '../../constants';
import Cookies from 'js-cookie';
import ModalEditSchedule from './modal/ModalEditSchedule';

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
  const [selectDate, setSelectDate] = useState(() => dayjs());
  const [isFirst, setIsFirst] = useState(true);
  const [schedules, setSchedules] = useState([]);
  const [lesson, setLesson] = useState<any>();
  const [openSchedule, setOpenSchedule] = useState(false);
  const [openEditSchedule, setOpenEditSchedule] = useState(false);
  const [openComplete, setOpenComplete] = useState(false);
  const [scheduleForm] = Form.useForm<any>();
  const [editScheduleForm] = Form.useForm<any>();
  const [completeForm] = Form.useForm<any>();
  const [isLoading, setIsLoading] = useState(false);
  const token = Cookies.get('token') ?? '';
  const onSelect = (newValue: Dayjs, selectInfo: SelectInfo) => {
    if (selectInfo.source === SELECT_INFO_CALENDAR.DATE) {
      setSelectDate(newValue);
      const currentLesson: any = schedules.find(
        (item: any) => item.date === newValue.format('YYYY-MM-DD')
      );

      if (currentLesson) {
        setLesson(currentLesson);
        completeForm.setFieldValue(
          'vocabulary',
          currentLesson?.number_word_completed
        );
        completeForm.setFieldValue(
          'listening',
          currentLesson?.listening_checked
        );
        completeForm.setFieldValue('reading', currentLesson?.reading_checked);
        setOpenComplete(true);
        return;
      }

      setOpenSchedule(true);
    }
  };
  const onPanelChange = (newValue: Dayjs) => {
    setSelectDate(newValue);
    callAPI(newValue);
  };

  //Modal schedule
  const handleScheduleOk = () => {
    scheduleForm.validateFields().then(() => {
      scheduleForm.setFieldValue('date', selectDate);
      scheduleForm.submit();
    });
  };
  const handleScheduleCancel = () => {
    setOpenSchedule(false);
  };

  //Modal edit schedule
  const handleEditScheduleOk = () => {
    editScheduleForm.validateFields().then(() => {
      editScheduleForm.submit();
    });
  };
  const handleEditScheduleCancel = () => {
    setOpenEditSchedule(false);
  };

  //Modal complete
  const handleCompleteOk = () => {
    completeForm.validateFields().then(() => {
      setOpenComplete(false);
      completeForm.submit();
    });
  };
  const handleCompleteCancel = () => {
    setOpenComplete(false);
  };

  //Calendar render
  const dateCellRender = (day: Dayjs) => {
    if (schedules.length === 0) return null;
    let cell = null;
    schedules.forEach((schedule: any) => {
      if (day.format('YYYY-MM-DD') === schedule.date) {
        cell = (
          <Flex gap="small" vertical>
            <Alert
              message={
                schedule.number_word_completed + '/' + schedule.number_word
              }
              type={
                schedule.number_word_completed === schedule.number_word
                  ? 'success'
                  : 'info'
              }
              showIcon
            />
            {!!schedule.is_study_grammar && (
              <Alert
                message="Grammar"
                type={schedule.grammar_checked ? 'success' : 'info'}
                showIcon
              />
            )}
            {!!schedule.is_study_listening && (
              <Alert
                message="Listening"
                type={schedule.listening_checked ? 'success' : 'info'}
                showIcon
              />
            )}
            {!!schedule.is_study_reading && (
              <Alert
                message="Reading"
                type={schedule.reading_checked ? 'success' : 'info'}
                showIcon
              />
            )}
          </Flex>
        );
      }
    });

    return cell;
  };
  const cellRender: CalendarProps<Dayjs>['cellRender'] = (current, info) => {
    if (info.type === 'date') return dateCellRender(current);
    return info.originNode;
  };

  const callAPI = async (date: Dayjs) => {
    setIsLoading(true);
    setSchedules([]);

    const startDate = date.startOf('month');
    const endDate = date.endOf('month');

    try {
      const res = await fetch(
        API_ENDPOINT +
          `schedules?start_date=${startDate.format('YYYY-MM-DD')}&end_date=${endDate.format('YYYY-MM-DD')}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + token,
            Accept: 'application/json',
          },
        }
      );
      const data = await res.json();
      setSchedules(data.data.lessons);
    } catch (err) {}
    setIsLoading(false);
  };

  useEffect(() => {
    if (isFirst) {
      setIsFirst(false);
      callAPI(dayjs());
    }
  });

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
            <Spin tip={`${t.loading}...`} spinning={isLoading}>
              <Calendar
                value={selectDate}
                onSelect={onSelect}
                onPanelChange={onPanelChange}
                cellRender={cellRender}
              />
            </Spin>
            <ModalSchedule
              date={selectDate}
              form={scheduleForm}
              open={openSchedule}
              handleOk={handleScheduleOk}
              handleCancel={handleScheduleCancel}
              callBackOnSuccess={() => {
                callAPI(selectDate);
                setOpenSchedule(false);
              }}
            />
            <ModalEditSchedule
              date={selectDate}
              form={editScheduleForm}
              open={openEditSchedule}
              handleOk={handleEditScheduleOk}
              handleCancel={handleEditScheduleCancel}
              callBackOnSuccess={() => {
                callAPI(selectDate);
                setOpenEditSchedule(false);
              }}
            />
            <ModalComplete
              date={selectDate}
              lesson={lesson}
              form={completeForm}
              open={openComplete}
              handleOk={handleCompleteOk}
              handleCancel={handleCompleteCancel}
              handleEditSchedule={() => {
                editScheduleForm.setFieldValue('date', selectDate);
                editScheduleForm.setFieldValue(
                  'time',
                  dayjs(dayjs().format('YYYY-MM-DD ') + lesson?.time_start)
                );
                editScheduleForm.setFieldValue(
                  'vocabulary',
                  lesson?.number_word
                );
                editScheduleForm.setFieldValue(
                  'grammar',
                  lesson?.is_study_grammar
                );
                editScheduleForm.setFieldValue(
                  'listening',
                  lesson?.is_study_listening
                );
                editScheduleForm.setFieldValue(
                  'reading',
                  lesson?.is_study_reading
                );
                setOpenComplete(false);
                setOpenEditSchedule(true);
              }}
              callBackOnSuccess={() => {
                setSchedules([...schedules]);
                setOpenComplete(false);
              }}
            />
          </div>
        </AppContent>
      </ConfigProvider>
    </>
  );
}
