import s from "./AdminTitle.module.scss";

const AdminTitle = (props) => {
  return (
    <>
      <h2 className={s.title}>{props.title}</h2>
    </>
  );
};

export default AdminTitle;
