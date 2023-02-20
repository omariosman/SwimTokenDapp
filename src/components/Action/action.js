import {
    getRequest,
    postRequest,
    putRequest,
    deleteRequest,
    postRequestFormData,
  } from "../coreFIles/helper";
  
  export const LoginAction = (data) => {
    return postRequest("adminLogin", data).then((res) => {
      return res.data;
    });
  };
  
  export const getsoldListAction=(data)=>{
    return postRequest("getsoldtoken",data).then((res)=>{
      return res.data;
    });
  }
  
  export const getsoldtokenbyidListAction=(data)=>{
    return postRequest("getsoldtokenbyid",data).then((res)=>{
      return res.data;
    });
  }
  
  export const updatesoldtokenAction=(data)=>{
    return postRequest("updatesoldtoken",data).then((res)=>{
      return res.data;
    });
  }
  
  
  