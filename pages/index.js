import styled from 'styled-components';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import PaidIcon from '@mui/icons-material/Paid';
import EventIcon from '@mui/icons-material/Event';
import Image from 'next/image';
import { ethers } from 'ethers';
import CampaignFactory from '../artifacts/contracts/Campaign.sol/CampaignFactory.json'
import { useState } from 'react';
import Link from 'next/link'
import  FontAwesomeIcon  from '@mui/icons-material/CircleOutlined';



export default function Index({AllData, HealthData, EducationData,AnimalData}) {
  const [filter, setFilter] = useState(AllData);

  return (
    <HomeWrapper>

      {/* Filter Section */}
      <FilterWrapper>
        
        <Category  onClick={() => setFilter(EducationData)}>  <FontAwesomeIcon className='icon'/> Educational Campaign</Category>
        <Category onClick={() => setFilter(HealthData)}><FontAwesomeIcon className='icon'/>Healt Campaign</Category>
        
      </FilterWrapper>

      {/* Cards Container */}
      <CardsWrapper>

      {/* Card */}
      {filter.map((e) => {
        return (
          <Card key={e.title}>
          <Title>
            {e.title}
          </Title>
          <CardImg>
            <Image 
              alt="crowdfunding dapp"
              layout='fill' 
              src={"https://crowdfunding.infura-ipfs.io/ipfs/" + e.image} 
            />
          </CardImg>
          <Box>
            <CardData>
              <Text><AccountBoxIcon /></Text> 
              <Text>{e.owner.slice(0,6)}...{e.owner.slice(39)}</Text>
            </CardData>
            <CardData>
              <Text><PaidIcon  /></Text> 
              <Text>{e.amount} Matic</Text>
            </CardData>
            <CardData>
              <Text><EventIcon /></Text>
              <Text>{new Date(e.timeStamp * 1000).toLocaleString()}</Text>
            </CardData>
          </Box>
          <Link passHref href={'/' + e.address}><Button>
            Go to Campaign
          </Button></Link>
        </Card>
        )
      })}
        {/* Card */}

      </CardsWrapper>
    </HomeWrapper>
  )
}



export async function getStaticProps() {
  const provider = new ethers.providers.JsonRpcProvider(
    process.env.NEXT_PUBLIC_RPC_URL
  );

  const contract = new ethers.Contract(
    process.env.NEXT_PUBLIC_ADDRESS,
    CampaignFactory.abi,
    provider
  );

  const getAllCampaigns = contract.filters.campaignCreated();
  const AllCampaigns = await contract.queryFilter(getAllCampaigns);
  const AllData = AllCampaigns.map((e) => {
    return {
      title: e.args.title,
      image: e.args.imgURI,
      owner: e.args.owner,
      timeStamp: parseInt(e.args.timestamp),
      amount: ethers.utils.formatEther(e.args.requiredAmount),
      address: e.args.campaignAddress
    }
  });

  const getHealthCampaigns = contract.filters.campaignCreated(null,null,null,null,null,null,'Health');
  const HealthCampaigns = await contract.queryFilter(getHealthCampaigns);
  const HealthData = HealthCampaigns.map((e) => {
    return {
      title: e.args.title,
      image: e.args.imgURI,
      owner: e.args.owner,
      timeStamp: parseInt(e.args.timestamp),
      amount: ethers.utils.formatEther(e.args.requiredAmount),
      address: e.args.campaignAddress
    }
  });

  const getEducationCampaigns = contract.filters.campaignCreated(null,null,null,null,null,null,'education');
  const EducationCampaigns = await contract.queryFilter(getEducationCampaigns);
  const EducationData = EducationCampaigns.map((e) => {
    return {
      title: e.args.title,
      image: e.args.imgURI,
      owner: e.args.owner,
      timeStamp: parseInt(e.args.timestamp),
      amount: ethers.utils.formatEther(e.args.requiredAmount),
      address: e.args.campaignAddress
    }
  });

  const getAnimalCampaigns = contract.filters.campaignCreated(null,null,null,null,null,null,'Animal');
  const AnimalCampaigns = await contract.queryFilter(getAnimalCampaigns);
  const AnimalData = AnimalCampaigns.map((e) => {
    return {
      title: e.args.title,
      image: e.args.imgURI,
      owner: e.args.owner,
      timeStamp: parseInt(e.args.timestamp),
      amount: ethers.utils.formatEther(e.args.requiredAmount),
      address: e.args.campaignAddress
    }
  });

  return {
    props: {
      AllData,
      HealthData,
      EducationData,
      AnimalData
    },
    revalidate: 10
  }
}






const HomeWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`
const FilterWrapper = styled.div`
  
  display: flex;
  justify-content: space-between; /* To space out the categories evenly */
  align-items: center;
  width:50%;
  margin-top: 30px;
  padding: 10px; /* Adding some padding for better spacing */
  background-color: ; /* A general light gray background */
  border-radius: 8px; /* Soft rounded corners */
  box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.1); /* A subtle shadow for depth */

  
`

const Category = styled.div`
  padding: 12px 80px;
  background-color: ${(props) => props.theme.bgDiv};
  margin: 0px 0px; /* Adjusted for better spacing within the FilterWrapper */
  border-radius: 8px;
  font-family: 'Poppins';
  font-weight: bold;
  cursor: pointer;
  transition: 0.3s; /* Smooth transition for hover effects */
  font-size: 20px;
  

  .bullet {
    font-size: 24px; /* Adjust the size as needed */
    margin-right: 8px; /* Add some space between the bullet and text */
  }
  .icon
  {
    position:absolute;
    margin-top:2px;
    margin-left:-30px;
  }

  
  &:hover {
    background-color: ${(props) => props.theme.hoverBgDiv}; /* A slightly different color on hover */
    box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.1); /* Adding shadow for depth on hover */
  }`
  




const CardsWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  width: 80%;
  margin-top: 25px;
`
const Card = styled.div`
  width: 30%;
  margin-top: 20px;
  background-color: ${(props) => props.theme.bgDiv};
  border: 2px solid ${(props) => (props.theme.bgDiv=="black"?'#fff':"black")=="black"?"#757575":'#fff'};
  border-radius: 12px;
  padding: 5px;

  &:hover{
    transform: translateY(-10px);
    transition: transform 0.5s;
  }
  
  &:not(:hover){
    transition: transform 0.5s;
  }
`
const CardImg = styled.div`
  position: relative;
  height: 280px;
  width: 94%;
  margin-left:14px;
`

const Title = styled.h2`
  font-family: 'Roboto';
  font-size: 35px;
  text-align: center;
  margin: 1px 0px;
  background-color: ${(props) => props.theme.bgSubDiv};
  width:90%;
  padding: 8px;
  cursor: pointer;
  font-weight: bold;
  margin-left:12px;
  border: 1px solid ${(props) => (props.theme.bgDiv=="black"?'#fff':"black")=="black"?"#757575":'#fff'};
  border-top-left-radius: 30px 30px;
  border-top-right-radius: 30px 30px;
  margin-bottom:10px;

`

const Box = styled.div`
  margin-top: 5px;
  border: 1px solid ${(props) => (props.theme.bgDiv=="black"?'#fff':"black")=="black"?"#757575":'#fff'};
  border-radius: 12px;
  padding: 5px;
  width:93%;
  margin-left:9px;

`

const CardData = styled.div`
  display: flex;
  justify-content: left;
  margin: 2px 0px;
  
  padding: 5px;
  cursor: pointer;

  `
const Text = styled.p`
  display: flex;
  align-items: center;
  margin: 0;
  padding: 5px;
  font-family: 'Roboto';
  font-size: 18px;
  font-weight: bold;

  & > svg {
    fill: #AEC0FF;
  }
`
const Button = styled.button`
  padding: 8px;
  margin-top: 5px;
  text-align: center;
  width: 100%;
  background-color:#AEC0FF ;

  border: none;
  border-radius: 12px;
  cursor: pointer;
  font-family: 'Roboto';
  text-transform: uppercase;
  color: #000;
  font-size: 18px;
  font-weight: bold;
`