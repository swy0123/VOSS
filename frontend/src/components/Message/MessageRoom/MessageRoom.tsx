import { useState, useEffect, useCallback, useRef, ChangeEvent } from "react";
import { useInView } from "react-intersection-observer";
import ExitBox from "/src/assets/Messenger/ExitBox.png";
import Arrow from "/src/assets/Messenger/SendArrow.png";
import { useRecoilState } from "recoil";
import { ShowMessageRoomState, MessageLogState, OpenRoomIdState } from "/src/recoil/Messenger";
import { MessegeListDiv, MessegeTitle, ExitImg, MessegeBodyDiv, InfinityScroll, Chatting, MyChatting, OtherChatting, Date, Input, Send, } from "./MessageRoom.style"


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

const MessageRoom = () => {
  //통신을 통해 id 가져오기
  const roomId = 1;
  const [posts, setPosts] = useState<Post[]>([]);
  const [message, setMessage] = useState("");
  const [isOpenRoom, setOpenRoom] = useRecoilState<boolean>(ShowMessageRoomState);
  const [openRoomId, setOpenRoomId] = useRecoilState(OpenRoomIdState);
  const [messageLog, setMessageLog] = useRecoilState(MessageLogState);
  

  const startRef = useRef<HTMLDivElement>(null);
  const instantMove = () => {
    startRef.current?.scrollIntoView({ behavior: "instant" });
  };

  const handleMessage = (e: ChangeEvent<HTMLInputElement>) => {
    setMessage(e.target.value);
  };

  const onClickSend = () => {
    if (message === "") return;
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
    setPosts([...messageLog]);
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
        <ExitImg src={ExitBox} onClickCapture={()=>setOpenRoom(false)} />
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

        <div ref={startRef}></div>
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
