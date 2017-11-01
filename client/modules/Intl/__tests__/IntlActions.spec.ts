const test = require('ava');
const actionTest = require('redux-ava').actionTest;

import {
  SWITCH_LANGUAGE,
  switchLanguage,
} from '../IntlActions';
import { localizationData } from '../../../../Intl/setup';

const lang = 'en';

test('should return the correct type for switchLanguage', actionTest(
  switchLanguage,
  lang,
  { type: SWITCH_LANGUAGE, ...localizationData[lang] },
));
