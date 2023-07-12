/* eslint-disable no-duplicate-case */
import { useState, useEffect } from "react";
import AdminTitle from "./AdminCardList/AdminTitle";
import AdminCardList from "./AdminCardList";
import AdminButtons from "./AdminButtons";
import axios from "axios";
import { useSelector } from "react-redux";
import { selectedUser } from "../../redux/features/userSlice";
import { useParams } from "react-router-dom";

const baseUrl = process.env.REACT_APP_BASE_URL;

const images = [
  "https://www.mukachevo.net/Content/Uploads/IIIRomeoIII/61b0a55a500d3.jpg",
  "https://i1.poltava.to/uploads/2022/10/23/tv.jpg",
  "https://i.allo.ua/media/catalog/product/cache/3/image/468x468/602f0fa2c1f0d1ba5e241f914e856ff9/a/2/a2-32-front.jpg",
  "https://images.prom.ua/697887103_skupka-nespravnih-televizorivzhk.jpg",
  "https://images.unsplash.com/photo-1509721434272-b79147e0e708?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1500&q=80",
];

const AdminComponentsProductPhoto = () => {
  const [temporal, setTemporal] = useState(images);
  const user = useSelector(selectedUser);
  const { id } = useParams();
  const [file, setFile] = useState(null);
  const [imagePreviewUrl, setImagePreviewUrl] = useState('')

  useEffect(() => {
    //Запит на бек по фото
  }, []);

  const onDelete = (index) => {
    let updatedArray = [];

    updatedArray = temporal.slice(0, index).concat(temporal.slice(index + 1));
    setTemporal(updatedArray);
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

  const onChangePosition = (direction, index) => {
    let updatedArray = [];

    updatedArray = [...temporal];

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
    setTemporal(updatedArray);
  };

  // на заміну картинки після завантаження
  // айди, картинка, назва

  // на видалення картинки delete('/image'
  // айди,  назва картинки 1.jpg

  // маленький крестик внизу - без запиту, закриваємо сторінку і повертаємось на сторінку товару, послідовність не зберігається

  // маленька галочка внизу то йде запит на бек і зберіється сортування
  // put /product, айди и масив заголовків картинок

  const onClickMainButton = (name) => {
    if (name === "cancel") {
      setTemporal(images);
    } else if (name === "save") {
      //відправка на бек
      // на велики плюс після завантаження картинки
      const savePhoto = async () => {
        try {
          const response = await axios.post(
            `${baseUrl}/product/image`,
            // { productId: id, image },
            {
              headers: {
                Authorization: `Bearer ${user.token}`,
              },
            }
          );
          console.log(response);
        } catch (error) {
          console.error(error);
        }
      };
      savePhoto();
    }
  };

  const addNewCard = (e) => {
 
    // let reader = new FileReader();
    // let file = e.target.files[0];
    // reader.onloadend = () => {
    //   setFile(file);
    //   setImagePreviewUrl(reader.result);
    // };

    // reader.readAsDataURL(file);
    let updatedArray = [];
    updatedArray = [...temporal];
    updatedArray.push(
      "https://images.prom.ua/697887103_skupka-nespravnih-televizorivzhk.jpg"
    );
    setTemporal(updatedArray);
  };

  // let $imagePreview = null;
  // if (imagePreviewUrl) {
  //   $imagePreview = <img src={imagePreviewUrl} alt="Preview" />;
  // } else if (! $imagePreview) {
  //   $imagePreview = <div className="previewText">Please select an Image for Preview</div>;
  // }


  return (
    <>
      <div style={{ marginBottom: "70px" }}>
        <AdminTitle />
        <AdminCardList
          name={"desktop"}
          onChangePosition={onChangePosition}
          onDelete={onDelete}
          arr={temporal}
          size={"1135px × 375px"}
          addNewCard={addNewCard}
          styleName={"imgProduct"}
        />
      </div>
      <AdminButtons onClickMainButton={onClickMainButton} />
    </>
  );
};

export default AdminComponentsProductPhoto;
