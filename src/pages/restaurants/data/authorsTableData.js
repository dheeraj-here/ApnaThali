
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import SoftAvatar from "components/SoftAvatar";
import SoftBadge from "components/SoftBadge";
import team4 from "assets/images/logos/restaurant.png";
import Icon from "@mui/material/Icon";
import avatar from "assets/images/cust-avatar.jpg"
import SoftButton from "components/SoftButton";
import Switch from '@mui/material/Switch';
import { useState } from "react";


export function CustomerData({ data, view, downloadQR, handleActive }) {

  const tableData = {
    columns: [
      { name: "id", align: "center" },
      { name: "author", align: "left" },
      { name: "function", align: "left" },
      { name: "status", align: "center" },
      { name: "action", align: "center" },
      { name: "download", align: "center" }
    ],

    rows: [],
  };

  const handleSwitchChange = (el, id, isChecked) => {
    const updatedData = data.map(elm => {
      if (elm._id === id) {
        // Update the isLive state of the corresponding element
        return { ...elm, isLive: !isChecked };
      }
      return elm;
    });

    // Pass the updated data to the parent component
    handleActive(el);
  };

  data && data.length > 0 && data.map((elm, i) => {
    console.log("This is restaurent : ", elm);
    tableData.rows.push({
      id: (
        <SoftTypography variant="caption" fontWeight="large" color="text">
          {elm?.id}
        </SoftTypography>
      ),
      author: (<SoftBox display="flex" alignItems="center" px={1} py={0.5} key={i}>
        <SoftBox mr={2}>
          <SoftAvatar src={elm?.logo ? `${process.env.REACT_APP_IMG}/${elm?.logo}` : avatar} alt={elm?.name} size="sm" variant="rounded" />
        </SoftBox>
        <SoftBox display="flex" flexDirection="column">
          <SoftTypography variant="button" fontWeight="medium">
            {elm?.name}
          </SoftTypography>
          {/* <SoftTypography variant="caption" color="secondary">
            {elm?.email}
          </SoftTypography> */}
        </SoftBox>
      </SoftBox>),
      function: (
        <SoftBox display="flex" flexDirection="column">
          <SoftTypography variant="caption" fontWeight="medium" color="text">
            {`phone : ${elm?.contact}`}
          </SoftTypography>
        </SoftBox>
      ),
      status: (
        <Switch checked={elm.isLive} onChange={(e) => handleSwitchChange(elm, elm._id, e.target.checked)} />
      ),
      action: (
        <Icon fontSize="small" color="inherit" style={{ cursor: 'pointer' }} onClick={() => view(elm._id)}>
          visibility
        </Icon>
      ),
      download: (
        <SoftButton
          size="small"
          color="black"
          onClick={() => downloadQR(elm._id)}
        >
          download qr
        </SoftButton>
      )
    })
  })
  return tableData
}

export default CustomerData;
