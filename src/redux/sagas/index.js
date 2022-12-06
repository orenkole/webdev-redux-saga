import {takeLatest, put, call, select, fork, join} from "redux-saga/effects";
import {SET_LATEST_NEWS_ERROR, SET_LOADING_DATA, SET_POPULAR_NEWS_ERROR} from "../constants";
import {getLatestNews, getPopularNews} from "../../api";
import {setLatestNews, setPopularNews} from "../actions/actionCreators";
import {LOCATION_CHANGE} from "connected-react-router";

export function* handleLatestNews() {
  try {
    const {hits} = yield call(getLatestNews, 'react');
    yield put(setLatestNews(hits))
  } catch(e) {
    yield put({type: SET_LATEST_NEWS_ERROR, payload: 'Error fetching latest news'})
  }
}

export function* handlePopularNews() {
  try {
    const {hits} = yield call(getPopularNews());
    yield put(setPopularNews(hits));
  } catch (e) {
    yield put({type: SET_POPULAR_NEWS_ERROR, payload: 'Error fetching popular news'})
  }
}

export function* watchNewsSaga() {
  yield put({type: SET_LOADING_DATA, payload: true})
  const path = yield select(({router}) => router.location.pathname);
  if (path === '/popular-news') {
    yield call(handlePopularNews)
  }
  if (path === '/latest-news') {
    yield call(handleLatestNews);
  }
  yield put({type: SET_LOADING_DATA, payload: false})
}

export function* loadTest() {
  const {hits} = yield call(getPopularNews);
  return hits;
}

export default function* rootSaga() {
  yield takeLatest(LOCATION_CHANGE, watchNewsSaga);
  const news = yield fork(loadTest);
  const result = yield join(news);
  console.log(' --- RESULT --- ', result);
}
