import { useState } from 'react';
import {
  SearchBoxDesign,
  SelectDesign,
  InputBoxDesign,
  InputBoxIpt,
  InputBoxBtn
} from "./SearchBox.style";


function SearchBox() {

  return (
    <SearchBoxDesign>
      <SelectDesign name="" id="search-select">
        <option value="1">제목</option>
        <option value="2">제목+내용</option>
        <option value="3">작성자</option>
      </SelectDesign>

      <InputBoxDesign>
        <InputBoxIpt
          type="text"
          placeholder="검색"
        />
        <InputBoxBtn><img src="src/assets/Board/SearchInput.png" alt="" style={{width: "1.5vw"}}/></InputBoxBtn>
      </InputBoxDesign>
    </SearchBoxDesign>
  );
}

export default SearchBox;