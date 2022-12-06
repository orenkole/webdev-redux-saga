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
