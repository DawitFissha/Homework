import * as React from 'react'
import { useParams,useNavigate} from "react-router-dom";
import {observer} from 'mobx-react'
import { MyUser } from './Store/userstate';
import { Button } from "@progress/kendo-react-buttons";
import {
    Form,
    Field,
    FormElement,
    FieldRenderProps,
    FormRenderProps,
    
    FieldWrapper,
  } from "@progress/kendo-react-form";
  import { Input,Checkbox} from "@progress/kendo-react-inputs"
  import { Error } from "@progress/kendo-react-labels";
  import { getter } from "@progress/kendo-react-common";
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
const firstNameGetter:any = getter("firstName")
const lastNameGetter:any = getter("lastName")

export const  UserDetail = observer(
    ({user}:{user:MyUser})=> {
        React.useEffect(()=>{
            user.getUsersFromServer()
        },[])
        let params = useParams();
        const navigate = useNavigate()
        const singleUser = user.userData.users.find(user=>user.id===params.userId)
        console.log(singleUser)
        const formValidator = (values:any)=>{
          let result = {
            firstName:"",
            lastName:"",    
            VALIDATION_SUMMARY:""
        }
        
        if(firstNameGetter(values)){
                if(firstNameGetter(values).length>25){
                  
                  result.firstName = "first name can not excede 25 characters"
               }
    
              }
              if(lastNameGetter(values)){
                if(lastNameGetter(values).length>25){
                  
                  result.lastName= "last name can not excede 25 characters"
              }
              }
              if(firstNameGetter(values)&&lastNameGetter(values)){
                if((firstNameGetter(values).length+lastNameGetter(values).length)>40){
                  
                  result.VALIDATION_SUMMARY = "first name and last name together can't excede 40 characters"
                  
              }
              }
            
              if(!firstNameGetter(values)){
                result.firstName = "This field is required."
              }
              if(!lastNameGetter(values)){
                result.lastName = "This field is required."
              }
          return result
      }    
        const handleSubmit = (dataItem:{[name:string]:any}) => {
            // alert(JSON.stringify(dataItem, null, 2));  
            user.editUser({id:singleUser?.id,...dataItem,LastLogin:singleUser?.LastLogin})
            navigate('/')
        }
        
            return(
              singleUser?
              <div style={{marginLeft:'25%'}}>
                  <h1>User Information</h1>
              <Form 
                validator = {formValidator}
          onSubmit = {handleSubmit}
        initialValues={{
            UserName: singleUser.UserName,
            firstName:singleUser.firstName,
            lastName:singleUser.lastName,
            enabled:singleUser.enabled,
          }}
          render={(formRenderProps:FormRenderProps)=>(
              <FormElement style={{maxWidth:700}} >
  
  
                  <Field
                  disabled 
                  name={"UserName"}
                  component={CustomInput}
                  label={"User Name"}
                  value = {formRenderProps.valueGetter("UserName")}
                />
                   <Field
                  name={"firstName"}
                  component={CustomInput}
                  label={"First Name"}
                  value = {formRenderProps.valueGetter("firstName")}
                  />
                   <Field
  
                  name={"lastName"}
                  component={CustomInput}
                  label={"Last Name"}
                  value = {formRenderProps.valueGetter("lastName")}
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
              <Button style={{marginTop:'15px',marginLeft:'200px'}} disabled = {!formRenderProps.allowSubmit} type="submit"  themeColor={"primary"} icon="save">Update</Button>
              </FormElement>
              
          )}
          >  
           
          </Form>
          </div>
              :  <h1>User Not Found</h1>
            )
        }
)