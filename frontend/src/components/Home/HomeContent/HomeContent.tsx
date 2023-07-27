import { styled } from 'styled-components';
import MainLogo from '../../../assets/main/MainLogo.png'
import { Catchphrase, Img, ImgDiv, Logo, Text, TextWhite } from './HomeContent.style';

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