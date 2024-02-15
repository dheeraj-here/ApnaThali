
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import SoftAvatar from "components/SoftAvatar";
import SoftBadge from "components/SoftBadge";
import machine from "assets/images/machine.png";
import Icon from "@mui/material/Icon";
import { Button } from "@mui/material";
import ConnectRestro from "../../machines/form"
import SoftButton from "components/SoftButton";
import { useState } from "react";

export function orderData({ data, edit }) {


    // console.log(data, "wserty7u8ioklp4567890");
    // const [con, setCon] = useState('connect')
    const tableData = {
        columns: [
            { name: "restaurent", align: "left" },
            { name: "payment", align: "left" },
            { name: "status", align: "left" },
            { name: "edit", align: "center" },

        ],
        rows: [],
    };
    data && data.length > 0 && data.map((elm, i) => {
        console.log(elm, "Orderdata");
        tableData.rows.push({
            restaurent: (<SoftBox display="flex" alignItems="center" px={1} py={0.5} key={i}>
                {/* <SoftBox mr={2}>
          <SoftAvatar src={elm?.photo ? `${process.env.REACT_APP_IMG}/${elm?.photo}` : machine} alt={elm?.title} size="sm" variant="rounded" />
        </SoftBox> */}
                <SoftBox display="flex">
                    <SoftTypography variant="button" fontWeight="medium">
                        {elm.restaurantId ? elm?.restaurantId.name : 'Null'}
                    </SoftTypography>
                    <SoftTypography variant="button" ml={1} fontWeight="medium">
                        ({elm.restaurantId ? elm?.restaurantId.id : 'Null'})
                    </SoftTypography>
                </SoftBox>
            </SoftBox>),
            payment: (<SoftBox display="flex" flexDirection="column">
                <SoftTypography fontWeight="medium" variant="caption" color="secondary">
                    {elm.paymentStatus}
                </SoftTypography>
            </SoftBox>),
            status: (<SoftBox display="flex" flexDirection="column">
                <SoftTypography fontWeight="medium" variant="caption" color="secondary">
                    {elm.status}
                </SoftTypography>
            </SoftBox>),
            edit: (
                <Icon fontSize="small" style={{ cursor: "pointer" }} color="inherit" onClick={() => edit(elm)}>
                    edit
                </Icon>
            ),
        })
        // console.log("lidhfe stops...");

    })
    return tableData
}

export default orderData;