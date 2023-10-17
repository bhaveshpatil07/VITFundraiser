import styled from 'styled-components';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import PaidIcon from '@mui/icons-material/Paid';
import EventIcon from '@mui/icons-material/Event';
import Image from 'next/image';
import { ethers } from 'ethers';
import CampaignFactory from '../artifacts/contracts/Campaign.sol/CampaignFactory.json'
import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function Dashboard() {
  const [campaignsData, setCampaignsData] = useState([]);

  useEffect(() => {
    const Request = async () => {
      await window.ethereum.request({ method: 'eth_requestAccounts' });
      const Web3provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = Web3provider.getSigner();
      const Address = await signer.getAddress();

      const provider = new ethers.providers.JsonRpcProvider(
        process.env.NEXT_PUBLIC_RPC_URL
      );
  
      const contract = new ethers.Contract(
        process.env.NEXT_PUBLIC_ADDRESS,
        CampaignFactory.abi,
        provider
      );
  
      const getAllCampaigns = contract.filters.campaignCreated(null, null, Address);
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
      })  
      setCampaignsData(AllData)
    }
    Request();
  }, [])

  return (
    <HomeWrapper>

      {/* Cards Container */}
      <CardsWrapper>

      {/* Card */}
      {campaignsData.map((e) => {
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
              <Text><PaidIcon /></Text> 
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



const HomeWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`
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
  width: 100%;
`
const Title = styled.h2`
  font-family: 'Roboto';
  font-size: 35px;
  text-align: center;
  margin: 1px 0px;
  background-color: ${(props) => props.theme.bgSubDiv};
  padding: 8px;
  cursor: pointer;
  font-weight: bold;
  border: 2px solid ${(props) => (props.theme.bgDiv=="black"?'#fff':"black")=="black"?"#757575":'#fff'};
  border-top-left-radius: 30px 30px;
  border-top-right-radius: 30px 30px;

`

const Box = styled.div`
  margin-top: 5px;
  border: 2px solid ${(props) => (props.theme.bgDiv=="black"?'#fff':"black")=="black"?"#757575":'#fff'};
  border-radius: 12px;
  padding: 5px;

`

const CardData = styled.div`
  display: flex;
  justify-content: left;
  margin: 2px 0px;
  background-color: ${(props) => props.theme.bgSubDiv};
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
`
const Button = styled.button`
  padding: 8px;
  margin-top: 5px;
  text-align: center;
  width: 100%;
  background-color:#acace6 ;
  // background-image:
  //     linear-gradient(180deg, #00b712 0%, #5aff15 80%); 
  border: none;
  border-radius: 12px;
  cursor: pointer;
  font-family: 'Roboto';
  text-transform: uppercase;
  color: #000;
  font-size: 18px;
  font-weight: bold;
`