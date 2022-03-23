import * as React from 'react'
import { observer } from 'mobx-react';
import {MyUser} from './Store/userstate'
import { Grid,
    GridColumn as Column,
    GridDataStateChangeEvent,
    GridRowProps,
    } from "@progress/kendo-react-grid";
    import { process, State } from "@progress/kendo-data-query";
// import {users} from './user'
const rowRender = (trElement:React.ReactElement<HTMLTableRowElement>,props:GridRowProps)=>{
const enabled  = props.dataItem.enabled
const red = { backgroundColor: "#FF0000"}
const trProps:any = {style:enabled==="No"?red:{}} //?????
return React.cloneElement(
    trElement,
    { ...trProps },
    trElement.props.children
  );
}
const initialDataState: State = {
    sort: [{ field: "code", dir: "asc" }],
  };
export const UserList = observer(
    ({user}:{user:MyUser})=>{
        React.useEffect(()=>{
            // LoadUsers()
            user.getUsersFromServer()
            // user.ParseJsonDate()
            
          },[user])
          console.log(user.userData.users)
        const [dataState,setDataState] = React.useState<State>(initialDataState)
        return(
            <div>
                <h2>User list</h2>
                <Grid
                    style={{
                        height: "400px",
                    }}
                    rowRender={rowRender}
                    data={process(user.userData.users,dataState)}
                    sortable={true}
                    {...dataState}
                    onDataStateChange = {
                        (e:GridDataStateChangeEvent)=>{
                            setDataState(e.dataState);
                        }
                    }
                    
        >
        <Column field="UserName" title="User Name" width="250px" />   
        <Column field="firstName" title="First Name" width="250px" />
        <Column field="lastName" title="Last Name" />
        <Column field="LastLogin" title="last login" editor="date" format="{0:d}" />
        <Column field="enabled" title="Enabled" />
        </Grid>
            </div>
        )
    }
)