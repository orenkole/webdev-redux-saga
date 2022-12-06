import { useSelector, useDispatch } from "react-redux";
import News from "../../components/news/news";
import {useEffect} from "react";
import {GET_POPULAR_NEWS} from "../../redux/constants";

const PopularNews = () => {
  const { popularNews } = useSelector(store => store?.news || {});
  const { popularNewsError } = useSelector(store => store?.errors || {});
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({type: GET_POPULAR_NEWS});
  }, [])

  return(
    <div>
      <News news={popularNews} error={popularNewsError} title="Popular News" />
    </div>
  );
};

export default PopularNews;
