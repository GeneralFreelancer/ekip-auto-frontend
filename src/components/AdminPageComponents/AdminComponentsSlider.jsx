import { useState, useEffect, useRef } from "react";
import AdminTitle from "./AdminCardList/AdminTitle";
import AdminCardList from "./AdminCardList";
import AdminButtons from "./AdminButtons";
import axios from "axios";
import { useSelector } from "react-redux";
import { selectedUser } from "../../redux/features/userSlice";
import { useNavigate } from "react-router-dom";
import {
  setAdvertisingDesktop,
  setAdvertisingTablet,
  setAdvertisingMobile,
} from "../../redux/features/advertisingSlice";
import { useDispatch } from "react-redux";

const baseUrl = process.env.REACT_APP_BASE_URL;

const AdminComponentsSlider = () => {
  const [temporalDesktop, setTemporalDesktop] = useState([]);
  const [temporalTablet, setTemporalTablet] = useState([]);
  const [temporalMobile, setTemporalMobile] = useState([]);
  const [typeName, setTypeName] = useState("");

  const fileInputRef = useRef(null);
  const user = useSelector(selectedUser);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const getSliders = async () => {
    try {
      const response = await axios.get(`${baseUrl}/advertising`, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      setTemporalDesktop(response.data.advertising.desktop);
      setTemporalTablet(response.data.advertising.tablet);
      setTemporalMobile(response.data.advertising.mobile);
    } catch (error) {
      console.error("Error:", error.message);
    }
  };

  useEffect(() => {
    getSliders();
  }, [user.token]);

  const onDelete = async (index, url, name) => {
    let formattedArray = url.split("/");
    let formattedUrlName = formattedArray[formattedArray.length - 1];
    let updatedArray = [];
    try {
      const response = await axios.delete(`${baseUrl}/advertising/image`, {
        data: { image: formattedUrlName },
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      setTemporalDesktop(response.data.advertising.desktop);
      dispatch(setAdvertisingDesktop(response.data.advertising.desktop));
      setTemporalTablet(response.data.advertising.tablet);
      dispatch(setAdvertisingTablet(response.data.advertising.tablet));
      setTemporalMobile(response.data.advertising.mobile);
      dispatch(setAdvertisingMobile(response.data.advertising.mobile));
    } catch (error) {
      console.error(error);
    }
    switch (name) {
      case "desktop":
        updatedArray = temporalDesktop
          .slice(0, index)
          .concat(temporalDesktop.slice(index + 1));
        setTemporalDesktop(updatedArray);

        break;
      case "tablet":
        updatedArray = temporalTablet
          .slice(0, index)
          .concat(temporalTablet.slice(index + 1));
        setTemporalTablet(updatedArray);

        break;
      case "mobile":
        updatedArray = temporalMobile
          .slice(0, index)
          .concat(temporalMobile.slice(index + 1));
        setTemporalMobile(updatedArray);
        break;
      default:
        break;
    }
  };

  const onChangePosition = (direction, index, name) => {
    let updatedArray = [];
    switch (name) {
      case "desktop":
        updatedArray = [...temporalDesktop];
        break;
      case "tablet":
        updatedArray = [...temporalTablet];
        break;
      case "mobile":
        updatedArray = [...temporalMobile];
        break;
      default:
        return;
    }
    if (direction === "left" && index > 0) {
      [updatedArray[index - 1], updatedArray[index]] = [
        updatedArray[index],
        updatedArray[index - 1],
      ];
    } else if (direction === "right" && index < updatedArray.length - 1) {
      [updatedArray[index], updatedArray[index + 1]] = [
        updatedArray[index + 1],
        updatedArray[index],
      ];
    }
    switch (name) {
      case "desktop":
        setTemporalDesktop(updatedArray);
        break;
      case "tablet":
        setTemporalTablet(updatedArray);
        break;
      case "mobile":
        setTemporalMobile(updatedArray);
        break;
      default:
        return;
    }
  };

  const onClickMainButton = (name) => {
    if (name === "cancel") {
      navigate(-1);
    } else if (name === "save") {
      const formattedArray1 = temporalDesktop.map((item) => {
        const lastSlashIndex = item.Image.lastIndexOf("/");
        const imageName = item.Image.substring(lastSlashIndex + 1);
        return {
          image: imageName,
          url: item.url,
        };
      });
      const formattedArray2 = temporalTablet.map((item) => {
        const lastSlashIndex = item.Image.lastIndexOf("/");
        const imageName = item.Image.substring(lastSlashIndex + 1);
        return {
          image: imageName,
          url: item.url,
        };
      });
      const formattedArray3 = temporalMobile.map((item) => {
        const lastSlashIndex = item.Image.lastIndexOf("/");
        const imageName = item.Image.substring(lastSlashIndex + 1);
        return {
          image: imageName,
          url: item.url,
        };
      });
      const savePhotoArray = async () => {
        try {
          const response = await axios.put(
            `${baseUrl}/advertising`,
            {
              desktop: formattedArray1,
              tablet: formattedArray2,
              mobile: formattedArray3,
            },
            {
              headers: {
                Authorization: `Bearer ${user.token}`,
              },
            }
          );
          setTemporalDesktop(response.data.advertising.desktop);
          dispatch(setAdvertisingDesktop(response.data.advertising.desktop));
          setTemporalTablet(response.data.advertising.tablet);
          dispatch(setAdvertisingTablet(response.data.advertising.tablet));
          setTemporalMobile(response.data.advertising.mobile);
          dispatch(setAdvertisingMobile(response.data.advertising.mobile));
        } catch (error) {
          console.error(error);
        }
      };
      savePhotoArray();
      navigate(-1);
    }
  };

  const addLink = (event) => {
    let name = event.currentTarget.name,
      value = event.currentTarget.value,
      index = event.currentTarget.dataset.index;
    if (name === "desktop") {
      let updatedArray = [...temporalDesktop];
      updatedArray[index].url = value;
      setTemporalDesktop(updatedArray);
    } else if (name === "tablet") {
      let updatedArray = [...temporalTablet];
      updatedArray[index].url = value;
      setTemporalTablet(updatedArray);
    } else if (name === "mobile") {
      let updatedArray = [...temporalMobile];
      updatedArray[index].url = value;
      setTemporalMobile(updatedArray);
    }
  };

  const addNewCard = (name) => {
    fileInputRef.current.click();
    setTypeName(name);
  };

  const handleFileChange = (e) => {
    let reader = new FileReader();
    const file = e.target.files[0];
    reader.onload = () => {
      sendImageToBD(typeName, file, "");
    };
    reader.readAsDataURL(file);
  };

  const sendImageToBD = async (name, file, url) => {
    const formData = new FormData();
    formData.append("type", name);
    formData.append("image", file);
    formData.append("url", url);
    try {
      const response = await axios.post(
        `${baseUrl}/advertising/image`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      switch (name) {
        case "desktop":
          setTemporalDesktop(response.data.advertising.desktop);
          dispatch(setAdvertisingDesktop(response.data.advertising.desktop));
          break;
        case "tablet":
          setTemporalTablet(response.data.advertising.tablet);
          dispatch(setAdvertisingTablet(response.data.advertising.tablet));
          break;
        case "mobile":
          setTemporalMobile(response.data.advertising.mobile);
          dispatch(setAdvertisingMobile(response.data.advertising.mobile));
          break;
        default:
          return;
      }
      getSliders();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <div style={{ marginBottom: "70px" }}>
        <AdminTitle title={"Редагування фото реклами"} />
        <AdminCardList
          name={"desktop"}
          onChangePosition={onChangePosition}
          onDelete={onDelete}
          arr={temporalDesktop}
          size={"1920px × 508px"}
          addNewCard={addNewCard}
          updateLink={addLink}
        />
        <AdminCardList
          name={"tablet"}
          onChangePosition={onChangePosition}
          onDelete={onDelete}
          arr={temporalTablet}
          size={"1024px × 465px"}
          addNewCard={addNewCard}
          updateLink={addLink}
        />
        <AdminCardList
          name={"mobile"}
          onChangePosition={onChangePosition}
          onDelete={onDelete}
          arr={temporalMobile}
          size={"540px × 453px"}
          addNewCard={addNewCard}
          updateLink={addLink}
        />
      </div>
      <input
        ref={fileInputRef}
        style={{ opacity: "0" }}
        type="file"
        onChange={handleFileChange}
        accept="image/*,.png,.jpg,.web"
      />
      <AdminButtons onClickMainButton={onClickMainButton} />
    </>
  );
};

export default AdminComponentsSlider;
