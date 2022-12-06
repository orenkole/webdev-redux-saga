import {combineReducers} from "redux";
import {news} from "./news";
import {errors} from "./errors";
import {createBrowserHistory} from "history";
import {connectRouter} from "connected-react-router";
import {loader} from "./loader";

export const history = createBrowserHistory();

const reducer = combineReducers({
  news,
  errors,
  loader,
  router: connectRouter(history)
})

export default reducer;
