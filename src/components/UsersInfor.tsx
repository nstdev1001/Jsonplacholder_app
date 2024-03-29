import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import EditContactUser from "./EditContactUser";

interface UserData {
  address: any;
  id: number;
  name: string;
  username: string;
  email: string;
  phone: string;
  website: string;
  city: string;
  company: {
    catchPhrase: string;
    bs: string;
    name: string;
  };
  isEditContact: boolean;
}

const UsersInfor = () => {
  const location = useLocation();
  const initialUserData: UserData = location.state?.userData;
  const [isEditContact, setIsEditContact] = useState(false);
  const [userData, setUserData] = useState<UserData>(initialUserData);
  const [userAlbum, setUserAlbum] = useState<UserData[]>([]);

  const handleEditContact = () => {
    setIsEditContact(true);
  };

  const handleSaveContact = (newUserData: UserData) => {
    console.log("new user data :", newUserData);

    setUserData(newUserData);
    setIsEditContact(false);
  };

  useEffect(() => {
    fetch(`https://jsonplaceholder.typicode.com/albums?userId=${userData.id}`)
      .then((res) => {
        if (!res.ok) {
          throw new Error("Network error");
        }
        return res.json();
      })
      .then((data) => {
        setUserAlbum(data);
      })
      .catch((err) => {
        console.error("There was a problem with your fetch operation:", err);
      });
  }, []);

  console.log(userAlbum);

  const handleAddAlbum = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const titleInput = event.currentTarget.querySelector('input[type="text"]');

    if (titleInput && titleInput.value.trim() !== "") {
      const newAlbumData = {
        title: titleInput.value.trim(),
        userId: userData.id,
      };

      fetch("https://jsonplaceholder.typicode.com/albums", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newAlbumData),
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          return response.json();
        })
        .then((newAlbum) => {
          console.log(newAlbum);
          setUserAlbum([...userAlbum, newAlbum]);
        })
        .catch((error) => {
          console.error("Error creating album:", error);
        });

      // Reset input value
      titleInput.value = "";
    } else {
      alert("Please enter a valid album title");
    }
  };

  const handleDelete = (albumId: number) => {
    fetch(`https://jsonplaceholder.typicode.com/albums/${albumId}`, {
      method: "DELETE",
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((newAlbum) => {
        console.log(newAlbum);
        const newUserAlbum = userAlbum.filter((album) => album.id !== albumId);
        console.log(albumId);
        setUserAlbum(newUserAlbum);
      })
      .catch((error) => {
        console.error("Error delete album:", error);
      });
  };

  if (!userData) {
    return <div>No user data found</div>;
  }

  return (
    <div>
      <div className="container py-2">
        <div className="mb-4 row">
          <div className="col-12">
            <div className="mn-4 row">
              <div className="col-6">
                <h2>{userData.name} </h2>
              </div>
            </div>
            <div className="row infor-container">
              <div className="col-6">
                <div className="d-flex flex-column gap-4 left-side-container">
                  <div className="row personal-wrapper">
                    <div className="col-12">
                      <h4 className="text-info">Personal:</h4>
                    </div>
                    <div className="col-12">
                      <div className="row">
                        <div className="col-lg-3 col-4">
                          <p className="mb-0">Id:</p>
                        </div>
                        <div className="col-lg-9 col-8">
                          <p className="mb-0 fw-bold">{userData.id}</p>
                        </div>
                      </div>

                      <div className="row">
                        <div className="col-lg-3 col-4">
                          <p className="mb-0">Username:</p>
                        </div>
                        <div className="col-lg-9 col-8">
                          <p className="mb-0 fw-bold">{userData.username}</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="row Address-wrapper">
                    <div className="col-12">
                      <h4 className="text-info">Address:</h4>
                    </div>
                    <div className="col-12">
                      <div className="row">
                        <div className="col-lg-3 col-4">
                          <p className="mb-0">Street:</p>
                        </div>
                        <div className="col-lg-9 col-8">
                          <p className="mb-0 fw-bold">
                            {userData.address.street}
                          </p>
                        </div>
                      </div>

                      <div className="row">
                        <div className="col-lg-3 col-4">
                          <p className="mb-0">Suite:</p>
                        </div>
                        <div className="col-lg-9 col-8">
                          <p className="mb-0 fw-bold">
                            {userData.address.suite}
                          </p>
                        </div>
                      </div>

                      <div className="row">
                        <div className="col-lg-3 col-4">
                          <p className="mb-0">City:</p>
                        </div>
                        <div className="col-lg-9 col-8">
                          <p className="mb-0 fw-bold">
                            {userData.address.city}
                          </p>
                        </div>
                      </div>

                      <div className="row">
                        <div className="col-lg-3 col-4">
                          <p className="mb-0">Zipcode:</p>
                        </div>
                        <div className="col-lg-9 col-8">
                          <p className="mb-0 fw-bold">
                            {userData.address.zipcode}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="row Company-Wrapper">
                    <div className="col-12">
                      <h4 className="text-info">Company:</h4>
                    </div>
                    <div className="col-12">
                      <div className="row">
                        <div className="col-lg-3 col-4">
                          <p className="mb-0">Name:</p>
                        </div>
                        <div className="col-lg-9 col-8">
                          <p className="mb-0 fw-bold">
                            {userData.company.name}
                          </p>
                        </div>
                      </div>

                      <div className="row">
                        <div className="col-lg-3 col-4">
                          <p className="mb-0">CatchPhrase:</p>
                        </div>
                        <div className="col-lg-9 col-8">
                          <p className="mb-0 fw-bold">
                            {userData.company.catchPhrase}
                          </p>
                        </div>
                      </div>

                      <div className="row">
                        <div className="col-lg-3 col-4">
                          <p className="mb-0">Bs:</p>
                        </div>
                        <div className="col-lg-9 col-8">
                          <p className="mb-0 fw-bold">{userData.company.bs}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-6 right-side-container">
                <div className="row">
                  <div className="col-6">
                    <h4 className="text-info">Contact:</h4>
                  </div>
                  <div className="mb-2 col-12">
                    {isEditContact ? (
                      <EditContactUser
                        editContact={handleSaveContact}
                        userData={userData}
                      />
                    ) : (
                      <>
                        <div className="row">
                          <div className="col-lg-3 col-4">
                            <p className="mb-0">Email:</p>
                          </div>
                          <div className="col-lg-9 col-8">
                            <p className="mb-0 fw-bold">{userData.email}</p>
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-lg-3 col-4">
                            <p className="mb-0">Website:</p>
                          </div>
                          <div className="col-lg-9 col-8">
                            <p className="mb-0 fw-bold">{userData.website}</p>
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-lg-3 col-4">
                            <p className="mb-0">Phone:</p>
                          </div>
                          <div className="col-lg-9 col-8">
                            <p className="mb-0 fw-bold">{userData.phone}</p>
                          </div>
                        </div>
                        <button
                          className="btn btn-success mt-2"
                          onClick={handleEditContact}
                        >
                          Edit
                        </button>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Photo Albums */}
        <div className="row albums-container">
          <div className="col-12">
            <div className="border-top pt-3 mb-3 row">
              <h4>Photo Albums:</h4>
            </div>
            <div className="row mb-3 form-wrapper">
              <div className="col-6">
                <form
                  action=""
                  className="d-flex items-center gap-3"
                  onSubmit={handleAddAlbum}
                >
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Title of new album"
                  />
                  <button
                    type="submit"
                    className="flex-shrink-0 w-25 btn btn-success btn-lg"
                  >
                    New Album
                  </button>
                </form>
              </div>
            </div>

            <div className="row albums-wrapper">
              {userAlbum.map((album, index) => (
                <div key={index} className="mb-3 col-md-6">
                  <div className="d-flex items-center justify-content-between border rounded text-decoration-none text-black">
                    <div className="p-2 px-3 flex-shrink-0 border-end d-flex items-center justify-content-center w-20">
                      {index + 1}
                    </div>
                    <div className="py-2 w-100 px-4 text-truncate fw-bold text-start">
                      {album.title}
                    </div>
                    <div className="text-center flex-shrink-0 p-2  py-2">
                      <button
                        type="button"
                        className="btn btn-danger btn-sm"
                        onClick={() => {
                          handleDelete(album.id);
                        }}
                      >
                        <i className="fa-solid fa-x"></i>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
              {/* <div className="mb-3 col-md-6">
                <div className="d-flex items-center justify-content-between border rounded text-decoration-none text-black ">
                  <div className=" py-2 flex-shrink-0 border-end d-flex items-center justify-content-center w-10">
                    1
                  </div>
                  <div className="py-2 w-100 px-4 text-truncate fw-bold text-start">
                    quidem molestiae enim
                  </div>
                  <div className="text-center flex-shrink-0 w-10 py-2">
                    <button type="button" className="btn btn-danger btn-sm">
                      X
                    </button>
                  </div>
                </div>
              </div> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UsersInfor;
