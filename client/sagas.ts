import 'regenerator-runtime/runtime';

import rootPostSaga from './modules/Post/postSagas';

export default function* rootSaga() {
  yield rootPostSaga();
}
