import { styled } from 'styled-components';
import MainLogo from '/src/assets/main/MainLogo.png'
import { Catchphrase, Img, ImgDiv, Logo, Text, TextWhite } from './HomeContent.style';
import { scrollEventState } from '/src/recoil/HW_Atom';
import { useRecoilState } from 'recoil';

const HomeContent = () => {
    const [scrollEvent, setScrollEvent] = useRecoilState(scrollEventState);

    return (
        <Logo $isScroll={scrollEvent}>
            <ImgDiv><Img src={MainLogo} /></ImgDiv>
            <TextWhite $isScroll={scrollEvent}>
                <Catchphrase>Be Boss of Voice</Catchphrase>
                <Text>모두가 성우가 될 수 있는 플랫폼, Voss</Text>
            </TextWhite>
        </Logo>
    )
};

export default HomeContent;