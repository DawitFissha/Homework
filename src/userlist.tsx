import * as React from 'react'
import { observer } from 'mobx-react';
import {MyUser} from './Store/userstate'
import { Grid,
    GridColumn as Column,
    GridFilterChangeEvent,
    GridDataStateChangeEvent,
    GridRowProps,
    } from "@progress/kendo-react-grid";
    import { process, State,filterBy,CompositeFilterDescriptor,} from "@progress/kendo-data-query";
    const initialFilter: CompositeFilterDescriptor = {
        logic: "and",
        filters: [{ field: "UserName", operator: "contains", value: "" }],
      };
const FullNameCell = (props:any)=>(
    <td>
        {
            `${props.dataItem[props.field]} ${props.dataItem['lastName']}`
        }
    </td>
)
const EnabledCell = (props:any)=>(
    <td>
        {
            props.dataItem[props.field]?"Yes":"No"
            }
    </td>
)
const rowRender = (trElement:React.ReactElement<HTMLTableRowElement>,props:GridRowProps)=>{
const enabled  = props.dataItem.enabled
const red = { backgroundColor: "#FF0000"}
const trProps:any = {style:enabled===false?red:{}} //?????
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

        const [dataState,setDataState] = React.useState<State>(initialDataState)
        const [filter, setFilter] = React.useState(initialFilter);
        console.log(user.userData.users)
        return(
            <div>
                
                <Grid
                    style={{
                        height: "auto",
                    }}
                    rowRender={rowRender}
                    data={process(filterBy(user.userData.users,filter),dataState)}
                    sortable={true}
                    filterable = {true}
                    {...dataState}
                    filter={filter}
                    onFilterChange={(e: GridFilterChangeEvent) => setFilter(e.filter)}
                    onDataStateChange = {
                        (e:GridDataStateChangeEvent)=>{
                            setDataState(e.dataState);
                        }
                    }
                    
        >
        <Column field="UserName" title="User Name" width="250px" />   
        <Column field="firstName" title="Full Name" width="250px" cell={FullNameCell} filterable={false}/>
        <Column field="LastLogin" title="last login" editor="date" format="{0:d}" filterable={false} />
        <Column field="enabled" title="Enabled" cell = {EnabledCell} filterable={false}/>
        </Grid>
            </div>
        )
    }
)