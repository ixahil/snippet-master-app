import Image from "next/image";
import React, { useState } from "react";

const ProfileUpload = (props) => {
  const [image, setImage] = useState(null);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result);
        props.setProfile(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="m-auto">
      <input
        type="file"
        accept="image/*"
        name="profile"
        onChange={handleImageChange}
        style={{ display: "none" }}
        id="file-input"
      />
      <label
        htmlFor="file-input"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: "150px",
          height: "150px",
          borderRadius: "50%",
          backgroundColor: "#ddd",
          overflow: "hidden",
          cursor: "pointer",
        }}
      >
        {image ? (
          <div className="w-[150px] h-[150px] rounded-full cursor-pointer relative border-2 overflow-hidden border-gray-500">
            <Image src={image} objectFit="cover" fill={true} />
          </div>
        ) : (
          <span style={{ fontSize: "24px", color: "#888" }}>+</span>
        )}
      </label>
    </div>
  );
};

export default ProfileUpload;
