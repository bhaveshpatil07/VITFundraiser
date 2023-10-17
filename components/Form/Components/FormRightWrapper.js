// import styled from 'styled-components';
// import { FormState } from '../Form';
// import { useState, useContext } from 'react';
// import { toast } from 'react-toastify';
// import { TailSpin } from 'react-loader-spinner'
// import { create as IPFSHTTPClient } from 'ipfs-http-client';

// const projectId = process.env.NEXT_PUBLIC_IPFS_ID
// const projectSecret = process.env.NEXT_PUBLIC_IPFS_KEY
// const auth = 'Basic ' + Buffer.from(projectId + ":" + projectSecret).toString('base64')

// const client = IPFSHTTPClient({
//   host: 'ipfs.infura.io',
//   port: 5001,
//   protocol: 'https',
//   headers: {
//     authorization: auth
//   }
// })

// const FormRightWrapper = () => {
//   const Handler = useContext(FormState);

//   const [uploadLoading, setUploadLoading] = useState(false);
//   const [uploaded, setUploaded] = useState(false);

//   const uploadFiles = async (e) => {
//     e.preventDefault();
//     setUploadLoading(true);

//     if (Handler.form.story !== "") {
//       try {
//         const added = await client.add(Handler.form.story);
//         Handler.setStoryUrl(added.path)
//       } catch (error) {
//         toast.warn(`Error Uploading Story`);
//       }
//     }


//     if (Handler.image !== null) {
//       try {
//         const added = await client.add(Handler.image);
//         Handler.setImageUrl(added.path)
//       } catch (error) {
//         toast.warn(`Error Uploading Image`);
//       }
//     }

//     setUploadLoading(false);
//     setUploaded(true);
//     Handler.setUploaded(true);
//     toast.success("Files Uploaded Sucessfully")
//   }
import styled from 'styled-components';
import { FormState } from '../Form';
import { useState, useContext } from 'react';
import { toast } from 'react-toastify';
import { TailSpin } from 'react-loader-spinner';
import axios from 'axios';
import FormData from 'form-data';

const JWT = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySW5mb3JtYXRpb24iOnsiaWQiOiJhZmQ0NzRmZi1jZTZkLTRiMGYtODllYy1lODMxZWE0OTVjYTIiLCJlbWFpbCI6InZwMDA3MjAwM0BnbWFpbC5jb20iLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwicGluX3BvbGljeSI6eyJyZWdpb25zIjpbeyJpZCI6IkZSQTEiLCJkZXNpcmVkUmVwbGljYXRpb25Db3VudCI6MX0seyJpZCI6Ik5ZQzEiLCJkZXNpcmVkUmVwbGljYXRpb25Db3VudCI6MX1dLCJ2ZXJzaW9uIjoxfSwibWZhX2VuYWJsZWQiOmZhbHNlLCJzdGF0dXMiOiJBQ1RJVkUifSwiYXV0aGVudGljYXRpb25UeXBlIjoic2NvcGVkS2V5Iiwic2NvcGVkS2V5S2V5IjoiOTg5Yjg5NGE3ZDExODE1YmIxZTMiLCJzY29wZWRLZXlTZWNyZXQiOiI0MTQwNmQ1ZjY4YjVhZjYxOGEzY2VjZTM2Zjg0MzBhMDljNzFjODQ0YTRjZTkwNmYxN2RiMmUxZmJkYzc1YzE1IiwiaWF0IjoxNjk2NDk2OTU4fQ.XQEiKxivbBGN8uVHVh3CqyHOCnskPd6tZkch8ZbPUO0';

