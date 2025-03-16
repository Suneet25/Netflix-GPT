import { useRef, useState } from "react";
import Header from "./Header";
import { validate } from "../utils/validate";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { auth } from "../utils/firebase";
import { useDispatch } from "react-redux";
import { addUser } from "../features/auth/authSlice";
import { URLS } from "../utils/constants";
type ValidationError = {
  email?: string;
  password?: string;
  otherError?: string;
};
const Login = () => {
  const dispatch = useDispatch();
  const [isSignInForm, setIsSignInForm] = useState(true);
  const [validationError, setValidationError] =
    useState<ValidationError | null>(null);
  const emailRef = useRef<HTMLInputElement | null>(null);
  const passwordRef = useRef<HTMLInputElement | null>(null);
  const nameRef = useRef<HTMLInputElement | null>(null);

  const handleToggleForm = () => {
    setIsSignInForm((prev) => !prev);
  };

  const handleSubmit = () => {
    const validateData = validate({
      email: emailRef?.current?.value,
      password: passwordRef?.current?.value,
    });
    console.log(validateData);

    if (validateData) {
      setValidationError(validateData);
      return;
    } else {
      setValidationError(null);
      if (isSignInForm) {
        signInWithEmailAndPassword(
          auth,
          emailRef?.current?.value ?? "",
          passwordRef?.current?.value ?? ""
        )
          .then((userCredential) => {
            const user = userCredential.user;
            const { displayName, email, photoURL, uid } = auth.currentUser;
            dispatch(
              addUser({
                uid: uid,
                displayName: displayName,
                email: email,
                photoURL: photoURL,
              })
            );
          })
          .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            setValidationError({ otherError: `${errorCode}-${errorMessage}` });
          });
      } else {
        createUserWithEmailAndPassword(
          auth,
          emailRef?.current?.value ?? "",
          passwordRef?.current?.value ?? ""
        )
          .then((userCredential) => {
            const user = userCredential.user;
            updateProfile(auth?.currentUser, {
              displayName: nameRef?.current?.value,
              photoURL: URLS.USER_AVATAR,
            }).then((user) => {
              const { displayName, email, photoURL, uid } = auth.currentUser;
              dispatch(
                addUser({
                  uid: uid,
                  displayName: displayName,
                  email: email,
                  photoURL: photoURL,
                })
              );
            });
            console.log("SIGNED_UP_USER", user);
          })
          .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;

            setValidationError({ otherError: `${errorCode}-${errorMessage}` });
          });
      }
    }
    console.log(validateData);
  };

  return (
    <div>
      <Header />
      <div className="absolute">
        <img
          src="https://assets.nflxext.com/ffe/siteui/vlv3/42a0bce6-fc59-4c1c-b335-7196a59ae9ab/web/IN-en-20250303-TRIFECTA-perspective_d5f81427-d6cf-412d-8e86-2315671b9be1_large.jpg"
          alt="bgImage"
        />
      </div>
      <form
        onSubmit={(e) => e.preventDefault()}
        className="absolute bg-black/80 my-24 mx-auto left-0 right-0 bottom-32 w-3/12 flex flex-col items-center justify-center py-10 gap-5 px-10"
      >
        <h1 className="text-xl font-bold text-white">
          {isSignInForm ? "Sign In" : "Sign Up"}
        </h1>
        <input
          ref={emailRef}
          type="email"
          className="w-full py-2 px-4 border border-white text-white placeholder:text-amber-50 rounded-md"
          placeholder="Email or mobile number"
        />
        {!!validationError?.email && (
          <p className=" text-[#E50914] text-left">{validationError?.email}</p>
        )}
        {!isSignInForm && (
          <input
            ref={nameRef}
            type="text"
            className="w-full py-2 px-4 border border-white text-white placeholder:text-amber-50 rounded-md"
            placeholder="Enter you name"
          />
        )}
        <input
          ref={passwordRef}
          type="password"
          className="w-full py-2 px-4 border border-white text-white placeholder:text-amber-50 rounded-md"
          placeholder="Password"
        />
        {(!!validationError?.password || !!validationError?.otherError) && (
          <p className="text-[#E50914] text-left">
            {validationError?.password ?? validationError?.otherError}
          </p>
        )}
        <button
          onClick={handleSubmit}
          className="bg-[#E50914] text-white py-2 rounded-md w-full"
        >
          {isSignInForm ? "Sign in" : "Sign Up"}
        </button>
        <p className="text-white">
          {isSignInForm ? (
            <>
              New to Netflix?
              <span
                className="font-semibold cursor-pointer"
                onClick={handleToggleForm}
              >
                Sign up now.
              </span>
            </>
          ) : (
            <>
              Already a member?
              <span
                className="font-semibold cursor-pointer"
                onClick={handleToggleForm}
              >
                Do Sign in.
              </span>
            </>
          )}
        </p>
      </form>
    </div>
  );
};

export default Login;
