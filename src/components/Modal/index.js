import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import PropTypes from "prop-types";
import CancelPresentationIcon from "@mui/icons-material/CancelPresentation";
import { IconButton } from "@mui/material";
import SoftBox from "components/SoftBox";

export default function BasicModal({
  children,
  show,
  unShow,
  width,
  height,
  overflowY,
  NoBackDropClose,
}) {
  const style = {
    position: "relative",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "90%",
    maxWidth: 800,
    height: height,
    overflowY: overflowY ? "scroll" : "auto",
    bgcolor: "#f3f3f3",
    border: "0px solid #000",
    boxShadow: 24,
    borderRadius: 8,
    p: 4,
  };

  const upperStyle = {
    // top: "50%",
    // left: "50%",
    // transform: "translate(-50%, -50%)",
    // width: "90%",
    // maxWidth: 800,
    // height: height,
  }

  const iconStyle = {
    justifyContent: "flex-end",
    position: "fixed",
    zIndex: 777777,
    top: "4px",
    right: "7px",
    width: width ? width : 400,
  };
  
  return (
    <div>
      <Modal
        open={show}
        // onClose={() => (!NoBackDropClose ? unShow(false) : null)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        {/* <SoftBox sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          height: height,

          backgroundColor: "black",
        }}>
        </SoftBox> */}

        <SoftBox sx={style}>
          <IconButton
            onClick={() => unShow(false)}
            color="error"
            sx={iconStyle}
            component="div"
            size="large"
          >
            <CancelPresentationIcon />
          </IconButton>

          <SoftBox>
            {children}
          </SoftBox>
        </SoftBox>
      </Modal>
    </div >
  );
}
BasicModal.propTypes = {
  children: PropTypes.string.isRequired,
  show: PropTypes.string.isRequired,
  unShow: PropTypes.string.isRequired,
  width: PropTypes.string.isRequired,
  height: PropTypes.string.isRequired,
  overflowY: PropTypes.string.isRequired,
  NoBackDropClose: PropTypes.bool,
};
