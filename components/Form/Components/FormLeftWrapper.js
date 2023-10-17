import styled from 'styled-components';
import { FormState } from '../Form';
import { useContext } from 'react';

const FormLeftWrapper = () => {
  const Handler = useContext(FormState);

  return (
    <FormLeft>
      <FormInput>
        <label className='lab'>Campaign Title</label>
        <Input onChange={Handler.FormHandler} value={Handler.form.campaignTitle} placeholder='Campaign Title' name='campaignTitle'>
        </Input>
      </FormInput>
      <FormInput>
        <label className='lab1'>Story</label>
        <TextArea onChange={Handler.FormHandler} value={Handler.form.story} rows={10} name="story" placeholder='Describe Your Story'>
        </TextArea>
      </FormInput>
    </FormLeft>
  )
}

const FormLeft = styled.div`
  width:48%;
  margin-top:3%;
`

const FormInput = styled.div`
  display:flex ;
  flex-direction:column;
  font-family:'poppins';
  margin-top:10px ;

  .lab
  {
    font-size:20px;
    font-weight:500;
  }
  .lab1
  {
    margin-top:20px;
    font-size:20px;
    font-weight:500;
  }
  
`
const Input = styled.input`
  padding:15px;
  background-color:${(props) => props.theme.bgDiv} ;
  color:${(props) => props.theme.color} ;
  margin-top:4px;
  border:none ;
  border-radius:8px ;
  outline:none;
  font-size:large;
  width:100% ;
  border: 2px solid #AEC0FF;
  margin-top:20px;
`

const TextArea = styled.textarea`
  padding:15px;
 
  background-color:${(props) => props.theme.bgDiv} ;
  color:${(props) => props.theme.color} ;
  margin-top:4px;
  border:none;
  border-radius:8px ;
  outline:none;
  font-size:large;
  max-width:100%;
  min-width:100%;
  overflow-x:hidden;
  min-height:160px ;
  margin-top:20px;
  border: 2px solid #AEC0FF;
`

export default FormLeftWrapper;