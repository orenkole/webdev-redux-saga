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
