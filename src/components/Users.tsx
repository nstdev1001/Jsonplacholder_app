import { useEffect, useState } from "react";
import style from "../styles/style.module.css";
import { Link, useNavigate } from "react-router-dom";

interface UserData {
  id: number;
  name: string;
  username: string;
  email: string;
  phone: string;
  website: string;
  city: string;
  company: {
    name: string;
  };
}

const Users = () => {
  const [usersData, setUsersData] = useState<UserData[]>([]);

  const navigate = useNavigate();

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((res) => {
        if (!res.ok) {
          throw new Error("Network error");
        }
        return res.json();
      })
      .then((data) => {
        setUsersData(data);
      })
      .catch((err) => {
        console.error("There was a problem with your fetch operation:", err);
      });
  }, []);

  return (
    <div>
      <div className="container py-2">
        <div className="row">
          <div className="col-12">
            <h2 className="fw-bold">Users</h2>
          </div>

          <div className="col-12">
            <table className="table table-striped table-hover">
              <thead>
                <tr>
                  <th>id</th>
                  <th>name</th>
                  <th>username</th>
                  <th>email</th>
                  <th>phone</th>
                  <th>website</th>
                  <th>city</th>
                  <th>company name</th>
                </tr>
              </thead>
              <tbody>
                {usersData.map((user: UserData) => (
                  <tr
                    key={user.id}
                    className={`${style.cursorPointer}`}
                    onClick={() =>
                      navigate(`/users/${user.id}`, {
                        state: { userData: user },
                      })
                    }
                  >
                    <td>{user.id}</td>
                    <td>{user.name}</td>
                    <td>{user.username}</td>
                    <td>{user.email}</td>
                    <td>{user.phone}</td>
                    <td>{user.website}</td>
                    <td>{user.city}</td>
                    <td>{user.company.name}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Users;
