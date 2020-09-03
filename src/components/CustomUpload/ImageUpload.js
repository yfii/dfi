import React from "react";
// used for making the prop types of this component
import PropTypes from "prop-types";

// core components
import Button from "components/CustomButtons/Button.js";

import defaultImage from "assets/img/image_placeholder.jpg";
import defaultAvatar from "assets/img/placeholder.jpg";

export default function ImageUpload(props) {
  const [file, setFile] = React.useState(null);
  const [imagePreviewUrl, setImagePreviewUrl] = React.useState(
    props.avatar ? defaultAvatar : defaultImage
  );
  let fileInput = React.createRef();
  const handleImageChange = e => {
    e.preventDefault();
    let reader = new FileReader();
    let file = e.target.files[0];
    reader.onloadend = () => {
      setFile(file);
      setImagePreviewUrl(reader.result);
      if(props.onChange) {
        props.onChange(file);
      }
    };
    reader.readAsDataURL(file);
  };
  // eslint-disable-next-line
  const handleSubmit = e => {
    e.preventDefault();
    // file is the file/image uploaded
    // in this function you can save the image (file) on form submit
    // you have to call it yourself
  };
  const handleClick = () => {
    fileInput.current.click();
  };
  const handleRemove = () => {
    setFile(null);
    setImagePreviewUrl(props.avatar ? defaultAvatar : defaultImage);
    fileInput.current.value = null;
  };
  let { avatar, addButtonProps, changeButtonProps, removeButtonProps } = props;
  return (
    <div className="fileinput text-center">
      <input type="file" onChange={handleImageChange} ref={fileInput} />
      <div className={"thumbnail" + (avatar ? " img-circle" : "")}>
        <img src={imagePreviewUrl} alt="..." />
      </div>
      <div>
        {file === null ? (
          <Button {...addButtonProps} onClick={() => handleClick()}>
            {avatar ? "Add Photo" : "Select image"}
          </Button>
        ) : (
          <span>
            <Button {...changeButtonProps} onClick={() => handleClick()}>
              Change
            </Button>
            {avatar ? <br /> : null}
            <Button {...removeButtonProps} onClick={() => handleRemove()}>
              <i className="fas fa-times" /> Remove
            </Button>
          </span>
        )}
      </div>
    </div>
  );
}

ImageUpload.propTypes = {
  avatar: PropTypes.bool,
  addButtonProps: PropTypes.object,
  changeButtonProps: PropTypes.object,
  removeButtonProps: PropTypes.object,
  // it is a function from which you can get the files and fileNames that were uploaded
  // more can be read here: https://github.com/creativetimofficial/ct-material-kit-pro-react/issues/64
  onChange: PropTypes.func
};
