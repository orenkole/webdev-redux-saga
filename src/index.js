import React from 'react';
import ReactDOM from 'react-dom/client';
import {createBrowserHistory} from 'history';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {Provider} from "react-redux";
import store from "./redux/store";
import Home from "./pages/home/home";
import LatestNews from "./pages/latest-news/latest-news";
import PopularNews from "./pages/popular-news/popular-news";
import { Route, Switch, Router } from 'react-router-dom';

const history = createBrowserHistory();
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <Router history={history}>
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
    </Router>
  </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
