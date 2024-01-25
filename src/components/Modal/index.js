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
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: width ? width : 400,
    height: height,
    overflowY: overflowY ? "scroll" : "auto",
    bgcolor: "#f3f3f3",
    border: "0px solid #000",
    boxShadow: 24,
    borderRadius: 8,
    p: 4,
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
            component="div"
            sx={{
              display: "flex",
              justifyContent: "flex-end",
              position: "sticky",
              zIndex: 777777,
              position: "absolute",
              top: "4px",
              right: "7px",
              width: width ? width : 400,
              backgroundcolor: "#fff",
            }}
            size="large"
          >
            <CancelPresentationIcon />
          </IconButton>
          {children}
        </SoftBox>
      </Modal>
    </div>
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
