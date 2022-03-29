import * as React from 'react'
import { Button } from "@progress/kendo-react-buttons";
import { getter } from "@progress/kendo-react-common";
import {MyUser} from './Store/userstate'
import { observer } from 'mobx-react';
import {
    Form,
    Field,
    FormElement,
    FieldRenderProps,
    FormRenderProps,
    
    FieldWrapper,
  } from "@progress/kendo-react-form";
  import { Error } from "@progress/kendo-react-labels";
  import { Input,Checkbox} from "@progress/kendo-react-inputs"
  import {
    Dialog,
  } from "@progress/kendo-react-dialogs";
  
const UserNameGetter:any = getter("UserName")
const firstNameGetter:any = getter("firstName")
const lastNameGetter:any = getter("lastName")

const FormCheckbox = (fieldRenderProps:any) => {
    const {
      validationMessage,
      touched,
      id,
      valid,
      disabled,
      hint,
      optional,
      label,
      ...others
    } = fieldRenderProps;
  
    const showValidationMessage = touched && validationMessage;
    const fullLabel = (
      <span>
        {label}
        {optional ? <span className={"k-label-optional"}>(Optional)</span> : ""}
      </span>
    );
    
    const errorId = showValidationMessage ? `${id}_error` : "";
  
    return (
      <FieldWrapper>
        <Checkbox
          ariaDescribedBy={errorId}
          label={fullLabel}
          valid={valid}
          id={id}
          disabled={disabled}
          value={true}
          {...others}
        />
      </FieldWrapper>
    );
  };

const UserNameRegex: RegExp = new RegExp(/^(?=.*[a-zA-Z])(?=.*[0-9])[a-zA-Z0-9]+$/i);
const CustomInput = (fieldRenderProps: FieldRenderProps)=>{

    const { validationMessage, visited, ...others } = fieldRenderProps;
    return(
        <div style={{marginTop:'10px'}}>
      <Input {...others} 
    />
      {visited && validationMessage && <Error>{validationMessage}</Error>}
    </div>
    )
}



const UserForm = observer(
  ({user,closeDialog}:{user:MyUser,closeDialog:()=>void})=> {

    const handleSubmit = (dataItem: { [name: string]: any }) => {
      user.addUsers({...dataItem,LastLogin:new Date()})
      closeDialog()
    }
    const formValidator = (values:any)=>{
      if(UserNameGetter(values)&&firstNameGetter(values)&&lastNameGetter(values)){
          let result = {
              ["UserName"]:"",
              ["firstName"]:"",
              ["lastName"]:"",    
              VALIDATION_SUMMARY:""
          }
          if(!UserNameRegex.test(UserNameGetter(values))){
              result['UserName'] = "only alphanumeric strings are allowed"
              }
          else if(user.AlreadyExists(UserNameGetter(values))>=1){
            result['UserName'] = "UserName already Exists"
          }
          else if(UserNameGetter(values).length>15){
              
                  result["UserName"]= "UserName can not excede 15 characters"
              }
          else if(firstNameGetter(values).length>25){
              
                 result ["firstName"] = "first name can not excede 25 characters"
              
              
          }
          else if(lastNameGetter(values).length>25){
              
                  result["lastName"] = "last name can not excede 25 characters"
              
              
          }
          else if((firstNameGetter(values).length+lastNameGetter(values).length)>40){
              
              result.VALIDATION_SUMMARY = "first name and last name together can't excede 40 characters"
              
          }
          return result
      }
      return {
          
          ["UserName"]:
          "This field is required.",
          ["firstName"]:
            "This field is required.",
          ["lastName"]:
            "This field is required.",
        };
  }   
 
  
      return(
          <Form 
          validator = {formValidator}
          onSubmit = {handleSubmit}
          initialValues = {{
            enabled:false,
          }}
          render={(formRenderProps:FormRenderProps)=>(
              <FormElement style={{minWidth:600}} >
  
  
                  <Field
                  name={"UserName"}
                  component={CustomInput}
                  label={"User Name"}
                />
                   <Field
                  name={"firstName"}
                  component={CustomInput}
                  label={"First Name"}

                  />
                   <Field
  
                  name={"lastName"}
                  component={CustomInput}
                  label={"Last Name"}
                  />
                  <Field
                  name={"enabled"}
                  component={FormCheckbox}
                  label = {"Enabled"}
                  value={formRenderProps.valueGetter("enabled")}
                  />
                  {formRenderProps.visited &&
                formRenderProps.errors &&
                formRenderProps.errors.VALIDATION_SUMMARY && (
                  <div style= {{marginTop:'10px'}} className={"k-messagebox k-messagebox-error"}>
                    {formRenderProps.errors.VALIDATION_SUMMARY}
                  </div>
                )}
              <Button style={{marginTop:'15px',marginLeft:'200px'}} disabled = {!formRenderProps.allowSubmit} type="submit"  themeColor={"primary"} icon="save">Save</Button>
              </FormElement>
              
          )}
          >   
          </Form>
      )
  }
)
export const NewUserDialog = ({user}:{user:MyUser})=>{
  const [visibleDialog, setVisibleDialog] = React.useState<boolean>(false);
  const toggleDialog = () => {
    setVisibleDialog(!visibleDialog);
  };
    return(
      <>
        <div style = {{margin:'15px'}}>
        {
          !visibleDialog&&(
            <Button onClick = {toggleDialog} themeColor={"primary"} icon="add">Add New User</Button>
          )
        }
        {
          visibleDialog&&(
            <Dialog style = {{minWidth:'500px'}} title = {"add new user"} onClose = {toggleDialog}>
                <UserForm closeDialog = {toggleDialog} user={user}/>
            </Dialog>
          )
        }
        </div>  
        </>
    )
}