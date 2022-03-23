import {makeAutoObservable,action} from 'mobx'
import {LoadUsers} from '../fakeServer/server'
 interface USER {
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
        // this.user = LoadUsers().then(data=>(data as USER[]))

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
    ParseJsonDate(){
        this.userData.users = this.userData.users.map((user)=>(
            {...user,LastLogin:'haha'}
        ))
    }
   
}
// export const myUser = new User()
