import {createStore, applyMiddleware, compose} from 'redux'
import thunk from 'redux-thunk';
import RootReducer from '../reducer/RootReducer'

//第二个参数是中间键，处理异步结果
export const store = createStore(RootReducer, applyMiddleware(thunk));


