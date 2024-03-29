import React, { Fragment, useEffect, useState } from "react";

interface Photo {
  albumId: number;
  id: number;
  title: string;
  url: string;
}

const Photos: React.FC = () => {
  const [photosData, setPhotosData] = useState<Photo[]>([]);
  const [page, setPage] = useState(0);
  const [albumId, setAlbumId] = useState("");
  const [showLoadMore, setShowLoadMore] = useState(true);
  const [pageSize, setPageSize] = useState(12);

  useEffect(() => {
    loadPhotosByAlbumId();
  }, [page]);

  const loadPhotosByAlbumId = () => {
    let url = `https://jsonplaceholder.typicode.com/photos?_start=${page}&_limit=${pageSize}`;
    if (albumId.trim() !== "") {
      url += `&albumId=${albumId}`;
    }
    fetch(url)
      .then((res) => {
        if (!res.ok) {
          throw new Error("Network error");
        }
        return res.json();
      })
      .then((data: Photo[]) => {
        setPhotosData((prevPhotos) => [...prevPhotos, ...data]);
        console.log(photosData);
        if (data.length < pageSize) {
          setShowLoadMore(false);
        }
      })
      .catch((err) => {
        console.error("There was a problem with your fetch operation:", err);
      });
  };

  const loadMorePhotos = () => {
    setPage((prev) => prev + 12);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAlbumId(e.target.value);
    setPage(0);
  };

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setPhotosData([]);
    loadPhotosByAlbumId();
    setPage(0);
    setShowLoadMore(true);
    setPageSize(12);
  };

  return (
    <Fragment>
      <div className="py-2 container">
        <div className="row">
          <div className="col-12">
            <h2 className="h2 fw-bold">Photos</h2>
          </div>
        </div>

        <div className="my-4 row">
          <div className="col-12">
            <form
              action="#"
              className="d-flex items-center gap-2"
              onSubmit={handleSearch}
            >
              <div className="">
                <select name="filter" className="form-select">
                  <option value="albumId">Album Id</option>
                </select>
              </div>
              <div className="">
                <input
                  name="search"
                  className="form-control"
                  placeholder="Search by album id"
                  value={albumId}
                  onChange={handleInputChange}
                />
              </div>
              <button type="submit" className="btn btn-primary">
                Search
              </button>
            </form>
          </div>
        </div>

        {photosData.length === 0 ? (
          <div className="col-12">
            <h2 className="h2">No results</h2>
          </div>
        ) : (
          <>
            <div className="row">
              {photosData.map((photo: any, index: number) => (
                <div className="mb-4 col-3" key={index}>
                  <div className="w-100 card">
                    <img className="card-img-top" src={photo.url} />
                    <div className="card-body">
                      <div className="w-full text-truncate card-title h5">
                        {photo.title}
                      </div>
                      <p className="mb-1 card-text">Id: #{photo.id}</p>
                      <p className="card-text">Album Id: #{photo.albumId}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="row">
              <div className="col-12">
                <div className="w-100 text-center">
                  {showLoadMore ? (
                    <button
                      type="button"
                      className="btn btn-primary"
                      onClick={loadMorePhotos}
                    >
                      Load more
                    </button>
                  ) : (
                    ""
                  )}
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </Fragment>
  );
};

export default Photos;
