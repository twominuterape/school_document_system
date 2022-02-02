const INITIAL_STATE = {
    username:"",
    password:"",
    appliedFor:[],
    tor_type:"",
    cert_type:"",
    studentDetails:{
        studnum:"",
        fname:"",
        lname:"",
        mname:"",
        entry_year:"",
        last_attn:"",
        gradStatus:"",
        year_graduated:"",
        degree:"",
        major:"",
        department:"",
        address:"",
        elem_school:"",
        elem_year:"",
        high_school:"",
        high_year:"",
        tertiary:"",
        admission:"Junior High School Report Card (JHS Form 138)",
        contact:"",
        email:"",
        claimtype:""
    },
    certifiedCopy:[],
    receiptCopy:[],
    docsPrice:[
        {type:'Diploma',price:'45.00'},
        {type:'Tor others',price:'195.00'},
        {type:'Certifications',price:'145.00'},
        {type:'CAV Credentials',price:'250.00'},
        {type:'transfer Credentials',price:'485.00'},
        {type:'Certified True Copy of Document',price:'30.00'},
    ]
}

const reqDocsReducer = (state = INITIAL_STATE,action)=>{
    switch(action.type){ 
        case 'passusername' :
            return{
                ...state,
                username:action.applyusername,
            }   
        case 'passpassword' :
            return{
                ...state,
                password:action.applypassword,
            }   
        case 'passApply' :
            return{
                ...state,
                appliedFor:action.applyDocs,
            }   
        case 'passTor' :
            return{
                ...state,
                tor_type:action.tor_selected,
            }    
        case 'passCert' :
            return{
                ...state,
                cert_type:action.cert_selected,
            }  
        case 'passStudForm' :
            return{
                ...state,
                studentDetails:{
                    ...state.studentDetails,
                    ...action.studentdetails,
                },
                
            }  
        case 'passCertified' :
            return{
                ...state,
                certifiedCopy:action.certifiedImage,
            }  
        case 'passReceipt' :
            return{
                ...state,
                receiptCopy:action.receiptImage,
            }  
        case 'resetVAlue' :
            return{
                ...state,
                appliedFor:action.resetapply,
                tor_type:action.reset_tor,
                cert_type:action.reset_cert,
                studentDetails:action.reset_studform,
                certifiedCopy:action.reset_copy,
                receiptCopy:action.reset_receipt,
            }  
         
        default:
            return state;         
    }
};
export default reqDocsReducer;
