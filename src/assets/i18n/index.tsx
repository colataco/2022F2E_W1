// @ts-ignore
import React from 'react';
import { createIntl, createIntlCache, RawIntlProvider } from 'react-intl';
import flat from 'flat';
import zhTW from 'antd/lib/locale/zh_TW';
import enUS from 'antd/lib/locale/en_US';
import zh_TW from './zh-TW.json';
import en_US from './en-US.json';

const detectBrowserLanguage = () => {
  let lang;

  if (localStorage.getItem('language')) {
    lang = localStorage.getItem('language');
  } else {
    lang = navigator.language ? navigator.language : 'zh-TW';
    localStorage.setItem('language', lang);
  }

  return lang || 'zh-TW';
};

export const getMessage = (lang: string): any =>
  lang === 'en-US' ? flat(en_US) : flat(zh_TW);

export const getAntdMessage = (lang: string): any =>
  lang === 'en-US' ? enUS : zhTW;

const cache = createIntlCache();

export const intl = () =>
  createIntl(
    {
      locale: detectBrowserLanguage(),
      messages: getMessage(detectBrowserLanguage()),
    },
    cache
  );
