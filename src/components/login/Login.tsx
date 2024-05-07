'use client';
import React, { useEffect, useState } from 'react';
import { Button, ConfigProvider, Form, Input } from 'antd';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import './login.css';
import t from '@/dictionaries/en.json';
import Image from 'next/image';
import { API_ENDPOINT } from '../../constants';
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';

export default function Login() {
  const [formLogin] = Form.useForm<any>();
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const handleLogin = async (formValues: any) => {
    setIsLoading(true);
    const res = await fetch(API_ENDPOINT + 'auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify(formValues),
    });
    const data = await res.json();
    if (res.ok) {
      Cookies.set('token', data?.token, { expires: 7 });
      router.push('/');
      return;
    }

    formLogin.setFields([
      {
        name: 'password',
        errors: [data.message],
      },
    ]);
    setIsLoading(false);
  };

  useEffect(() => {
    if (Cookies.get('token')) {
      router.push('/');
    }
  });

  return (
    <ConfigProvider
      theme={{
        components: {
          Input: {
            paddingInline: 0,
          },
        },
        token: {
          colorText: 'white',
          colorIcon: 'white',
        },
      }}
    >
      <div className="login">
        <Image
          src="/login-bg-3.jpg"
          alt="login"
          className="login__img"
          layout="fill"
        />

        <Form
          form={formLogin}
          className="login__form"
          style={{ fontSize: 16 }}
          onFinish={handleLogin}
        >
          <h1 className="login__title">{t.login}</h1>

          <div className="login__content">
            <div className="login__box">
              <UserOutlined />

              <div className="login__box-input">
                <Form.Item
                  name="username"
                  rules={[
                    { required: true, message: 'Please input your username!' },
                  ]}
                >
                  <Input
                    className="login__input"
                    id="login-email"
                    variant="borderless"
                    placeholder=" "
                    autoComplete="off"
                  />
                </Form.Item>
                <label htmlFor="login-email" className="login__label">
                  {t.email}
                </label>
              </div>
            </div>

            <div className="login__box">
              <LockOutlined />

              <div className="login__box-input">
                <Form.Item
                  name="password"
                  rules={[
                    { required: true, message: 'Please input your password!' },
                  ]}
                >
                  <Input.Password
                    className="login__input"
                    id="login-pass"
                    variant="borderless"
                    placeholder=" "
                  />
                </Form.Item>
                <label htmlFor="login-pass" className="login__label">
                  {t.password}
                </label>
              </div>
            </div>
          </div>

          <div className="login__check">
            <div className="login__check-group">
              <Input
                type="checkbox"
                className="login__check-input"
                id="login-check"
              />
              <label htmlFor="login-check" className="login__check-label">
                {t.rememberMe}
              </label>
            </div>

            {/*<a href="#" className="login__forgot">*/}
            {/*  Forgot Password?*/}
            {/*</a>*/}
          </div>

          <Button
            type="default"
            htmlType="submit"
            className="login__button"
            loading={isLoading}
          >
            {t.login}
          </Button>

          {/*<p className="login__register">*/}
          {/*  Don't have an account? <a href="#">Register</a>*/}
          {/*</p>*/}
        </Form>
      </div>
    </ConfigProvider>
  );
}
