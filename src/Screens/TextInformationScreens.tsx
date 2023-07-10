import React from 'react';
import TextInformationScreen from './TextInformationScreen';
import {translate} from '../Translations';

export const GuideScreen = () => {
  return (
    <TextInformationScreen
      text={translate('user_guide_text')}
      header={translate('user_guide')}
    />
  );
};

export const TermsAndConditionsScreen = () => {
  return (
    <TextInformationScreen
      text={translate('not_implement')}
      header={translate('terms_and_conditions')}
    />
  );
};
