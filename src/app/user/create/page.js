"use client";

import { get } from "@/core/httpClient";
import { useEffect, useState } from "react";

export default function UserCreate() {
  const [counter, setCounter] = useState(0);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState();

  const getFirstName = async () => {
    setLoading(true);

    let result = await get("/user/get-first-name");

    setData(result.data);
    setLoading(false);
  };

  useEffect(() => {
    getFirstName();
  }, [counter]);

  return (
    <>
      {loading === true ? (
        <h1>Loading...</h1>
      ) : (
        <>
          <h1>{data}</h1>
          <button
            onClick={() => {
              setCounter(counter + 1);
            }}
          >
            Add 1
          </button>
        </>
      )}
    </>
  );
}
