import axios from 'axios'
interface USER {
    id:string
    UserName:string
    firstName:string
    lastName:string
    LastLogin:Date
    enabled:boolean
  }
// url to get user data from a fake backend api
const userURL = 'http://localhost:8080/users'
export async function LoadUsers(){
    const response = await axios.get(userURL);
    return response.data
    
}
export async function PostUser(user:any){
 const response =  axios.post('http://localhost:8080/users', {id:Math.random(),...user})
 return (await response).data
}