import styled from 'styled-components';
import logoImage from '../../../public/VIT.png';
const HeaderLogo = () => {
  return (
    <Logo>
      <img src={logoImage} alt="" /> VIT Campaigns
    </Logo>
  )
}

const Logo = styled.h1`
  font-weight: normal;
  font-size: 40px;
  margin-left: 11px;
  font-family: 'Praise';
  letter-spacing: 3px;
  cursor: pointer;

  
`

export default HeaderLogo