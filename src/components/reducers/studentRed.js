const INITIAL_STATE = {
    studentRecords:"",
}

const studData = (state = INITIAL_STATE,action)=>{
    switch(action.type){ 
        case 'passStudRecords' :
            return{
                ...state,
                studentRecords:action.passStudents,
            }  
         
        default:
            return state;         
    }
};
export default studData;
