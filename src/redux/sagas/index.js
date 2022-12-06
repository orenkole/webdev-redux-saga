import {takeEvery, put, call, fork} from "redux-saga/effects";
import {GET_NEWS} from "../constants";
import {getLatestNews, getPopularNews} from "../../api";
import {setLatestNews, setPopularNews} from "../actions/actionCreators";

export function* handleLatestNews() {
  const {hits} = yield call(getLatestNews, 'react');
  yield put(setLatestNews(hits))
}

export function* handlePopularNews() {
  const {hits} = yield call(getPopularNews());
  yield put(setPopularNews(hits));
}

export function* handleNews() {
  yield fork(handleLatestNews);
  yield fork(handlePopularNews);
}

export function* watchClickSaga() {
  yield takeEvery(GET_NEWS, handleNews);
}

export default function* rootSaga() {
  yield watchClickSaga()
}
