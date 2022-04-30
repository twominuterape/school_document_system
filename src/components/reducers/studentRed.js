const INITIAL_STATE = {
    studentRecords:"",
    histories:[],
    studentRecover:{
        fname:"",
        mname:"",
        lname:"",
        birthdate:"",
        gender:"",
        department:"",
        yearGraduated:"",
        email_rec:""
    },
    availableCourse:[],
    availableDept:[]
}

const studData = (state = INITIAL_STATE,action)=>{
    switch(action.type){ 
        case 'passStudRecords' :
            return{
                ...state,
                studentRecords:action.passStudents,
            }  
        case 'student_records_':
            return {
                ...state,
                ...action.data
            }
        default:
            return state;         
    }
};
export default studData;
