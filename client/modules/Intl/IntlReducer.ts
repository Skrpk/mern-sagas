import { enabledLanguages, localizationData } from '../../../Intl/setup';
import { SWITCH_LANGUAGE } from './IntlActions';
import { Intl } from './IntlModel';

const initLocale = global.navigator && global.navigator.language || 'en';
const createIntialState = (): Intl => ({
  enabledLanguages,
  locale: initLocale,
  ...(localizationData[initLocale] || {}),
});

const IntlReducer = (state = createIntialState(), action) => {
  switch (action.type) {
    case SWITCH_LANGUAGE: {
      const { type, ...actionWithoutType } = action;
      return { ...state, ...actionWithoutType };
    }

    default:
      return state;
  }
};

export default IntlReducer;
