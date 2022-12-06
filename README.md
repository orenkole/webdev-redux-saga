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
