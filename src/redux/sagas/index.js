import {takeEvery} from "redux-saga/effects";
import {GET_LATEST_NEWS} from "../constants";
import {getLatestNews} from "../../api";

export function* workSaga() {
  const data = yield getLatestNews();
  console.log(' --- DATA --- ', data);
  yield;
}

export function* watchClickSaga() {
  yield takeEvery(GET_LATEST_NEWS, workSaga);
}

export default function* rootSaga() {
  yield watchClickSaga()
}
