import React from 'react';
import '@progress/kendo-theme-default/dist/all.css';
import './App.css';
import {UserList} from './userlist'
import {MyUser} from './Store/userstate'
import {NewUserDialog} from './userdialog'
function App() {
  const user = new MyUser()
  React.useEffect(()=>{
    user.getUsersFromServer()
},[user])
return(
  
 <> 
 <h2 style = {{margin:'15px'}}>User list</h2>
  <div>
      <UserList user = {user}/>
      <NewUserDialog user = {user}/>
    </div>
    </>
)
  
}

export default App;
