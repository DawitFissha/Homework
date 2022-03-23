interface USER {
    UserName:string
    firstName:string
    lastName:string
    LastLogin:Date
    enabled:"Yes"|"No"
  }
// url to get user data from a fake backend api
const userURL = 'http://localhost:8080/users'
export async function LoadUsers(){
    const response = await fetch(userURL);
    const users = await response.json()
    return users;
    
}
export async function PostUser(user:USER){
const response = await fetch(userURL,{
    method:'POST',
    body:JSON.stringify(user),
    headers: {
        'Content-Type': 'application/json'
      }
    
});
const responseText = await response.text()
console.log(responseText)
}