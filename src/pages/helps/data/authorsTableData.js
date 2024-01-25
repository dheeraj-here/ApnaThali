
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import SoftAvatar from "components/SoftAvatar";
import SoftBadge from "components/SoftBadge";
import team2 from "assets/images/team-2.jpg";
import Icon from "@mui/material/Icon";
import { Switch } from "@mui/material";
import HelpOutlineOutlinedIcon from '@mui/icons-material/HelpOutlineOutlined';

export function CustomerData({data,view}) {
const tableData = {
  columns: [
    { name: "author", align: "left" },
    { name: "function", align: "left" },
    { name: "status", align: "center" },
    { name: "comment", align: "center" },
    { name: "action", align: "center" },
  ],

  rows: [],
};

   data&&data.length>0&&data.map((elm,i)=>{
     tableData.rows.push( {
      author: (<SoftBox display="flex" alignItems="center" px={1} py={0.5} key={i}>
        <SoftBox mr={2}>
          <HelpOutlineOutlinedIcon fontSize="large" />
        </SoftBox>
        <SoftBox display="flex" flexDirection="column">
          <SoftTypography variant="button" fontWeight="medium">
            {elm?.name}
          </SoftTypography>
          <SoftTypography variant="caption" color="secondary">
            {elm?.phone}
          </SoftTypography>
        </SoftBox>
      </SoftBox>),
      function: (<SoftBox display="flex" flexDirection="column">
        <SoftTypography variant="caption" fontWeight="medium" color="text">
          {`phone : ${elm?.phone}`}
        </SoftTypography>
        <SoftTypography variant="caption" color="secondary">
        restaurant: {elm?.restaurantId?.id}
        </SoftTypography>
      </SoftBox>),
      status: (
        <SoftBadge variant="gradient" badgeContent={elm?.status} color={elm?.status=='pending'?"error":"success"} size="xs" container />
      ),
      comment: (
        <SoftTypography variant="caption" color="secondary" fontWeight="medium">
            {/* {elm?.comment} */}yu
        </SoftTypography>
      ),
      action: (<Switch/>
      ),
    })
   })
  return tableData
}

export default CustomerData;
