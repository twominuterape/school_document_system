const INITIAL_STATE = {
  masterList : [],
  page:0,
  loginData:[]
}

const reqDocsReducer = (state = INITIAL_STATE,action)=>{
    switch(action.type){ 
    
        case 'onChangeAdminRedicer' :
            return{
                ...state,
               ...action.data
            }  
         
        default:
            return state;         
    }
};
export default reqDocsReducer;