const pinFileToIPFS = async (dataToUpload, isText = false) => {
    const formData = new FormData();

    if (isText) {
        const blob = new Blob([dataToUpload], { type: "text/plain" });
        formData.append('file', blob, "story.txt");
    } else {
        formData.append('file', dataToUpload);
    }

    const pinataMetadata = JSON.stringify({
      name: isText ? 'Story' : 'Image',
    });
    formData.append('pinataMetadata', pinataMetadata);

    try {
        const res = await axios.post("https://api.pinata.cloud/pinning/pinFileToIPFS", formData, {
            maxBodyLength: "Infinity",
            headers: {
                'Content-Type': `multipart/form-data; boundary=${formData._boundary}`,
                Authorization: JWT
            }
        });
        return res.data.IpfsHash;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

const FormRightWrapper = () => {
  const Handler = useContext(FormState);
  const [uploadLoading, setUploadLoading] = useState(false);
  const [uploaded, setUploaded] = useState(false);

  const uploadFiles = async (e) => {
    e.preventDefault();
    setUploadLoading(true);

    if (Handler.form.story !== "") {
        try {
            const cid = await pinFileToIPFS(Handler.form.story, true); // true indicates it's text data
            Handler.setStoryUrl(cid);
        } catch (error) {
            toast.warn(`Error Uploading Story`);
        }
    }

    if (Handler.image !== null) {
        try {
            const cid = await pinFileToIPFS(Handler.image); // treated as file data
            Handler.setImageUrl(cid);
        } catch (error) {
            toast.warn(`Error Uploading Image`);
        }
    }

    setUploadLoading(false);
    setUploaded(true);
    Handler.setUploaded(true);
    toast.success("Files Uploaded Successfully");
  }

  return (
    <FormRight>
      <FormInput>
        <FormRow>
          <RowFirstInput>
            <label className='lab'>Required Amount</label>
            <Input onChange={Handler.FormHandler} value={Handler.form.requiredAmount} name="requiredAmount"  placeholder='Required Amount'></Input>
          </RowFirstInput>
          <RowSecondInput>
            <label className='lab'>Choose Category</label>
            <Select onChange={Handler.FormHandler} value={Handler.form.category} name="category">
              <option>Education</option>
              <option>Health</option>
              
            </Select>
          </RowSecondInput>
        </FormRow>
      </FormInput>
      {/* Image */}
      <FormInput>
        <label className='lab1'>Select Image</label>
        <Image alt="dapp" onChange={Handler.ImageHandler} type={'file'} accept='image/*'>
        </Image>
      </FormInput>
      {uploadLoading == true ? <Button><TailSpin color='#fff' height={20} /></Button> :
        uploaded == false ?
          <Button onClick={uploadFiles}>
            Upload Files to IPFS
          </Button>
          : <Button style={{ cursor: "no-drop" }}>Files uploaded Sucessfully</Button>
      }
      <Button onClick={Handler.startCampaign} className='startbtn'>
        Start Campaign
      </Button>
    </FormRight>
  )
}

const FormRight = styled.div`
  width:45%;
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
    margin-bottom:6%;
  }

  .lab1
  {
    font-size:20px;
    font-weight:500;
    margin-top:3.5%;
  }

 
`

const FormRow = styled.div`
  display: flex;
  justify-content:space-between;
  width:100% ;
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
`

const RowFirstInput = styled.div`
  display:flex ;
  flex-direction:column ;
  width:45% ;
`

const RowSecondInput = styled.div`
  display:flex ;
  flex-direction:column ;
  width:45% ;
`

const Select = styled.select`
  padding:15px;
  background-color:${(props) => props.theme.bgDiv} ;
  color:${(props) => props.theme.color} ;
  margin-top:4px;
  border:none ;
  border-radius:8px ;
  outline:none;
  font-size:large;
  width:100% ;
`

const Image = styled.input`
  
  background-color:${(props) => props.theme.bgDiv} ;
  color:${(props) => props.theme.color} ;
  margin-top:20px;
  border:none ;
  border-radius:8px ;
  outline:none;
  font-size:large;
  width:100% ;

  &::-webkit-file-upload-button {
    padding: 15px ;
    background-color: ${(props) => props.theme.bgSubDiv} ;
    color: ${(props) => props.theme.color} ;
    outline:none ;
    border:none ;
    font-weight:bold ;
  }  
`

const Button = styled.button`
  display: flex;
  justify-content:center;
  width:100% ;
  padding:15px ;
  color:white ;
  background-color:#AEC0FF ;
  color:black;
  border:none;
  margin-top:30px ;
  cursor: pointer;
  font-weight:bold ;
  font-size:large ;
  border-radius:10px;
  border:1px solid black;


  
`

export default FormRightWrapper