import React, { useEffect, useState } from "react";
import axios from "axios";
import { useCookies } from "react-cookie";

const Icon = () => {
  const [cookies] = useCookies(["token"]);
  const [user, setUser] = useState({ name: "", iconUrl: "" });
  const url = "https://railway.bookreview.techtrain.dev";

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(`${url}/users`, {
          headers: {
            Authorization: `Bearer ${cookies.token}`,
          },
        });

        if (response.status === 200) {
          setUser(response.data);
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, [cookies.token, url]);

  return (
    <div>
      {user.iconUrl && (
        <img
          src={user.iconUrl}
          alt="User Icon"
          style={{
            width: "1cm",
            height: "1cm",
            borderRadius: "50%",
            objectFit: "cover",
          }}
        />
      )}
      <p> {user.name}さん</p>
    </div>
  );
};

export default Icon;
