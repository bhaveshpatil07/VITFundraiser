import React from 'react';
import styled from 'styled-components';
import { ethers } from 'ethers';

const MyDonationSection = ({ mydonations }) => {
  return (
    <MyDonation>
      <DonationTitle>My Past Donation</DonationTitle>
      {mydonations.map((e) => (
        <Donation key={e.timestamp}>
          <DonationData>{e.donar.slice(0, 6)}...{e.donar.slice(39)}</DonationData>
          <DonationData>{e.amount} Matic</DonationData>
          <DonationData>{new Date(e.timestamp * 1000).toLocaleString()}</DonationData>
        </Donation>
      ))}
    </MyDonation>
  );
};

export default MyDonationSection;

const MyDonation = styled.div`
  height: 35%;
  overflow-y: auto;
`;

const DonationTitle = styled.div`
  font-family: 'Roboto';
  font-size: large;
  text-transform: uppercase;
  padding: 4px;
  text-align: center;
  margin-right: 45px;
  margin-top: 20px;
  color: Green;
  font-weight: bold;
`;

const Donation = styled.div`
  display: flex;
  justify-content: center;
  justify-content: space-between;
  align-items: center;
  margin-top: 4px;
  background-color: #YourBackgroundColor; /* Replace with your desired background color */
  padding: 4px 8px;
  width: 80%;
`;

const DonationData = styled.p`
  color: ${(props) => props.theme.color};
  font-family: 'Roboto';
  font-size: large;
  margin: 0;
  padding: 0;
  margin-left: 85px;
}`;
