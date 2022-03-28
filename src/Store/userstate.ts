import {makeAutoObservable,action} from 'mobx'
import {LoadUsers,PostUser} from '../fakeServer/server'
 interface USER {
    id:string
    UserName:string
    firstName:string
    lastName:string
    LastLogin:Date|string
    enabled:boolean
}
export interface UserState{
    users:USER[]
    state:'pending'|'done'|'error'
}
export class MyUser {
    userData:UserState = {
        users:[],
        state:'pending',
    }
    constructor(){
        makeAutoObservable(this)
}
    
    getUsersFromServer(){
        LoadUsers().then(
            action("success", (data:USER[]) => {
              this.userData.users = data
              .map((d:any)=>(
                {...d,LastLogin:new Date(d.LastLogin)}
              ))
            })
          );
    }
    AlreadyExists(username:string){
        return this.userData.users.filter(user=>user.UserName===username).length
   }
   addUsers(user:any){
    PostUser(user).then(
        action('added',(data:any)=>{
            this.userData.users = [...this.userData.users,{...data,LastLogin:new Date(data.LastLogin)}]
        })
    );
   }
}

