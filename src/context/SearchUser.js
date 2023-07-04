import { createContext, useContext, useState } from "react";

const SearchUserContext = createContext();

const SearchUserProvider = ({ children }) => {
  const [search, setSearch] = useState({
    keyword:'',
    results: []
  });

  return (
    <SearchUserContext.Provider value={[search, setSearch]}>
      {children}
    </SearchUserContext.Provider>
  );
};

//custom Hook
const useSearchUser = () => useContext(SearchUserContext);

export { useSearchUser, SearchUserProvider };