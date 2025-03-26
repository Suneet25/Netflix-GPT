import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../utils/appStore";
import { addUser, removeUser } from "../features/authSlice";
import { useNavigate } from "react-router";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../utils/firebase";
import { useEffect, useState } from "react";
import { IMAGE_SOURCE } from "../utils/constants";
import { toggleGptSearch } from "../features/gptSlice";
import Icon from "./common/Icon";

const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userData = useSelector((state: RootState) => state.user);
  const isGptSearch = useSelector((state: RootState) => state.gpt?.isGptSearch);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        dispatch(
          addUser({
            uid: user?.uid,
            displayName: user?.displayName,
            email: user?.email,
            photoURL: user?.photoURL,
          })
        );
        navigate("/browse");
      } else {
        dispatch(removeUser());
        navigate("/login");
      }
    });

    return () => unsubscribe();
  }, []);

  const handleLogout = () => {
    signOut(auth)
      .then(() => {})
      .catch((error) => {
        console.log(error.message);
      });
    dispatch(removeUser());
  };

  const handleToggleGPTSearch = () => {
    dispatch(toggleGptSearch());
  };

  return (
    <div
      className={`fixed bg-gradient-to-b from-black z-50 w-screen flex justify-between pl-4 items-center py-2 pr-10 ${
        scrolled && "bg-black opacity-90"
      }`}
    >
      <div className="" onClick={() => navigate("/browse")}>
        <img src={IMAGE_SOURCE.LOGO} alt="logo" className="w-32 md:w-44" />
      </div>
      <div className="block md:hidden">
        <div className="block md:hidden p-4">
          <button onClick={() => setMenuOpen(true)}>
            <Icon
              iconName="menu"
              className="material-icons text-white text-3xl"
            />
          </button>
        </div>

        {menuOpen && (
          <div className="fixed top-0 left-0 w-full h-auto py-10 bg-black text-white flex flex-col items-center justify-center transition-all duration-300 md:hidden">
            <button
              onClick={() => setMenuOpen(false)}
              className="absolute top-5 right-5 text-3xl"
            >
              <Icon iconName="close" className="material-icons" />
            </button>

            <ul className="text-center space-y-6 text-xl">
              <li className="hover:text-gray-400 flex items-center justify-center gap-4">
                <img
                  src={userData?.photoURL}
                  className="w-10 h-10 rounded-full"
                />
                <p>Welcome {!!userData && userData?.displayName} !</p>
              </li>
              <li className="hover:text-gray-400">
                <button
                  className="text-white font-medium bg-purple-700 px-3 py-2 rounded-md cursor-pointer"
                  onClick={handleToggleGPTSearch}
                >
                  {isGptSearch ? "Home" : "Ask AI"}
                </button>
              </li>
              <li className="hover:text-gray-400">
                <button
                  className="text-white font-semibold bg-[#E50914] py-2 px-3 rounded-md cursor-pointer"
                  onClick={handleLogout}
                >
                  Logout
                </button>
              </li>
              <li className="hover:text-gray-400">
                <a href="#">Contact</a>
              </li>
            </ul>
          </div>
        )}
      </div>
      {!!userData && (
        <div className="hidden md:block">
          <div className="flex justify-center items-center gap-5 ">
            <div className="flex flex-col justify-center items-center gap-1">
              <img
                src={userData?.photoURL}
                alt="logo"
                className="w-10 h-10 rounded-md"
              />
              {/* <p className="text-white font-semibold ">{userData?.displayName}</p> */}
            </div>
            <button
              className="text-white font-medium bg-purple-700 px-3 py-2 rounded-md cursor-pointer"
              onClick={handleToggleGPTSearch}
            >
              {isGptSearch ? "Home" : "Ask AI"}
            </button>
            <p
              className="text-white font-semibold bg-[#E50914] py-2 px-3 rounded-md cursor-pointer"
              onClick={handleLogout}
            >
              Logout
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Header;
