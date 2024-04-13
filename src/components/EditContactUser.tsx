import React, { useState } from "react";
import { UserData } from "./UsersInfor";

interface EditContactProps {
  editContact: (newUserData: UserData) => void;
  userData: UserData;
}

const EditContactUser: React.FC<EditContactProps> = ({
  editContact,
  userData,
}) => {
  const [email, setEmail] = useState(userData.email);
  const [phone, setPhone] = useState(userData.phone);
  const [website, setWebsite] = useState(userData.website);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    fetch(`https://jsonplaceholder.typicode.com/users/${userData.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...userData,
        email,
        phone,
        website,
      }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((updatedUserData) => {
        console.log("Updated user data:", updatedUserData);
        editContact(updatedUserData);
      })
      .catch((error) => {
        console.error("Error updating user data:", error);
      });
  };

  const handleReset = () => {
    setEmail(userData.email);
    setPhone(userData.phone);
    setWebsite(userData.website);
  };

  return (
    <form action="" className="form-control">
      <div className="mb-3 row">
        <div className="col-12">
          <label htmlFor="email" className="form-label">
            Email:
          </label>
          <input
            type="text"
            name="email"
            className="form-control"
            placeholder="Type your new email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
      </div>

      <div className="mb-3 row">
        <div className="col-12">
          <label htmlFor="website" className="form-label">
            Website:
          </label>
          <input
            type="text"
            name="website"
            className="form-control"
            placeholder="Type your new website"
            value={website}
            onChange={(e) => setWebsite(e.target.value)}
          />
        </div>
      </div>

      <div className="mb-3 row">
        <div className="col-12">
          <label htmlFor="phone" className="form-label">
            Phone:
          </label>
          <input
            type="text"
            name="phone"
            className="form-control"
            placeholder="Type your new phone number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
        </div>
      </div>

      <div className="row">
        <div className="col-12">
          <div className="d-flex items-center gap-3">
            <button
              className="btn btn-success"
              type="submit"
              onClick={handleSubmit}
            >
              Submit
            </button>
            <button
              className="btn btn-danger"
              type="button"
              onClick={handleReset}
            >
              Reset
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default EditContactUser;
