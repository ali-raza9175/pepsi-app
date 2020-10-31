import axios from "axios";

const api = axios.create({
baseURL : "http://localhost:5000/api/user"
});



export default  {
  addUser :  (data , callback) =>{
    api.post('', data)
        .then(result => {
          if(result.status == 200 && result.data && result.data.success !=0)
          {            

            callback(result.data);
          }
          else if(result.status == 200 && result.data && result.data.success !=0) {
            callback(null);

          }else{
            callback(null);
          }
        });
  },
  updateUser :  (data , callback) =>{
    api.patch(``, data)
        .then(result => {
          if(result.status == 200 && result.data && result.data.success !=0)
          {            

            callback(result.data);
          }
          else if(result.status == 200 && result.data && result.data.success !=0) {
            callback(null);

          }else{
            callback(null);
          }
        });
  },
    getUsers: (callback , token) =>{
              api.get("",{
                headers: {
                  authorization: `Bearer ${token}`
                }
              }).then((result)=>{
                if(result.status == 200 && result.data && result.data.success !=0)
                {            
                  callback(result.data.data)
                }
                else{
                  callback(null);
                }            
              });
      },
      
    getUserById: (id,callback) =>{
            api.get(`/${id}`,{}).then((result)=>{
              if(result.status == 200 && result.data && result.data.success !=0)
              {            
                callback(result.data.data)
              }
              else{
                callback(null);
              }            
            });
      },
      login: (data , callback)=>{
        console.log(data );
        api.post('login', data)
        .then(result => {
          if(result.status == 200 && result.data && result.data.success !=0)
          {            

            callback(result.data);
          }
          else if(result.status == 200 && result.data && result.data.success !=0) {

          }else{
            callback(null);
          }
        });

      }
    };