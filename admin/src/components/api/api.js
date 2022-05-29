import axios from "axios"
// import swal from "sweetalert/dist/sweetalert.min.js";
// let serverurl = "http://api.pacificweb.com.ph/"; 
let serverurl = "http://beta.gzonetechph.com/"; 
// let serverurl ="http://192.168.0.9/backend/api/";
// let serverurl ="http://192.168.0.10/backend/api.workflow/";
// let serverurl = "http://beta.api.pacificweb.com.ph/";
// let serverurl ="http://192.168.60.118/api/";
// let serverurl ="https://api.workflow.gzonetechph.com/";
// let serverurl ="http://api.workflow.gzonetechph.com/";
// let key = "?key=PocketHR@20190208&type=web";
// let key2 = "?key=12345ABCFleet";
const config = {
    headers: {
        'authorization':"eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6MSwib3RoZXIiOltdLCJBUElfVElNRSI6MTY0MTgxNzM2MX0.fUqMFZDcYqIS8cDS5O-UnsZptOYSSyi8YOkOS7wDdU0",
        'Accept' : 'application/json',
        'Content-Type': 'application/json'
    }
};  
export function getData(method, param) {
    return new Promise((resolve, reject) => {
        axios
            .post(serverurl + method , {
                param
            },config)
            .then(res => {
                resolve(res.data);
            });
    });
}





 