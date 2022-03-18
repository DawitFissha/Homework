import * as React from 'react'
import { Grid, GridColumn as Column } from "@progress/kendo-react-grid";
import users from './user.json'
 export const UserList = ()=>{
    return(
        <div>
            <h2>User list</h2>
            <Grid
    style={{
        height: "400px",
    }}
    data={users}
    >
    <Column field="UserName" title="User Name" width="250px" />   
    <Column field="firstName" title="First Name" width="250px" />
    <Column field="lastName" title="Last Name" />
    <Column field="enabled" title="Enabled" />
    </Grid>
        </div>
    )
}