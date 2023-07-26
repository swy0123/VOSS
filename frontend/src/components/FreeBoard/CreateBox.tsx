import { useNavigate } from "react-router-dom";
import {
  CreateBoxDesign,
  CreateBtnDesign
} from "./CreateBox.style";


function CreateBox() {
  const navigate = useNavigate() 
  const goPostCreate = () => navigate(`/freeboard/create`);

  return (
    <CreateBoxDesign>
      <CreateBtnDesign onClick={() => goPostCreate()}>작성하기</CreateBtnDesign>
    </CreateBoxDesign>
  );
}

export default CreateBox;