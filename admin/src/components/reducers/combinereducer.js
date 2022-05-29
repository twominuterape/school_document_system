import {combineReducers} from 'redux'
import reqDocsReducer from './requestFormreducer'
import adminReducer from './adminReducer'
export default combineReducers({
    reqDocsReducer:reqDocsReducer,
    adminReducer:adminReducer
})