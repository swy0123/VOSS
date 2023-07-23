import { useState, useEffect, useCallback, useRef, ChangeEvent } from "react";
import { useInView } from "react-intersection-observer";
import { styled } from "styled-components";
import ExitBox from "../../assets/Messenger/ExitBox.png";
import Arrow from "../../assets/Messenger/SendArrow.png";

const MessegeListDiv = styled.div`
  width: 300px;
  height: 400px;
  border-color: D2D2D2;
  border-radius: 15px;
  border-style: solid;
  border: 1px;
  background-color: #efefef;
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
  height: 300px;
  width: 90%;
  margin: 1px auto;
  position: relative;
  overflow-y: auto;
  /* -ms-overflow-style: none;
    &::-webkit-scrollbar {
    display: none;
} */
`;

const Chatting = styled.div`
  border-style: solid;
  border-width: 1px;
  border-radius: 5px;
  border-color: #d9d9d9;
  background-color: white;
  font-size: 11px;
  height: fit-content;
  max-width: 70%;
  padding: 7px;
  margin: 3px;
`;

const MyChatting = styled.div`
  display: flex;
  justify-content: end;
`;
const OtherChatting = styled.div`
  display: flex;
  justify-content: start;
`;

const Date = styled.div`
  font-size: 5px;
  position: relative;
  margin-top: auto;
  margin-bottom: 7px;
`;

const Input = styled.input`
  background-color: #d9d9d9;
  width: 75%;
  margin: 11px;
  padding: 7px;
  border-radius: 5px;
  border-width: 0px;
`;

const Send = styled.img`
position: absolute;
right: 18px;
bottom: 18px;
`;

type Props = {
  openRoomId: string;
  onClickSetRoom: () => void;
};

interface Post {
  chatId: number;
  id: number;
  member: string;
  content: string;
  time: string;
  date: string;
}

//입력 배열 잘못 만들어서 역순으로 되어있다고 가정
const tmp = [
  {
    chatId: 20,
    id: 1,
    member: "이시영1",
    content: "아니 뭐야20",
    time: "10:24:21",
    date: "2023-07-21",
  },
  {
    chatId: 19,
    id: 1,
    member: "이시영1",
    content: "진짜 뭐야19",
    time: "10:23:21",
    date: "2023-07-21",
  },
  {
    chatId: 18,
    id: 1,
    member: "이시영1",
    content: "=정말 뭐야18",
    time: "10:22:21",
    date: "2023-07-21",
  },
  {
    chatId: 17,
    id: 1,
    member: "이시영1",
    content: "ㄹㅇ 뭐야17",
    time: "10:21:21",
    date: "2023-07-21",
  },
  { chatId: 16, id: 1, member: "me", content: "뭐야뭐야16", time: "10:20:21", date: "2023-07-21" },
  {
    chatId: 15,
    id: 1,
    member: "이시영1",
    content: "왜;; 뭐야15",
    time: "10:20:21",
    date: "2023-07-21",
  },
  {
    chatId: 14,
    id: 1,
    member: "이시영1",
    content: "그냥 뭐야14",
    time: "10:19:21",
    date: "2023-07-21",
  },
  {
    chatId: 13,
    id: 1,
    member: "me",
    content: "ㅎㅎㅎ 뭐야13",
    time: "10:18:21",
    date: "2023-07-21",
  },
  { chatId: 12, id: 1, member: "me", content: ";;;; 뭐야12", time: "10:17:21", date: "2023-07-21" },
  {
    chatId: 11,
    id: 1,
    member: "me",
    content: "zzzzzzzㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋzzzzzzz뭐야11",
    time: "10:17:21",
    date: "2023-07-21",
  },
  {
    chatId: 10,
    id: 1,
    member: "이시영1",
    content: "아니 뭐야10",
    time: "10:16:21",
    date: "2023-07-21",
  },
  {
    chatId: 9,
    id: 1,
    member: "이시영1",
    content: "진짜 뭐야9",
    time: "10:15:21",
    date: "2023-07-21",
  },
  {
    chatId: 8,
    id: 1,
    member: "이시영1",
    content: "=정말 뭐야8",
    time: "10:14:21",
    date: "2023-07-21",
  },
  {
    chatId: 7,
    id: 1,
    member: "이시영1",
    content: "ㄹㅇ 뭐야7",
    time: "10:13:21",
    date: "2023-07-21",
  },
  { chatId: 6, id: 1, member: "me", content: "뭐야뭐야6", time: "10:12:21", date: "2023-07-21" },
  {
    chatId: 5,
    id: 1,
    member: "이시영1",
    content: "왜;; 뭐야5",
    time: "10:12:21",
    date: "2023-07-21",
  },
  {
    chatId: 4,
    id: 1,
    member: "이시영1",
    content: "그냥 뭐야4",
    time: "10:11:21",
    date: "2023-07-21",
  },
  { chatId: 3, id: 1, member: "me", content: "ㅎㅎㅎ 뭐야3", time: "10:11:21", date: "2023-07-21" },
  { chatId: 2, id: 1, member: "me", content: ";;;; 뭐야2", time: "10:11:21", date: "2023-07-21" },
  {
    chatId: 1,
    id: 1,
    member: "이시영1",
    content: "뭐긴 뭐야1",
    time: "10:10:21",
    date: "2023-07-21",
  },
  {
    chatId: 0,
    id: 1,
    member: "이시영0",
    content: "뭐긴 뭐야1",
    time: "10:9:21",
    date: "2023-07-21",
  },
];

