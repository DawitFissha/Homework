import React from 'react';
import '@progress/kendo-theme-default/dist/all.css';
import './App.css';
import {UserList} from './userlist'
import {MyUser} from './Store/userstate'
const User = ()=>{
  
  return (
    <div className="App">
      <UserList user = {new MyUser()}/>
      
        {/* <ul>
          {
            user.userData.users.map((user)=>(
              <li>
                {user.UserName}
              </li>
            ))
          }
        </ul> */}
      
    </div>
  );
}
function App() {
return(
  <>
  <User/>
  </>
)
  
}

export default App;
