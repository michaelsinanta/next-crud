import React, { useState } from "react";

const Card = ({ data }) => {
  const TOKEN =
    "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjcwNDkwMDY0LCJpYXQiOjE2Njc4OTgwNjQsImp0aSI6ImE3NGIwZWZhODA1YTQ2ODQ5MTBkNzg2ZjdlZDFmYmY0IiwidXNlcl9pZCI6Njl9.30WBLw0dCgFDJO-Eh4oihIlYiAGKqM4AAMBAFZt3k88";
  const [showModal, setShowModal] = useState(false);
  const [nama, setNama] = useState(data.name);
  const [date, setDate] = useState(data.expired_date);
  const [desc, setDesc] = useState(data.description);
  const [image, setImage] = useState(data.image);
  const [isEditing, setIsEditing] = useState(false);

  const handleChangeImage = (event) => {
    var output = document.getElementById("frame");
    let img = event.target.files[0];
    setImage(img);
    output.src = URL.createObjectURL(img);
    setIsEditing(true);
  };

  const handleChangeName = (event) => {
    setNama(event.target.value);
  };

  const handleChangeDate = (event) => {
    setDate(event.target.value);
  };

  const handleChangeDesc = (event) => {
    setDesc(event.target.value);
  };

  const deleteData = async () => {
    await fetch(`https://betis23-oprec.herokuapp.com/roti/${data.id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${TOKEN}`,
      },
    }).then((response) => response.json());
  };

  const editData = async (e) => {
    e.preventDefault();
    const data = isEditing
      ? {
          name: nama,
          description: desc,
          expired_date: date,
          image: image,
        }
      : {
          name: nama,
          description: desc,
          expired_date: date,
        };

    const formData = new FormData();
    for (const [key, value] of Object.entries(data)) {
      formData.append(key, value);
    }

    const response = await patch(formData);
  };

  const patch = async (edit) => {
    await fetch(`https://betis23-oprec.herokuapp.com/roti/${data.id}`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${TOKEN}`,
      },
      body: edit,
    }).then(console.log("berhasil"));
  };

  return (
    <>
      <div class="rounded-2xl overflow-hidden shadow-lg flex flex-col relative items-center justify-center">
        <img
          class="flex float-left object-cover w-full h-[300px] group"
          src={data.image}
          alt="Gambar tidak ditemukan"
        ></img>
        <div className="flex flex-col justify-start w-full ml-10 text-base">
          <div class="flex flex-row items-center gap-3 pt-2">
            <div class="w-5 h-5">
              <img
                src="https://www.freeiconspng.com/thumbs/person-icon/person-icon-8.png"
                alt=""
              ></img>
            </div>
            <div>{data.name}</div>
          </div>
          <div class="flex flex-row items-center gap-3 pt-1">
            <div class="w-5 h-5">
              <img
                src="https://icons.veryicon.com/png/o/internet--web/alibaba-cloud-classic-console-icon/time-and-date.png"
                alt=""
              ></img>
            </div>
            <div>{data.expired_date}</div>
          </div>
          <div class="flex flex-row items-center gap-3 pt-1">
            <div class="w-5 h-5">
              <img
                src="https://www.freeiconspng.com/thumbs/information-icon/information-icon-3.png"
                alt=""
              ></img>
            </div>
            <div>{data.description}</div>
          </div>
        </div>
        <div class="flex flex-row w-full justify-end gap-2 pb-3 mr-7">
          <a
            onClick={() => setShowModal(true)}
            class="cursor-pointer px-5 py-1 text-base font-semibold bg-indigo-500 text-white mt-4 rounded-lg hover:bg-indigo-700 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none"
          >
            Edit Bread
          </a>
          <a
            onClick={deleteData}
            class="cursor-pointer px-5 py-1 text-base font-semibold border-2 mt-4 rounded-lg hover:bg-green-500 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none"
          >
            Delete
          </a>
        </div>
      </div>
      {showModal ? (
        <>
          <div className="flex justify-center items-center overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none bg-black bg-opacity-20 lg:pt-0 md:pt-0 pt-20">
            <div className="relative">
              <div className="rounded-lg flex flex-col w-full bg-white">
                <div className="flex items-start justify-between p-5 border-b border-solid">
                  <h3 className="text-xl font-bold">Bread Information</h3>
                  <img
                    className="w-6 h-6 cursor-pointer"
                    onClick={() => setShowModal(false)}
                    src="https://static.thenounproject.com/png/261420-200.png"
                  ></img>
                </div>

                <form className="flex flex-col px-7 py-7" onSubmit={editData}>
                  <div className="flex flex-col md:flex-row h-full lg:space-x-7">
                    <div className="flex flex-col">
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleChangeImage}
                      />
                      <div className="w-full max-w-[400px] aspect-square relative rounded-3xl overflow-hidden flex justify-center items-center">
                        <img
                          id="frame"
                          src={data.image}
                          onChange={handleChangeImage}
                          fill={true}
                          className="flex float-left object-cover w-full h-[300px] mt-1 rounded-md p-2 border border-slate-400 bg-gray-100"
                        ></img>
                      </div>
                    </div>
                    <div className="w-full flex flex-col justify-between">
                      <div className="flex flex-col">
                        <label>
                          <span class="flex text-md font-bold flex pt-2">
                            Name
                          </span>
                          <input
                            type="text"
                            name="name"
                            defaultValue={data.name}
                            autoComplete="false"
                            className="w-full px-2 py-1 rounded-md bg-gray-100 border border-gray-200 placeholder-gray-500 text-md focus:outline-none focus:border-gray-400 focus:bg-white"
                            required
                            onChange={handleChangeName}
                          />
                        </label>
                        <label>
                          <span class="flex text-md font-bold flex pt-2">
                            Expiring Date
                          </span>
                          <input
                            type="date"
                            name="date"
                            autoComplete="false"
                            className="w-full px-2 py-1 rounded-md bg-gray-100 border border-gray-200 placeholder-gray-500 text-md focus:outline-none focus:border-gray-400 focus:bg-white"
                            required
                            defaultValue={data.expired_date}
                            onChange={handleChangeDate}
                          />
                        </label>
                        <label>
                          <span class="flex text-md font-bold flex pt-2">
                            Description
                          </span>
                          <textarea
                            name="desc"
                            autoComplete="false"
                            className="w-full px-2 py-1 rounded-md bg-gray-100 border border-gray-200 placeholder-gray-500 text-md focus:outline-none focus:border-gray-400 focus:bg-white"
                            required
                            defaultValue={data.description}
                            onChange={handleChangeDesc}
                          />
                        </label>
                      </div>
                    </div>
                  </div>
                  <button
                    type="submit"
                    class="mt-2 w-full justify-center flex inline-flex items-center px-4 py-2 font-semibold bg-indigo-500 text-white rounded-lg hover:bg-indigo-700 transition-all duration-300 ease-in-out focus:shadow-outline focus:outline-none"
                  >
                    Edit
                  </button>
                </form>
              </div>
            </div>
          </div>
        </>
      ) : null}
    </>
  );
};

export default Card;
