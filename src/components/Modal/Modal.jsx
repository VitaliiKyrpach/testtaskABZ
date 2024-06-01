import ReactDOM from "react-dom";
import svg from "../../img/sprite.svg";

export const Modal = () => {
  console.log("modal");
  return ReactDOM.createPortal(
    <div className="modal">
      <h2 className="title">User successfully registered</h2>
      <svg className="svg">
        <use href={`${svg}#icon-success-image`}></use>
      </svg>
    </div>,
    document.getElementById("modal")
  );
};
