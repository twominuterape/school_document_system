import {combineReducers} from 'redux'
import reqDocsReducer from './requestFormreducer'
import studData from './studentRed'
export default combineReducers({
    reqDocsReducer:reqDocsReducer,
    studData:studData,
})