const MessageRoom: React.FC<Props> = ({ onClickSetRoom, openRoomId }) => {
  //통신을 통해 id 가져오기
  const roomId = 1;
  const [posts, setPosts] = useState<Post[]>([]);
  const [message, setMessage] = useState("");

  const startRef = useRef<HTMLDivElement>(null);
  const instantMove = () => {
    startRef.current?.scrollIntoView({ behavior: "instant" });
  };

  const handleMessage = (e: ChangeEvent<HTMLInputElement>) => {
    setMessage(e.target.value);
  };

  const onClickSend = () => {
    if(message === "") return;
    console.log(posts);
    let curChatId = 0;
    if (posts.length > 0) {
      console.log(posts[posts.length - 1]);
      curChatId = posts[posts.length - 1].chatId + 1;
    }
    //채팅 객체 생성
    const cur: Post = {
      chatId: curChatId,
      id: roomId,
      member: "me",
      content: message,
      time: "현재시간",
      date: "현재날짜",
    };
    const newPosts: Post[] = [...posts];
    newPosts.push(cur);
    setPosts(newPosts);
    setMessage("");
  };

  useEffect(() => {
    //입력 배열 잘못 만들어서 역순으로 되어있다고 가정
    setPosts([...tmp].slice(0).reverse());
    console.log(posts);
  }, []);

  useEffect(() => {
    instantMove();
  }, [posts]);

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

  return (
    <MessegeListDiv>
      <div>
        <MessegeTitle>{openRoomId}</MessegeTitle>
        <ExitImg src={ExitBox} onClick={onClickSetRoom} />
        <hr />
      </div>
      <InfinityScroll style={{ position: "relative" }}>
        {posts?.map((post) =>
          post.member === "me" ? (
            <div key={post.chatId}>
              <MyChatting>
                <Date>{post.time}</Date>
                <Chatting> {post.content}</Chatting>
              </MyChatting>
            </div>
          ) : (
            <div key={post.chatId}>
              <OtherChatting>
                <Chatting> {post.content}</Chatting>
                <Date>{post.time}</Date>
              </OtherChatting>
            </div>
          )
        )}

        <div
          ref={startRef}
        ></div>
      </InfinityScroll>
      <MessegeBodyDiv>
        <div>
          <Input className="input" type="text" onChange={handleMessage} value={message}></Input>

          <Send src={Arrow} onClick={onClickSend} />
        </div>
      </MessegeBodyDiv>
    </MessegeListDiv>
  );
};

export default MessageRoom;
