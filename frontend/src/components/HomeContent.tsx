import { styled } from 'styled-components';
import MainLogo from '../assets/main/MainLogo.png'

const ImgDiv = styled.div`
    width: 300px;
    height: 180px;
    margin: 0 auto;
  `;
const Img = styled.img`
  width: 300px;
  height: 180px;
  object-fit: contain;
`;

const Logo = styled.div`
    margin: 0 auto;
    position: absolute;
    left: 30%;
    top: 50%;
    transform: translate(-50%, -50%);
`;

const TextWhite = styled.div`
    margin: 0 auto; 
    color: #FFFFFF;
`;

const Catchphrase = styled.div`
    text-align: center;
    font-size: 40px;
    margin-top: 0px;
    margin-bottom: 10px;
    font-weight: bold;
`;
const Text = styled.div`
    text-align: center;
    font-size: 15px;
    margin-top: 2px;
`;

const HomeContent = () => {
    return (
        <Logo>
            <TextWhite>
                <ImgDiv><Img src={MainLogo} /></ImgDiv>
                <Catchphrase>메인 캐치프레이즈</Catchphrase>
                <Text>내가 만들어버린 로렘 입숨 어쩌궁.. 네??</Text>
                <Text>녹음 게시판이 어쩌구 할말 추?</Text>
            </TextWhite>
        </Logo>
    )
};

export default HomeContent;