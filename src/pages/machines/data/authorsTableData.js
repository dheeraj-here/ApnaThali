
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import SoftAvatar from "components/SoftAvatar";
import SoftBadge from "components/SoftBadge";
import team2 from "assets/images/team-2.jpg";
import Icon from "@mui/material/Icon";
import { Button } from "@mui/material";
import ConnectRestro from "../../machines/form"
import SoftButton from "components/SoftButton";
import { useState } from "react";

export function CustomerData({ data, connect, disconnect, deleto }) {


  // console.log(data, "wserty7u8ioklp4567890");
  // const [con, setCon] = useState('connect')
  const tableData = {
    columns: [
      { name: "machine", align: "left" },
      { name: "connection", align: "left" },
      { name: "connect", align: "center" },
      { name: "delete", align: "center" },
    ],

    rows: [],
  };
  data && data.length > 0 && data.map((elm, i) => {
    // console.log(elm, "DATA here");
    tableData.rows.push({
      machine: (<SoftBox display="flex" alignItems="center" px={1} py={0.5} key={i}>
        <SoftBox mr={2}>
          <SoftAvatar src={elm?.photo ? `${process.env.REACT_APP_IMG}/${elm?.photo}` : team2} alt={elm?.title} size="sm" variant="rounded" />
        </SoftBox>
        <SoftBox display="flex" flexDirection="column">
          <SoftTypography variant="button" fontWeight="medium">
            {elm?.machineNo}
          </SoftTypography>
          {/* <SoftTypography variant="caption" color="secondary">
            {elm?._id}
          </SoftTypography> */}
        </SoftBox>
      </SoftBox>),
      description: (<SoftBox display="flex" flexDirection="column">
        <SoftTypography variant="caption" color="secondary">
          Machine No: {elm?.machineNo}
        </SoftTypography>
      </SoftBox>),
      action: (
        <Icon fontSize="small" style={{ cursor: "pointer" }} color="inherit" onClick={() => view(elm)}>
          visibility
        </Icon>
      ),
      connection: (
        <SoftBox>
          {elm.connect ?
            (
              <SoftBox>
                {elm.restaurantId.id}
              </SoftBox>
            ) : (
              <SoftBox>
              </SoftBox>
            )
          }
        </SoftBox>
      ),
      connect: (
        <SoftBox >
          {elm.connect ?
            (
              <SoftButton
                size="small"
                color="black"
                onClick={() => disconnect(elm)}
              >
                disconnect
              </SoftButton>
            ) : (
              <SoftButton
                size="small"
                color="black"
                onClick={() => connect(elm, elm.connect)}
              >
                connect
              </SoftButton>
            )
          }
        </SoftBox>
      ),
      delete: (
        <Icon fontSize="small" style={{ cursor: "pointer" }} color="inherit" onClick={() => deleto(elm?._id)}>
          delete
        </Icon>
      ),

    })
    // console.log("lidhfe stops...");

  })
  return tableData
}

export default CustomerData;