import { useState } from "react";
import useAuth from "../context/useAuth";
import bingoApi from "../service/bingoApi";
import { useNavigate } from "react-router-dom";
import { AxiosError } from "axios";

import Header from "../components/Header";
const inputStyle = "border border-gray-200 rounded-lg";

type formType = {
  email: string;
  password: string;
};

const LogIn = () => {
  const { storeToken, authenticateUser } = useAuth();
  const [formState, setFormState] = useState<formType>({
    email: "",
    password: "",
  });
  const [errorMsg, setErrorMsg] = useState<string>("");
  const navigate = useNavigate();

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const key = e.currentTarget.id;
    const value = e.currentTarget.value;
    setFormState({ ...formState, [key]: value });
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    try {
      const response = await bingoApi.post("/auth/login", formState);
      console.log(response);
      const token = response.data.authToken;
      if (response.status === 400) {
        console.log(response.data.message);
      }
      storeToken(token);
      await authenticateUser();
      if (response.status === 200) {
        console.log("user logged in", response.data);
        navigate("/");
      }
    } catch (error) {
      if (error instanceof AxiosError) {
        // Handle error if it is an instance of Error
        console.error(error);
        setErrorMsg(error.response?.data.message); // Use type assertion to access message property
      } else {
        // Handle other types of errors
        console.error(error);
        setErrorMsg("An unknown error occurred");
      }
    }
    setTimeout(() => {
      setErrorMsg("");
    }, 2000);
  }
  const { email, password } = formState;
  return (
    <div>
      <Header />
      <div className="m-4">
        <div>Tu as déjà un compte : </div>
        <form
          action=""
          className="flex flex-col gap-2 p-4 m-3 border border-gray-300 rounded-md drop-shadow-lg bg-white"
        >
          <label htmlFor="email">Email :</label>
          <input
            type="email"
            id="email"
            name="email"
            value={email}
            onChange={handleChange}
            className={inputStyle}
          />
          <label htmlFor="password">Mot de passe :</label>
          <input
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={handleChange}
            className={inputStyle}
          />
          <button onClick={handleSubmit}>Se connecter</button>
        </form>
        <div>
          Tu n'as pas de compte ?{" "}
          <button className="underline"> Créer un compte</button>
        </div>
        <div>{errorMsg}</div>
      </div>
    </div>
  );
};

export default LogIn;
