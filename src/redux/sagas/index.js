import {takeEvery, put, call} from "redux-saga/effects";
import {GET_LATEST_NEWS} from "../constants";
import {getLatestNews} from "../../api";
import {setLatestNews} from "../actions/actionCreators";

export function* handleLatestNews() {
  const {hits} = yield call(getLatestNews, 'react');
  yield put(setLatestNews(hits))
  yield;
}

export function* watchClickSaga() {
  yield takeEvery(GET_LATEST_NEWS, handleLatestNews);
}

export default function* rootSaga() {
  yield watchClickSaga()
}
