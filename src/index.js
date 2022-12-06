import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {Provider} from "react-redux";
import store from "./redux/store";
import Home from "./pages/home/home";
import LatestNews from "./pages/latest-news/latest-news";
import PopularNews from "./pages/popular-news/popular-news";
import { Route, Switch } from 'react-router-dom';
import {history} from "./redux/reducers";
import {ConnectedRouter} from "connected-react-router";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <App>
        <Switch>
          <Route path="/" exact>
            <Home />
          </Route>
          <Route path="/latest-news" exact>
            <LatestNews />
          </Route>
          <Route path="/popular-news" exact>
            <PopularNews />
          </Route>
        </Switch>
      </App>
    </ConnectedRouter>
  </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
