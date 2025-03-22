import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../utils/appStore";
import { addUser, removeUser } from "../features/authSlice";
import { useNavigate } from "react-router";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../utils/firebase";
import { useEffect } from "react";
import { IMAGE_SOURCE } from "../utils/constants";

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userData = useSelector((state: RootState) => state.user);

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

    //unsubscribe when component unmounts

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
  return (
    <div className="fixed bg-gradient-to-b from-black z-50 w-screen flex justify-between pl-4 items-center py-2 pr-10">
      <div>
        <img src={IMAGE_SOURCE.LOGO} alt="logo" className="w-44" />
      </div>
      {!!userData && (
        <div className="flex justify-center items-center gap-8">
          <div className="flex flex-col justify-center items-center gap-1">
            <img
              src={userData?.photoURL}
              alt="logo"
              className="w-10 h-10 rounded-full"
            />
            <p className="text-white font-semibold ">{userData?.displayName}</p>
          </div>
          <p
            className="text-white font-semibold bg-[#E50914] py-2 px-3 rounded-md cursor-pointer"
            onClick={handleLogout}
          >
            Logout
          </p>
        </div>
      )}
    </div>
  );
};

export default Header;
