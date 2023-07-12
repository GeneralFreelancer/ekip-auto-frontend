import { Slide } from "react-slideshow-image";
import "react-slideshow-image/dist/styles.css";
import "./Slider.scss";
import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { ReactComponent as Setting } from "../../../assets/svg/setting.svg";

const images = [
  // get /advertising
  // {image: 'link', url: 'website url'}
  "https://images.unsplash.com/photo-1509721434272-b79147e0e708?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1500&q=80",
  "https://images.unsplash.com/photo-1506710507565-203b9f24669b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1536&q=80",
  "https://images.unsplash.com/photo-1536987333706-fc9adfb10d91?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1500&q=80",
];


//  на галочку внизу запит на бек put /advertising 
// три масива картинком тільки назва

const indicators = (index) => <div className="indicator">{index + 1}</div>;

const properties = {
  duration: 5000,
  transitionDuration: 500,
  infinite: true,
  indicators: true,
  arrows: true,
};

const Slider = () => {
  const [viewportWidth, setViewportWidth] = useState(window.innerWidth);
  const [role, setRole] = useState(false);

  const localStor = localStorage.getItem("role");

  useEffect(() => {
    if (localStorage.getItem("role") === "admin") {
      setRole(true);
    }
  }, [localStor]);

  useEffect(() => {
    function handleResize() {
      setViewportWidth(window.innerWidth);
    }
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="wrapperSlider">
      {role && (
        <NavLink to="/admin_slider">
          <button className='slider_setting'>
            <Setting />
          </button>
        </NavLink>
      )}
      {viewportWidth < 825 ? (
        <Slide indicators={indicators} scale={1.4} {...properties}>
          {images.map((each, index) => (
            <div key={index} style={{ width: "100%" }}>
              <img
                style={{ objectFit: "cover", width: "100%", height: "375px" }}
                alt="Slide img"
                src={each}
              />
            </div>
          ))}
        </Slide>
      ) : (
        <Slide indicators={indicators} scale={1.4} {...properties}>
          {images.map((each, index) => (
            <div key={index} style={{ width: "100%" }}>
              <img
                style={{ objectFit: "cover", width: "100%", height: "375px" }}
                alt="Slide img"
                src={each}
              />
            </div>
          ))}
        </Slide>
      )}
    </div>
  );
};

export default Slider;
