import { useEffect, useState } from "react";
import "./users.css";
import EditForm from "../../components/EditForm";

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

const Users = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [edit, setEdit] = useState<Boolean>(false);
  const [count, setCount] = useState<number>(1);
  const [currUser, setCurrUser] = useState<User>({
    id: "",
    name: "",
    email: "",
    gender: "",
    status: "",
  });

  async function fetchUsers(page: number) {
    try {
      const res = await fetch(
        `${BASE_URL}/public/v2/users?page=${page}&per_page=10`
      );
      const data = await res.json();
      setUsers(data);
    } catch (e) {
      alert(e);
    }
  }

  useEffect(() => {
    fetchUsers(count);
  }, [count]);

  function handleSortName(): void {
    setUsers([...users].sort((a, b) => a.name.localeCompare(b.name)));
  }

  function handleSortEmail(): void {
    setUsers([...users].sort((a, b) => a.email.localeCompare(b.email)));
  }

  function handleEdit(user: User): void {
    setCurrUser(user);
    setEdit(true);
  }

  function handlePrev(): void {
    if (count <= 1) return;
    setCount((count) => count - 1);
  }

  async function handleDelete(user: User): Promise<void> {
    if (confirm(`Are you sure you want to delete ${user.name}`)) {
      try {
        await fetch(`${BASE_URL}/public/v2/users/${user.id}`, {
          method: "DELETE",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          }
        });
        alert("Successfully Deleted User!");
      } catch (e) {
        alert(e);
      }
    }
  }

  return (
    <div className="users">
      <div className="buttons">
        <button className="button" onClick={handleSortName}>
          Sort by name
        </button>
        <button className="button" onClick={handleSortEmail}>
          Sort by email
        </button>
      </div>
      <div className="users-list">
        {users.map((user) => {
          return (
            <div className="user" key={user.id}>
              <div className="user-detail">
                <p>
                  <strong>Name</strong>
                </p>
                <p className="user-name">{user.name}</p>
              </div>
              <div className="user-detail">
                <p>
                  <strong>Email</strong>
                </p>
                <p className="user-email">{user.email}</p>
              </div>
              <div className="user-detail">
                <p>
                  <strong>Gender</strong>
                </p>
                <p className="user-gender">{user.gender}</p>
              </div>
              <div className="user-detail">
                <p>
                  <strong>Status</strong>
                </p>
                <p className="user-status">{user.status}</p>
              </div>
              <button onClick={() => handleEdit(user)}>Edit</button>
              <button onClick={() => handleDelete(user)}>Hapus</button>
            </div>
          );
        })}
      </div>
      <div className="buttons">
        <button className="button" onClick={handlePrev}>
          Previous page
        </button>
        <button>{count}</button>
        <button
          className="button"
          onClick={() => setCount((count) => count + 1)}
        >
          Next page
        </button>
      </div>
      {edit && <EditForm user={currUser} />}
    </div>
  );
};

export default Users;
