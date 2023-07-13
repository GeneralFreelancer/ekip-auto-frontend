/* eslint-disable no-duplicate-case */
import { useState, useEffect, useRef } from "react";
import AdminTitle from "./AdminCardList/AdminTitle";
import AdminCardList from "./AdminCardList";
import AdminButtons from "./AdminButtons";
import axios from "axios";
import { useSelector } from "react-redux";
import { selectedUser } from "../../redux/features/userSlice";
import { useParams, useNavigate } from "react-router-dom";

const baseUrl = process.env.REACT_APP_BASE_URL;

const images1 = [
  "https://images.unsplash.com/photo-1509721434272-b79147e0e708?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1500&q=80",
  "https://images.unsplash.com/photo-1506710507565-203b9f24669b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1536&q=80",
  "https://images.unsplash.com/photo-1536987333706-fc9adfb10d91?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1500&q=80",
  "https://images.unsplash.com/photo-1536987333706-fc9adfb10d91?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1500&q=80",
  "https://images.unsplash.com/photo-1536987333706-fc9adfb10d91?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1500&q=80",
];
const images2 = [
  "https://images.unsplash.com/photo-1509721434272-b79147e0e708?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1500&q=80",
  "https://images.unsplash.com/photo-1506710507565-203b9f24669b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1536&q=80",
  "https://images.unsplash.com/photo-1536987333706-fc9adfb10d91?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1500&q=80",
  "https://images.unsplash.com/photo-1536987333706-fc9adfb10d91?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1500&q=80",
  "https://images.unsplash.com/photo-1536987333706-fc9adfb10d91?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1500&q=80",
];
const images3 = [
  "https://images.unsplash.com/photo-1509721434272-b79147e0e708?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1500&q=80",
  "https://images.unsplash.com/photo-1506710507565-203b9f24669b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1536&q=80",
  "https://images.unsplash.com/photo-1536987333706-fc9adfb10d91?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1500&q=80",
  "https://images.unsplash.com/photo-1536987333706-fc9adfb10d91?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1500&q=80",
  "https://images.unsplash.com/photo-1536987333706-fc9adfb10d91?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1500&q=80",
];

const AdminComponentsSlider = () => {
  const [temporalDesktop, setTemporalDesktop] = useState(images1);
  const [temporalTablet, setTemporalTablet] = useState(images2);
  const [temporalMobile, setTemporalMobile] = useState(images3);
  const fileInputRef = useRef(null);
  const user = useSelector(selectedUser);

  const navigate = useNavigate();

  useEffect(() => {
    //Запит на бек по фото
  });

  const onDelete = (index, name) => {
    let updatedArray = [];
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

  const onHandleImageUpload = (event, name) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = (e) => {
      const imageUrl = e.target.result;
      // Виконати дії з отриманим URL зображення (наприклад, зберегти або відобразити)
      console.log("Завантажено зображення:", imageUrl);
    };

    reader.readAsDataURL(file);
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
    if ((name = "close")) {
      navigate(-1);
      // setTemporalDesktop(images1);
      // setTemporalTablet(images2);
      // setTemporalMobile(images3);
    } else if (name === "save") {
        // let formattedArray = images.map((image) => image.split("/").pop());
        // const savePhotoArray = async () => {
        //   try {
        //     const response = await axios.put(
        //       `${baseUrl}/product`,
        //       { id, pictures: formattedArray },
        //       {
        //         headers: {
        //           Authorization: `Bearer ${user.token}`,
        //         },
        //       }
        //     );
        //     setImages(response.data.product.pictures);
        //   } catch (error) {
        //     console.error(error);
        //   }
        // };
        // savePhotoArray();
        // navigate(-1);
    }
  };

  const addNewCard = () => {
    fileInputRef.current.click();

    // let updatedArray = [];
    // switch (name) {
    //   case "desktop":
    //     updatedArray = [...temporalDesktop];
    //     updatedArray.push(
    //       "https://images.unsplash.com/photo-1509721434272-b79147e0e708?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1500&q=80"
    //     );
    //     setTemporalDesktop(updatedArray);
    //     break;
    //   case "tablet":
    //     updatedArray = [...temporalTablet];
    //     updatedArray.push(
    //       "https://images.unsplash.com/photo-1509721434272-b79147e0e708?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1500&q=80"
    //     );
    //     setTemporalTablet(updatedArray);
    //     break;
    //   case "mobile":
    //     updatedArray = [...temporalMobile];
    //     updatedArray.push(
    //       "https://images.unsplash.com/photo-1509721434272-b79147e0e708?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1500&q=80"
    //     );
    //     setTemporalMobile(updatedArray);
    //     break;
    //   default:
    //     return;
    // }
  };

  const handleFileChange = (e) => {
    let reader = new FileReader();
    const file = e.target.files[0];
    reader.onload = () => {
      // sendImageToBD(id, file, file.name);
    };
    reader.readAsDataURL(file);
  };

  const sendImageToBD = async (id, file, filename) => {
    const formData = new FormData();
    formData.append("image", file, filename);
    formData.append("productId", id);
    try {
      const response = await axios.post(`${baseUrl}/product/image`, formData, {
        headers: {
          Authorization: `Bearer ${user.token}`,
          "Content-Type": "multipart/form-data",
        },
      });
      // setImages(response.data.product.pictures);
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
        />
        <AdminCardList
          name={"tablet"}
          onChangePosition={onChangePosition}
          onDelete={onDelete}
          arr={temporalTablet}
          size={"1024px × 465px"}
          addNewCard={addNewCard}
        />
        <AdminCardList
          name={"mobile"}
          onChangePosition={onChangePosition}
          onDelete={onDelete}
          arr={temporalMobile}
          size={"540px × 453px"}
          addNewCard={addNewCard}
        />

        <input
          ref={fileInputRef}
          style={{ opacity: "0" }}
          type="file"
          onChange={handleFileChange}
          accept="image/*,.png,.jpg,.web"
        />
      </div>
      <AdminButtons onClickMainButton={onClickMainButton} />
    </>
  );
};

export default AdminComponentsSlider;
