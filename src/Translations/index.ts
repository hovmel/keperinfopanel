import * as RNLocalize from 'react-native-localize';
import i18n from 'i18n-js';
import memoize from 'lodash.memoize';
import {I18nManager} from 'react-native';

export const translationGetters = {
  en: () => require('./en.json'),
  ru: () => require('./en.json'),
};

export const translate = memoize(
  (key, config) => i18n.t(key, config),
  (key, config) => (config ? key + JSON.stringify(config) : key),
);

//export const getCurrentLanguage = () => i18n.locale;
export const getCurrentLanguage = () => 'en';

export const setI18nConfig = () => {
  const fallback = {languageTag: 'en', isRTL: true};

  let {languageTag, isRTL} =
    RNLocalize.findBestAvailableLanguage(Object.keys(translationGetters)) ||
    fallback;
  languageTag = 'en';
  translate.cache.clear();
  // update layout direction
  I18nManager.forceRTL(isRTL);

  i18n.missingTranslation = key => {
    return key;
  };

  // set i18n-js config
  i18n.translations = {[languageTag]: translationGetters[languageTag]()};
  i18n.locale = languageTag;
};

import React from 'react';
import {useSelector} from 'react-redux';
import texts from './texts.json';
import {langSelector} from '../models/user/selectors';
import AsyncStorage from '@react-native-async-storage/async-storage';

const useTranslation = () => {
  const lang = useSelector(langSelector);

  return {
    t: code => t(code, lang),
    lang,
  };
};

export default useTranslation;

export const t = (code, lang) => {
  if (!code) {
    return '';
  }
  if (!lang) {
    lang = AsyncStorage.getItem('lang');
  }

  const textsBlock = texts[code];
  if (!textsBlock) {
    return `&${code}`;
  }

  return textsBlock[lang] || textsBlock.en || `&${code}`;
};
