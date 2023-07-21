import { useState, useEffect, useCallback, useRef } from 'react';
import { useInView } from 'react-intersection-observer';
import { styled } from "styled-components";
import ExitBox from "../../assets/Messenger/ExitBox.png"
import Arrow from "../../assets/Messenger/SendArrow.png"

const MessegeListDiv = styled.div`
    width: 300px;
    height: 400px;
    border-color: D2D2D2;
    border-radius: 15px;
    border-style: solid;
    border: 1px;
    background-color: #EFEFEF;
    position: fixed;
    right: 25px;
    bottom: 25px;
    opacity: 97%;
`;

const MessegeTitle = styled.div`
    font-size: 14px;
    font-weight: bolder;
    margin-top: 10px;
    margin-left: 10px;
`;

const ExitImg = styled.img`
    position: absolute;
    right: 10px;
    top: 9px;
    width: 20px;
    height: 20px;
`;

const MessegeBodyDiv = styled.div`
    margin: 0 auto;
`;


const InfinityScroll = styled.div`
    height: 310px;
    width: 90%;
    margin: 1px auto;
    position: relative;
    overflow-y: auto;
    /* -ms-overflow-style: none;
    &::-webkit-scrollbar {
    display: none;
} */
`;

const ChattingDiv = styled.div`
  width: 90%;
  height: 30px;
`;

const Chatting = styled.div`
`;

const MyChatting = styled.div`
    float: right;
    border-style: solid;
    border-width: 1px;
    border-radius: 5px;
    border-color: #D9D9D9;
    background-color: white;
    font-size: 11px;
    height: fit-content;
    max-width: 70%;
    display: flex;
    align-items: center;
    padding-left: 7px;
    padding-right: 7px;
`;
const OtherChatting = styled.div`
    float:left;
`;

const Date = styled.div`
    margin-top: 5px;
    font-size: 5px;
    position: relative;
    bottom: 0px;

`;

const Input = styled.input``;

const Send = styled.img``;


type Props = {
    openRoomId: string;
    onClickSetRoom: () => void;
}

interface Post {
    chatId: number, id: number, member: string, content: string, time: string, date: string
};

const tmp = [
    { chatId: 40, id: 1, member: "이시영1", content: "아니 뭐야40", time: "10:34:21", date: "2023-07-21" },
    { chatId: 39, id: 1, member: "이시영1", content: "진짜 뭐야39", time: "10:34:21", date: "2023-07-21" },
    { chatId: 38, id: 1, member: "이시영1", content: "=정말 뭐야38", time: "10:34:21", date: "2023-07-21" },
    { chatId: 37, id: 1, member: "이시영1", content: "ㄹㅇ 뭐야37", time: "10:34:21", date: "2023-07-21" },
    { chatId: 36, id: 1, member: "me", content: "뭐야뭐야36", time: "10:34:21", date: "2023-07-21" },
    { chatId: 35, id: 1, member: "이시영1", content: "왜;; 뭐야35", time: "10:34:21", date: "2023-07-21" },
    { chatId: 34, id: 1, member: "이시영1", content: "그냥 뭐야34", time: "10:34:21", date: "2023-07-21" },
    { chatId: 33, id: 1, member: "me", content: "ㅎㅎㅎ 뭐야33", time: "10:34:21", date: "2023-07-21" },
    { chatId: 32, id: 1, member: "me", content: ";;;; 뭐야32", time: "10:34:21", date: "2023-07-21" },
    { chatId: 31, id: 1, member: "me", content: "zzzzzzzㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋzzzzzzz뭐야31", time: "10:34:21", date: "2023-07-21" },
    { chatId: 30, id: 1, member: "이시영1", content: "아니 뭐야30", time: "10:34:21", date: "2023-07-21" },
    { chatId: 29, id: 1, member: "이시영1", content: "진짜 뭐야29", time: "10:34:21", date: "2023-07-21" },
    { chatId: 28, id: 1, member: "이시영1", content: "=정말 뭐야28", time: "10:34:21", date: "2023-07-21" },
    { chatId: 27, id: 1, member: "이시영1", content: "ㄹㅇ 뭐야27", time: "10:34:21", date: "2023-07-21" },
    { chatId: 26, id: 1, member: "me", content: "뭐야뭐야26", time: "10:34:21", date: "2023-07-21" },
    { chatId: 25, id: 1, member: "이시영1", content: "왜;; 뭐야25", time: "10:34:21", date: "2023-07-21" },
    { chatId: 24, id: 1, member: "이시영1", content: "그냥 뭐야24", time: "10:34:21", date: "2023-07-21" },
    { chatId: 23, id: 1, member: "me", content: "ㅎㅎㅎ 뭐야23", time: "10:34:21", date: "2023-07-21" },
    { chatId: 22, id: 1, member: "me", content: ";;;; 뭐야22", time: "10:34:21", date: "2023-07-21" },
    { chatId: 21, id: 1, member: "me", content: "zzzzzzzㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋzzzzzzz뭐야21", time: "10:34:21", date: "2023-07-21" },
    { chatId: 20, id: 1, member: "이시영1", content: "아니 뭐야20", time: "10:34:21", date: "2023-07-21" },
    { chatId: 19, id: 1, member: "이시영1", content: "진짜 뭐야19", time: "10:34:21", date: "2023-07-21" },
    { chatId: 18, id: 1, member: "이시영1", content: "=정말 뭐야18", time: "10:34:21", date: "2023-07-21" },
    { chatId: 17, id: 1, member: "이시영1", content: "ㄹㅇ 뭐야17", time: "10:34:21", date: "2023-07-21" },
    { chatId: 16, id: 1, member: "me", content: "뭐야뭐야16", time: "10:34:21", date: "2023-07-21" },
    { chatId: 15, id: 1, member: "이시영1", content: "왜;; 뭐야15", time: "10:34:21", date: "2023-07-21" },
    { chatId: 14, id: 1, member: "이시영1", content: "그냥 뭐야14", time: "10:34:21", date: "2023-07-21" },
    { chatId: 13, id: 1, member: "me", content: "ㅎㅎㅎ 뭐야13", time: "10:34:21", date: "2023-07-21" },
    { chatId: 12, id: 1, member: "me", content: ";;;; 뭐야12", time: "10:34:21", date: "2023-07-21" },
    { chatId: 11, id: 1, member: "me", content: "zzzzzzzㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋzzzzzzz뭐야11", time: "10:34:21", date: "2023-07-21" },
    { chatId: 10, id: 1, member: "이시영1", content: "아니 뭐야10", time: "10:34:21", date: "2023-07-21" },
    { chatId: 9, id: 1, member: "이시영1", content: "진짜 뭐야9", time: "10:34:21", date: "2023-07-21" },
    { chatId: 8, id: 1, member: "이시영1", content: "=정말 뭐야8", time: "10:34:21", date: "2023-07-21" },
    { chatId: 7, id: 1, member: "이시영1", content: "ㄹㅇ 뭐야7", time: "10:34:21", date: "2023-07-21" },
    { chatId: 6, id: 1, member: "me", content: "뭐야뭐야6", time: "10:34:21", date: "2023-07-21" },
    { chatId: 5, id: 1, member: "이시영1", content: "왜;; 뭐야5", time: "10:34:21", date: "2023-07-21" },
    { chatId: 4, id: 1, member: "이시영1", content: "그냥 뭐야4", time: "10:34:21", date: "2023-07-21" },
    { chatId: 3, id: 1, member: "me", content: "ㅎㅎㅎ 뭐야3", time: "10:34:21", date: "2023-07-21" },
    { chatId: 2, id: 1, member: "me", content: ";;;; 뭐야2", time: "10:34:21", date: "2023-07-21" },
    { chatId: 1, id: 1, member: "이시영1", content: "뭐긴 뭐야1", time: "10:34:21", date: "2023-07-21" }
]



