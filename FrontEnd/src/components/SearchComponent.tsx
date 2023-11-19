import { AiOutlineSearch } from "@react-icons/all-files/ai/AiOutlineSearch";
import { useState } from "react";
import { useAppDispatch } from "../app/hook";
import {
  setCategories,
  setOrder,
  setSearch,
  setSort,
} from "../redux/slices/paginationSlice";

const SearchComponent = () => {
  const [textSearch, setTextSearch] = useState("");
  const dispatch = useAppDispatch();

  const handleSearchChange = (e: any) => {
    setTextSearch(e.target.value);
  };
  const handleSearchSubmit = (e: any) => {
    e.preventDefault();
    dispatch(setSearch(textSearch));
    dispatch(setSort(""));
    dispatch(setOrder(""));
    dispatch(setCategories(""));

    setTextSearch("");
  };
  return (
    <div className="md:w-72 relative">
      <form
        action=""
        onSubmit={handleSearchSubmit}
        className="flex items-center"
      >
        <input
          required
          type="text"
          placeholder="Tìm Kiếm Sách..."
          value={textSearch}
          className="outline-none text-black w-full rounded-md border-b p-2 focus:outline-none text-[] focus:border-blue-500"
          onChange={handleSearchChange}
        />
        <button
          className="text-2xl ml-2 bg-blue-500 text-white rounded p-2 hover:bg-blue-600 transition-all duration-300"
          type="submit"
        >
          <AiOutlineSearch />
        </button>
      </form>
    </div>
  );
};

export default SearchComponent;
