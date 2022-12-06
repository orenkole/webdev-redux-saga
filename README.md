## 2. Установка и настройка окружения (Setup Environment)

```d
npm i redux react-redux redux-saga
```

_webdev-redux-saga/src/redux/store.js_
```js
import {createStore, compose} from "redux";
import reducer from "./reducers";

const composeEnhancers =
  typeof window === 'object' &&
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({}) : compose;

const configureStore = preloadedState => createStore(
  reducer,
  preloadedState,
  composeEnhancers()
)

const store = configureStore({});

export default store;
```
_webdev-redux-saga/src/redux/reducers/index.js_
```js
import {combineReducers} from "redux";

const test = (state = {}, action) => {
  return state;
}

const reducer = combineReducers(({
  test
}))

export default reducer;
```

## 3. Интеграция Redux (Redux Integration)

_webdev-redux-saga/src/redux/constants.js_
```js
export const INCREASE_COUNT = 'INCREASE_COUNT';
export const DECREASE_COUNT = 'DECREASE_COUNT';
```

_webdev-redux-saga/src/redux/actions/actionCreators.js_
```js
import {DECREASE_COUNT, INCREASE_COUNT} from "../constants";

export const increaseCount = () => ({
  type: INCREASE_COUNT
})

export const decreaseCount = () => ({
  type: DECREASE_COUNT
})
```
_webdev-redux-saga/src/redux/reducers/counter.js_
```js
import {DECREASE_COUNT, INCREASE_COUNT} from "../constants";

export const counter = (state = {count: 0}, {type}) => {
  switch(type) {
    case INCREASE_COUNT:
      return {
        ...state,
        count: state.count + 1
      }
    case DECREASE_COUNT:
      return {
        ...state,
        count: state.count - 1
      }
    default:
      return state
  }
}
```

_webdev-redux-saga/src/redux/reducers/index.js_
```js
import {combineReducers} from "redux";
import {counter} from "./counter";

const reducer = combineReducers({
  counter
})

export default reducer;
```
_webdev-redux-saga/src/App.js_
```js
import logo from './logo.svg';
import './App.css';
import {useDispatch, useSelector} from "react-redux";
import {decreaseCount, increaseCount} from "./redux/actions/actionCreators";

function App() {
  const dispatch = useDispatch();
  const count = useSelector(state => state?.counter?.count)

  const handleIncrease = () => {
    dispatch(increaseCount())
  }

  const handleDecrease = () => {
    dispatch(decreaseCount())
  }

  return (
    <div>
      <button onClick={handleDecrease}>-1</button>
      <span>{count}</span>
      <button onClick={handleIncrease}>+1</button>
    </div>
  );
}

export default App;
```

## 4. Интеграция Redux-Saga (Redux-Saga Integration)

NOTE:  

_webdev-redux-saga/src/redux/store.js_
```js
const configureStore = preloadedState => createStore(
  reducer,
  preloadedState,
  composeEnhancers(applyMiddleware(sagaMiddleware))
)

const store = configureStore({});

sagaMiddleware.run(rootSaga); // run only after applyMiddleware
```

workerSaga - for async work
watcherSaga - watch for actions dispatch

_webdev-redux-saga/src/redux/sagas/index.js_
```js
export function* watchClickSaga() {
  yield take(INCREASE_COUNT);
  console.log('increase')
  yield take(DECREASE_COUNT);
  console.log('decrease')
}
```

We will not see 'decrease' until we don't dispatch INCREASE_COUNT, only after that we will be able to watch DECREASE_COUNT

---

_webdev-redux-saga/src/redux/store.js_
```js
import {createStore, compose, applyMiddleware} from "redux";
import createSagaMiddleware from 'redux-saga';
import reducer from "./reducers";
import rootSaga from "./sagas";

const sagaMiddleware = createSagaMiddleware(); // create saga middleware

const composeEnhancers =
  typeof window === 'object' &&
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({}) : compose;

const configureStore = preloadedState => createStore(
  reducer,
  preloadedState,
  composeEnhancers(applyMiddleware(sagaMiddleware)) // apply saga middleware
)

const store = configureStore({});

sagaMiddleware.run(rootSaga); // run root saga

export default store;
```

_webdev-redux-saga/src/redux/sagas/index.js_
```js
import {take} from "redux-saga/effects";
import {DECREASE_COUNT, INCREASE_COUNT} from "../constants";

export function* workSaga() {

}

export function* watchClickSaga() {
  yield take(INCREASE_COUNT);
  console.log('increase')
  yield take(DECREASE_COUNT);
  console.log('decrease')
}

export default function* rootSaga() {
  yield watchClickSaga()
}
```

## 5. Эффекты и запрос данных (Effects & Data Fetching)
_webdev-redux-saga/src/App.js_
```js
import {getLatestNews} from "./redux/actions/actionCreators";

const handleNews = () => {
  dispatch(getLatestNews());
}

<button onClick={handleNews}>Get news</button>
```
_webdev-redux-saga/src/redux/actions/actionCreators.js_
```js
export const getLatestNews = () => ({
  type: GET_LATEST_NEWS
})
```
_webdev-redux-saga/src/redux/sagas/index.js_
```js
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
```
_webdev-redux-saga/src/api/index.js_
```js
export const getLatestNews = async () => {
  const request = await fetch(`http://hn.algolia.com/api/v1/search?query=react`);
  return await request.json();
}
```
## 6. Сохранение данных в стор (Saving Data Into Redux-Store)

Declare action  
```js
export const SET_LATEST_NEWS = 'SET_LATEST_NEWS';
```

Action creator
```js
export const setLatestNews = (payload) => ({
  type: SET_LATEST_NEWS,
  payload
})
```

reducer
```js
import {SET_LATEST_NEWS} from "../constants";

const initialState = {
  latestNews: []
}

export const news = (state = initialState, {type, payload}) => {
  switch (type) {
    case SET_LATEST_NEWS:
      return {
        ...state,
        latestNews: [...state.latestNews, ...payload]
      }
    default:
      return state
  }
}
```
```js
import {combineReducers} from "redux";
import {counter} from "./counter";
import {news} from "./news";

const reducer = combineReducers({
  counter,
  news
})

export default reducer;
```

saga: use _call_ to call function that returns promise, _put_ to put result to redux
```js
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
```

## 7. Параллельные задачи (Parallel Tasks)

_call_ - is a blocking operation  
To fetch in parallel - use _fork_  

---

_all_, _race_ - analogs of Promise.all, Promise.race  

```js
export function* handleNews() {
  yield fork(handleLatestNews);
  yield fork(handlePopularNews);
}
```
vs  
```js
export function* handleNews() {
  yield all([
    call(handleLatestNews);
    call(handlePopularNews);
  ])
}
```

With _fork_ all requests are completely independent. With _all_ we'll get result when all requests are resolved.  If one of requests will fail, _all_ will return nothing.  

_race_ - only will return 1 result. Is used to terminate background task that waits some action.  

---

```js
import logo from './logo.svg';
import './App.css';
import {useDispatch, useSelector} from "react-redux";
import {getNews} from "./redux/actions/actionCreators";
import News from "./components/news/news";

function App() {
  const dispatch = useDispatch();
  const latestNews = useSelector(store => store?.news?.latestNews || []);
  const popularNews = useSelector(store => store?.news?.popularNews || []);

  const handleClick = () => {
    dispatch(getNews());
  }

  return (
    <div>
      <button onClick={handleClick}>Get news</button>
      <News news={latestNews} title="Latest news" />
      <News news={popularNews} title="Popular news" />
    </div>
  );
}

export default App;
```
```js
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
```
