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
