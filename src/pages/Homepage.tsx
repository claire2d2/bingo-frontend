import useAuth from "../context/useAuth";

const Homepage = () => {
  const { isLoggedIn } = useAuth();
  return (
    <div>
      Homepaaage
      <div>{isLoggedIn ? "yes" : "no"}</div>
    </div>
  );
};

export default Homepage;
