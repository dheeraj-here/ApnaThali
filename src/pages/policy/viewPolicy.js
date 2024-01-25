import React from "react";
import PropTypes from "prop-types";
import BasicModal from "components/Modal";

const ViewPolicy = ({ data, show, unShow }) => {
  return (
    <BasicModal
      show={show}
      unShow={unShow}
      width={700}
      height="100vh"
      overflowY="scroll"
    >
      <div dangerouslySetInnerHTML={{ __html: data }}></div>
    </BasicModal>
  );
};

export default ViewPolicy;
ViewPolicy.propTypes = {
  data: PropTypes.array.isRequired,
  show: PropTypes.bool.isRequired,
  unShow: PropTypes.bool.isRequired,
};
