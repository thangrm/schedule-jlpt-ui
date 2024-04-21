'use client';
import React from 'react';
import { ConfigProvider, Input } from 'antd';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import './login.css';
import t from '@/dictionaries/en.json';
import Image from 'next/image';

export const Login: React.FC = () => (
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
        // src="/login-bg-1.png"
        alt="login"
        className="login__img"
        layout="fill"
      />

      <form action="" className="login__form">
        <h1 className="login__title">{t.login}</h1>

        <div className="login__content">
          <div className="login__box">
            <UserOutlined />

            <div className="login__box-input">
              <Input
                className="login__input"
                id="login-email"
                variant="borderless"
                placeholder=" "
              />
              <label htmlFor="login-email" className="login__label">
                {t.email}
              </label>
            </div>
          </div>

          <div className="login__box">
            <LockOutlined />

            <div className="login__box-input">
              <Input.Password
                className="login__input"
                id="login-pass"
                variant="borderless"
                placeholder=" "
              />
              <label htmlFor="login-pass" className="login__label">
                {t.password}
              </label>
            </div>
          </div>
        </div>

        <div className="login__check">
          <div className="login__check-group">
            <input
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

        <button type="submit" className="login__button">
          {t.login}
        </button>

        {/*<p className="login__register">*/}
        {/*  Don't have an account? <a href="#">Register</a>*/}
        {/*</p>*/}
      </form>
    </div>
  </ConfigProvider>
);
