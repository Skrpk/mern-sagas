import { enabledLanguages, localizationData } from '../../../Intl/setup';
import { SWITCH_LANGUAGE } from './IntlActions';
import { Intl } from './IntlModel';

const globalAny:any = global;

const initLocale = globalAny.navigator && globalAny.navigator.language || 'en';
const createIntialState = (): Intl => ({
  enabledLanguages: enabledLanguages,
  locale: initLocale,
  ...(localizationData[initLocale] || {}),
});

const IntlReducer = (state = createIntialState(), action: { type: string }) => {
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
