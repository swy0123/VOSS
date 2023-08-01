import Avatar, { genConfig } from "react-nice-avatar";

const AvatarEditor = () => {
  const config = genConfig("hi@dapi.to");
  return (
    <div>
      <span>아바타 모달</span>
      <Avatar style={{ width: "8rem", height: "8rem" }} {...config} />
    </div>
  );
};

export default AvatarEditor;