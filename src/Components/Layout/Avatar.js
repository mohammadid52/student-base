import React from "react";

function Avatar({ url, width = "100px", height = "100px" }) {
  return (
    <div style={{ width, height, margin: "auto" }}>
      <img src={url} alt="User Img" className="card-img-top rounded-circle" />
    </div>
  );
}

export default Avatar;
