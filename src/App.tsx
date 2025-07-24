import "./App.css";
import Navbar from "./components/Navbar";
import Form from "./pages/form/Form";
import Users from "./pages/users/Users";

function App() {
  return (
    <div className="wrapper">
      {/* <Navbar /> */}
      <Form />
      <Users />
    </div>
  );
}

export default App;
