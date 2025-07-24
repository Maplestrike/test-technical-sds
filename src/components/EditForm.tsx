import { useEffect, useState, type FormEvent, type ReactNode } from "react";
import "./editform.css";

const BASE_URL = "https://gorest.co.in";

const token =
  "7da6a7a3a0c7ecd9f2a083e8a5970aa8e29458afbabfb82e100703d62dc620ed";

interface User {
  id: string;
  name: string;
  email: string;
  gender: string;
  status: string;
}

interface Props {
  user: User;
}

const EditForm = ({ user }: Props) => {
  const [currUser, setCurrUser] = useState<User>({
    id: "",
    name: "",
    email: "",
    gender: "",
    status: "",
  });

  useEffect(() => {
    setCurrUser(user);
  }, [user]);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    console.log(currUser);

    try {
      await fetch(`${BASE_URL}/public/v2/users/${currUser.id}`, {
        method: "PUT",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(currUser),
      });
      alert("Successfully Updated User!");
    } catch (e) {
      alert(e)
    }
  }

  return (
    <form className="edit-form" onSubmit={handleSubmit}>
      <div className="edit-form-header">
        <h3>Edit User</h3>
        {/* <button className="btn-cancel">Cancel</button> */}
      </div>
      <div className="form-item">
        <label htmlFor="name">Name</label>
        <input
          className="name"
          type="text"
          value={currUser.name}
          onChange={(e) =>
            setCurrUser((prevUser) => ({
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
          value={currUser.email}
          onChange={(e) =>
            setCurrUser((prevUser) => ({
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
          value={currUser.gender}
          onChange={(e) =>
            setCurrUser((prevUser) => ({
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
          value={currUser.status}
          onChange={(e) =>
            setCurrUser((prevUser) => ({
              ...prevUser,
              status: e.target.value,
            }))
          }
        />
      </div>
      <button>Save</button>
    </form>
  );
};

export default EditForm;
