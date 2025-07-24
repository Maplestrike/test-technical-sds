import { useState, type FormEvent } from "react";
import "./form.css";

const BASE_URL = "https://gorest.co.in";

const token =
  "7da6a7a3a0c7ecd9f2a083e8a5970aa8e29458afbabfb82e100703d62dc620ed";

interface User {
  name: string;
  email: string;
  gender: string;
  status: string;
}

const Form = () => {
  const [user, setUser] = useState<User>({
    name: "",
    email: "",
    gender: "",
    status: "",
  });

  async function handleSubmit(e: FormEvent<HTMLFormElement>): Promise<void> {
    // throw new Error("Function not implemented.");
    e.preventDefault();

    console.log(user);

    try {
      await fetch(`${BASE_URL}/public/v2/users`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(user),
      });
      alert("Successfully Created New User!");
    } catch (e) {
      alert(e);
    }
  }

  return (
    <>
      <form className="form" onSubmit={handleSubmit}>
        <div className="form-item">
          <label htmlFor="name">Name</label>
          <input
            className="name"
            type="text"
            value={user.name}
            onChange={(e) =>
              setUser((prevUser) => ({
                ...prevUser,
                name: e.target.value,
              }))
            }
          />
        </div>
        <div className="form-item">
          <label htmlFor="email">Email</label>
          <input
            className="email"
            type="text"
            value={user.email}
            onChange={(e) =>
              setUser((prevUser) => ({
                ...prevUser,
                email: e.target.value,
              }))
            }
          />
        </div>
        <div className="form-item">
          <label htmlFor="gender">Gender</label>
          <input
            className="gender"
            type="text"
            value={user.gender}
            onChange={(e) =>
              setUser((prevUser) => ({
                ...prevUser,
                gender: e.target.value,
              }))
            }
          />
        </div>
        <div className="form-item">
          <label htmlFor="status">Status</label>
          <input
            className="status"
            type="text"
            value={user.status}
            onChange={(e) =>
              setUser((prevUser) => ({
                ...prevUser,
                status: e.target.value,
              }))
            }
          />
        </div>
        <button>Submit</button>
      </form>
    </>
  );
};

export default Form;
