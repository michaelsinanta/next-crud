import Head from "next/head";
import React, { useState, useEffect, setState } from "react";
const TOKEN =
  "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjcwNDkwMDY0LCJpYXQiOjE2Njc4OTgwNjQsImp0aSI6ImE3NGIwZWZhODA1YTQ2ODQ5MTBkNzg2ZjdlZDFmYmY0IiwidXNlcl9pZCI6Njl9.30WBLw0dCgFDJO-Eh4oihIlYiAGKqM4AAMBAFZt3k88";
import Card from "../components/Card";

export default function Home() {
  const [showModal, setShowModal] = useState(false);
  const [data, setData] = useState([]);
  const [nama, setNama] = useState("");
  const [date, setDate] = useState("");
  const [desc, setDesc] = useState("");
  const [image, setImage] = useState();

  useEffect(() => {
    const loadData = async() => {
      await fetch("https://betis23-oprec.herokuapp.com/roti/", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${TOKEN}`,
        },
      })
        .then((response) => response.json())
        .then((receiveData) => setData(receiveData));
    };
    loadData();
  });

  const handleChangeImage = (event) => {
    var output = document.getElementById("frame");
    let img = event.target.files[0];
    setImage(img);
    output.src = URL.createObjectURL(img);
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      name: nama,
      description: desc,
      expired_date: date,
      image: image,
    };
    console.log(data);

    const formData = new FormData();
    for (const [key, value] of Object.entries(data)) {
      formData.append(key, value);
    }

    const response = await post(formData);
  };

  const post = async(data) => {
    await fetch("https://betis23-oprec.herokuapp.com/roti/", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${TOKEN}`,
      },
      body: data,
    }).then(console.log("post"));
  };

  return (
    <>
      <div>
        <Head>
          <title>Michael's Bread</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <div className="fixed top-0 w-full z-10 shadow-md flex flex-row bg-white items-center">
          <div className="flex w-full justify-center z-100 items-center">
            <img
              className="w-14"
              src="https://user-images.githubusercontent.com/97111982/201366106-f826e3e0-76da-4643-b057-c234828da576.png"
            ></img>
            <p className="text-2xl font-bold text-gray-800">Michael's Bread</p>
          </div>
          <div
            className="flex absolute w-full justify-end gap-1 lg:pr-10 md:pr-10 pr-5"
            onClick={() => setShowModal(true)}
          >
            <img
              className="w-7"
              src="https://registerparks.pittsburghpa.gov/Themes/Pittsburg2015/images/t.png"
            ></img>
            <p className="text-lg font-bold text-gray-800 lg:block md:block hidden">
              Add Bread
            </p>
          </div>
        </div>

        <div className="lg:m-20 m-10 p-0 lg:mt-26 mt-24">
          <div className="flex justify-center mt-4 flex-wrap gap-10 grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-x-10">
            {data.length != 0
              ? data.data.map((item) => <Card data={item} />)
              : ""}
          </div>
        </div>
      </div>
      {showModal ? (
        <>
          <div className="flex justify-center items-center overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none bg-black bg-opacity-20">
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                <form
                  className="flex flex-col px-10 py-5"
                  onSubmit={handleSubmit}
                >
                  <div className="flex flex-row justify-between items-center">
                    <h1 className="font-bold text-xl mb-3">Add Roti</h1>
                    <img className="w-6 h-6 cursor-pointer" onClick={() => setShowModal(false)} src="https://static.thenounproject.com/png/261420-200.png"></img>
                  </div>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleChangeImage}
                  />
                  <img
                    id="frame"
                    onChange={handleChangeImage}
                    className="flex float-left object-cover w-full h-[300px] mt-1 rounded-md p-2 border border-slate-400 bg-gray-100"
                  ></img>
                  <label>
                    <span class="flex text-md font-bold flex pt-2">Name</span>
                    <input
                      type="text"
                      name="nama"
                      autoComplete="false"
                      required
                      onChange={handleChangeName}
                      class="w-full px-2 py-1 rounded-md bg-gray-100 border border-gray-200 placeholder-gray-500 text-md focus:outline-none focus:border-gray-400 focus:bg-white"
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
                      required
                      onChange={handleChangeDate}
                      class="w-full px-2 py-1 rounded-md bg-gray-100 border border-gray-200 placeholder-gray-500 text-md focus:outline-none focus:border-gray-400 focus:bg-white"
                    />
                  </label>
                  <label>
                    <span class="flex text-md font-bold flex pt-2">
                      Description
                    </span>
                    <textarea
                      name="desc"
                      autoComplete="false"
                      required
                      onChange={handleChangeDesc}
                      class="w-full px-2 py-1 rounded-md bg-gray-100 border border-gray-200 placeholder-gray-500 text-md focus:outline-none focus:border-gray-400 focus:bg-white"
                    />
                  </label>
                  <button
                    type="submit"
                    class="mt-2 w-full justify-center flex inline-flex items-center px-4 py-2 font-semibold bg-indigo-500 text-white rounded-lg hover:bg-indigo-700 transition-all duration-300 ease-in-out focus:shadow-outline focus:outline-none"
                  >
                    Submit
                  </button>
                </form>
              </div>
            </div>
          </div>
        </>
      ) : null}
    </>
  );
}
