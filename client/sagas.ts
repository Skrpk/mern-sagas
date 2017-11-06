
import rootPostSaga from './modules/Post/postSagas';

export default function* rootSaga(): any {
  yield rootPostSaga();
}
