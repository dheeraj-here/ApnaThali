import React, { useEffect, useState } from "react";
import "./ImagePicker.css";
import PropTypes from "prop-types";
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
const ImagePicker = ({
  images,
  video,
  name,
  multiple,
  type,
  onChange,
  main,
}) => {
  const [imageURLs, setImageURLs] = useState([]);
  const [videoUrl, setVideoUrl] = useState("");
  console.log(images)
  useEffect(() => {
    if (multiple && images.length > 0) {
      const newImageURls = [];
      images.forEach((image) => newImageURls.push(URL.createObjectURL(image)));
      setImageURLs(newImageURls);
    }
    else if (typeof images === "object" && !multiple) {
      const newImageURls = [];
      newImageURls.push(URL.createObjectURL(images));
      setImageURLs(newImageURls);
    } else if (!images || !images?.length) {
      setImageURLs([])
    }
    else if (typeof(images)!='object'&& images!='' &&images!=[]) {
      
      const newImageURls = [];
      newImageURls.push(images);
      setImageURLs(newImageURls);
    }
  }, [images]);

  useEffect(() => {
    if (typeof video === "object") {
      setVideoUrl(URL.createObjectURL(video));
    }
  }, [video]);

  return (
    <SoftBox p={1}>
      <SoftTypography variant="caption" color="secondary" fontWeight="medium">
        {type}
      </SoftTypography>
      <input
        type="file"
        name={name}
        className="custom-file-input"
        multiple={multiple ? multiple : false}
        accept={main == "video" ? "video/*" : "image/*"}
        onChange={onChange}
      />
      {imageURLs &&
        imageURLs.length > 0 &&
        imageURLs.map((imageSrc, i) => {
          return (
            <>
              <img className="Image" key={i} src={imageSrc} />
            </>
          );
        })}
      {videoUrl != "" && (
        <video width={200} height={100} controls>
          <source src={videoUrl} />
        </video>
      )}
    </SoftBox>
  );
};

export default ImagePicker;

ImagePicker.propTypes = {
  images: PropTypes.array.isRequired,
  name: PropTypes.string,
  video: PropTypes.string,
  classNameName: PropTypes.string,
  multiple: PropTypes.string,
  type: PropTypes.string,
  onChange: PropTypes.string,
  main: PropTypes.string,
};
