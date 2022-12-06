import logo from './logo.svg';
import './App.css';
import {useDispatch, useSelector} from "react-redux";
import {decreaseCount, increaseCount, getLatestNews} from "./redux/actions/actionCreators";

function App() {
  const dispatch = useDispatch();
  const count = useSelector(state => state?.counter?.count)

  const handleIncrease = () => {
    dispatch(increaseCount())
  }

  const handleDecrease = () => {
    dispatch(decreaseCount())
  }

  const handleNews = () => {
    dispatch(getLatestNews());
  }

  return (
    <div>
      <button onClick={handleDecrease}>-1</button>
      <span>{count}</span>
      <button onClick={handleIncrease}>+1</button>
      <button onClick={handleNews}>Get news</button>
    </div>
  );
}

export default App;
