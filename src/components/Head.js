import { useDispatch, useSelector } from "react-redux";
import { toggleMenu } from "../utils/appSlice";
import { useEffect, useState } from "react";
import { YOUTUBE_SEARCH_API } from "../utils/const";
import { cacheResults } from "../utils/searchSlice";
const Head = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [suggestion, setSuggestion] = useState([]);
  const [showSuggestion, setShowSuggestion] = useState(false);
  const searchCache = useSelector((store) => store.search);
  const dispatch = useDispatch();
  useEffect(() => {
    const timer = setTimeout(() => {
      if (searchCache[searchQuery]) {
        setSuggestion(searchCache[searchQuery]);
      } else {
        getSearchSuggestions();
      }
    }, 200);
    return () => {
      clearTimeout(timer);
    };
  }, [searchQuery]);
  const getSearchSuggestions = async () => {
    const data = await fetch(YOUTUBE_SEARCH_API + searchQuery);
    const json = await data.json();
    setSuggestion(json[1]);
    // Update Cache
    dispatch(
      cacheResults({
        [searchQuery]: json[1],
      })
    );
  };

  const toggleMenuHandler = () => {
    dispatch(toggleMenu());
  };
  useEffect(() => {
    const handleScroll = () => {
      setShowSuggestion(false);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  return (
    <div className="grid grid-flow-col p-5 m-2 shadow-lg">
      <div className="flex col-span-1 ">
        <img
          onClick={() => toggleMenuHandler()}
          className="h-8 cursor-pointer"
          alt="Menu"
          src="https://cdn.iconscout.com/icon/free/png-256/free-hamburger-menu-462145.png?f=webp&w=256"
        />
        <a href="/">
          <img
            className="h-8 mx-2"
            alt="yt-logo"
            src="https://www.gstatic.com/youtube/img/promos/growth/5c0f6e1b0d7e91a416908e54ee0ed6012619dd222172c0fceed8415d32ff9b66_327x93.png"
          />
        </a>
      </div>
      <div className="col-span-10 px-10">
        <div>
          <input
            className="w-1/2 border border-gray-400 p-2 rounded-l-full "
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onFocus={() => setShowSuggestion(true)}
            onBlur={() => setShowSuggestion(false)}
          />
          <button className="border border-gray-400 py-2 px-5 bg-gray-100 rounded-r-full">
            🔍
          </button>
        </div>
        {showSuggestion && (
          <div className="fixed bg-white py-2 px-5 w-[28rem] shadow-lg rounded-lg border border-gray-100 max-h-60 overflow-y-auto">
            <ul>
              {suggestion.map((s) => (
                <li key={s} className="py-2 shadow-sm hover:bg-gray-100">
                  {"🔍" + s}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
      <div>
        <img
          className="h-8 col-span-1"
          alt="user-icon"
          src="https://www.iconpacks.net/icons/2/free-user-icon-3296-thumb.png"
        />
      </div>
    </div>
  );
};

export default Head;
