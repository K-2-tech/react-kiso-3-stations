import Compressor from "compressorjs";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useCookies } from "react-cookie";
import React from "react";

const SetIcon = () => {
  const [cookies] = useCookies(["token"]);
  const navigate = useNavigate();
  const url = "https://railway.bookreview.techtrain.dev";
  //const [iconUrl, setIconUrl] = useState("");

  const handleImageUpload = (e) => {
    e.preventDefault();
    const file = e.target.files[0];

    if (!file) {
      console.error("ファイルが選択されていません");
      return;
    }

    new Compressor(file, {
      quality: 0.6,
      success(result) {
        const fileSizeInMB = result.size / 1024 / 1024;
        if (fileSizeInMB > 1) {
          console.error("ファイルサイズが1MBを超えています");
          return;
        }

        const formData = new FormData();
        formData.append("icon", result);

        console.log("FormData content: ", formData.get("icon"));

        axios
          .post(`${url}/uploads`, formData, {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: `Bearer ${cookies.token}`,
            },
          })
          .then((response) => {
            console.log(response.data);
            console.log("ok");
            //setIconUrl(response.data.iconUrl);
            navigate("/");
          })
          .catch((error) => {
            console.error("Error uploading the image:", error);
            console.error("Error response: ", error.response);
          });
      },
    });
  };

  return (
    <>
      <div>
        <label htmlFor="file">アイコン画像をアップロード:</label>
        <input type="file" id="file" name="file" onChange={handleImageUpload} />
      </div>
    </>
  );
};

export default SetIcon;
