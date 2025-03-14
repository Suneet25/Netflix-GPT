export const validate = ({
  email,
  password,
}: {
  email?: string;
  password?: string;
}) => {
  if (!password && !email) {
    return { email: "Invalid Email", password: "Invalid Password" };
  }
  const isValidPassword =
    password &&
    /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/.test(password);
  const isValidEmail = email && /^\S+@\S+\.\S+$/.test(email);

  if (!email || !isValidEmail) {
    return { email: "Invalid Email" };
  }

  if (!password || !isValidPassword) {
    return { password: "Invalid Password" };
  }

  return null;
};
