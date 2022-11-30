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
