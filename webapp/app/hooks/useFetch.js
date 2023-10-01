import { useState } from "react";

const useFetch = (url) => {
  const [google_loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleGoogle = async (response) => {
    setLoading(true);

    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify({ credential: response.credential })
    })
      .then((res) => {
        setLoading(false);
        return res.json();
      })
      .then((data) => {
        if (data?.user) {
          localStorage.setItem("user", JSON.stringify(data?.user));
          localStorage.setItem("TOKEN", data?.token)
          window.location.href = "/";
        }

      })
      .catch((error) => {
        setError(error?.message);
      });
  };
  return { google_loading, error, handleGoogle };
};

export default useFetch;