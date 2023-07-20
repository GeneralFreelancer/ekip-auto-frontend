import { useState, useEffect, useRef } from "react";
import AdminTitle from "./AdminCardList/AdminTitle";
import AdminCardList from "./AdminCardList";
import AdminButtons from "./AdminButtons";
import axios from "axios";
import { useSelector } from "react-redux";
import { selectedUser } from "../../redux/features/userSlice";
import { useParams, useNavigate } from "react-router-dom";
import { setOneProduct } from "../../redux/features/productsSlice";
import { useDispatch } from "react-redux";

const baseUrl = process.env.REACT_APP_BASE_URL;

// const images = [
//   "https://www.mukachevo.net/Content/Uploads/IIIRomeoIII/61b0a55a500d3.jpg",
//   "https://i1.poltava.to/uploads/2022/10/23/tv.jpg",
//   "https://i.allo.ua/media/catalog/product/cache/3/image/468x468/602f0fa2c1f0d1ba5e241f914e856ff9/a/2/a2-32-front.jpg",
//   "https://images.prom.ua/697887103_skupka-nespravnih-televizorivzhk.jpg",
//   "https://images.unsplash.com/photo-1509721434272-b79147e0e708?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1500&q=80",
// ];

const AdminComponentsProductPhoto = () => {
  const [images, setImages] = useState([]);
  const user = useSelector(selectedUser);
  const { id } = useParams();
  const fileInputRef = useRef(null);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const getOneProduct = async () => {
    try {
      const response = await axios.get(`${baseUrl}/product/${id}`, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      setImages(response.data.product.pictures);
    } catch (error) {
      console.error("Error:", error.message);
    }
  };

  useEffect(() => {
    getOneProduct();
  }, []);

  const onDelete = async (index, filename) => {
    let formattedArray = filename.split("/");
    let formattedFileName = formattedArray[formattedArray.length - 1];
    let updatedArray = [];
    updatedArray = images.slice(0, index).concat(images.slice(index + 1));
    setImages(updatedArray);
    try {
      const response = await axios.delete(`${baseUrl}/product/image`, {
        data: { productId: id, image: formattedFileName },
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      setImages(response.data.product.pictures);
      dispatch(setOneProduct(response.data.product));
    } catch (error) {
      console.error(error);
    }
  };

  const onChangePosition = (direction, index) => {
    let updatedArray = [];
    updatedArray = [...images];
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
    setImages(updatedArray);
    // dispatch(setOneProduct(updatedArray));
  };

  const onClickMainButton = (name) => {
    if (name === "cancel") {
      navigate(-1);
    } else if (name === "save") {
      let formattedArray = images.map((image) => image.split("/").pop());
      const savePhotoArray = async () => {
        try {
          const response = await axios.put(
            `${baseUrl}/product`,
            { id, pictures: formattedArray },
            {
              headers: {
                Authorization: `Bearer ${user.token}`,
              },
            }
          );
          setImages(response.data.product.pictures);
          dispatch(setOneProduct(response.data.product));
        } catch (error) {
          console.error(error);
        }
      };
      savePhotoArray();
      navigate(-1);
      getOneProduct();
    }
  };

  const addNewCard = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (e) => {
    let reader = new FileReader();
    const file = e.target.files[0];
    reader.onload = () => {
      sendImageToBD(id, file, file.name);
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
      console.log(response.data);
      setImages(response.data.product.pictures);
      dispatch(setOneProduct(response.data.product));
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <div style={{ marginBottom: "70px" }}>
        <AdminTitle title={"Редагування фото продукта"} />
        <AdminCardList
          name={"desktop"}
          onChangePosition={onChangePosition}
          onDelete={onDelete}
          arr={images}
          size={"1135px × 375px"}
          addNewCard={addNewCard}
          styleName={"imgProduct"}
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

export default AdminComponentsProductPhoto;