const MessageRoom: React.FC<Props> = ({ onClickSetRoom, openRoomId }) => {
    const [posts, setPosts] = useState<Post[]>([]);
    const [isTop, setTop] = useState(false);
    const [hasNextPage, setHasNextPage] = useState<boolean>(true);
    const page = useRef<number>(0);
    const [ref, inView] = useInView();

    const startRef = useRef<HTMLDivElement>(null);
    const instantMove = () => {
        startRef.current?.scrollIntoView({ behavior: 'instant' });
    }

    useEffect(() => {
        if (inView && hasNextPage) {
            fetch();
        }
        instantMove();
        setTop(true);
        console.log("스크롤 이동");
    }, [])
    // const fetch = useCallback(async () => {
    //     try {
    //         const { data } = await axios.get<Post[]>(
    //             `http://localhost:5000/posts?_limit=10&_page=${page.current}`
    //         );
    //         setPosts((prevPosts) => [...prevPosts, ...data]);
    //         setHasNextPage(data.length === 10);
    //         if (data.length) {
    //             page.current += 1;
    //         }
    //     } catch (err) {
    //         console.error(err);
    //     }
    // }, []);

    // useEffect(() => {
    //     console.log(inView, hasNextPage);
    //     if (inView && hasNextPage) {
    //         fetch();
    //     }
    // }, [fetch, hasNextPage, inView]);

    const fetch = () => {
        console.log(page.current);
        const data = tmp.slice(page.current, page.current + 10);
        setPosts((prevPosts) => [...prevPosts, ...data]);
        setHasNextPage(data.length === 10);
        console.log(data.length);
        if (data.length) {
            page.current += 10;
        }
        console.log(data);
    };

    useEffect(() => {
        console.log(inView, hasNextPage);
        if (inView && hasNextPage) {
            fetch();
        }

    }, [fetch, hasNextPage, inView]);



    return (
        <MessegeListDiv>
            <div>
                <MessegeTitle>{openRoomId}</MessegeTitle>
                <ExitImg src={ExitBox} onClick={onClickSetRoom} />
                <hr />
            </div>
            <InfinityScroll style={{ position: 'relative' }}>
                {isTop ? <div ref={ref} style={{ position: 'relative', top: '0px', height: "5px", backgroundColor: "black" }} />
                :<></>
                }
                {posts?.map((post) => (
                    <ChattingDiv
                        key={post.chatId}
                        style={{
                            border: '1px solid #000',
                            padding: '1px',
                            position:'relative'
                        }}
                    >
                        {(post.member === "me") ?
                            <MyChatting> {post.content}</MyChatting>
                            : <OtherChatting> {post.content}</OtherChatting>
                        }

                    </ChattingDiv>
                ))}
                <div ref={startRef} style={{ position: 'relative', bottom: '0px', height: "5px", backgroundColor: "red" }} ></div>

            </InfinityScroll>
            <MessegeBodyDiv>
                <div >
                    <Input type='text'></Input>

                    <Send src={Arrow} />
                </div>

            </MessegeBodyDiv>
        </MessegeListDiv>

    )

}

export default MessageRoom;


