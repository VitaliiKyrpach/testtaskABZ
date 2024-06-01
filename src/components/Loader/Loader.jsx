import svg from "../../img/sprite.svg";

export const Loader = () => {
  return (
    <div className="loader">
      <svg className="svg">
        <use href={`${svg}#icon-loader`}></use>
      </svg>
    </div>
  );
};
