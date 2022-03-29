import axios from 'axios'
// url to get user data from a fake backend api
const userURL = 'http://localhost:8080/users'
export async function LoadUsers(){
    const response = await axios.get(userURL);
    return response.data
    
}
export async function PostUser(user:any){
 const response =  axios.post('http://localhost:8080/users', {id:String(Math.random()),...user})
 return (await response).data
}
export async function UpdateUser(user:any) {
  const response =  axios.put(`http://localhost:8080/users/${user.id}/`, user)

  return (await response).data
 
}