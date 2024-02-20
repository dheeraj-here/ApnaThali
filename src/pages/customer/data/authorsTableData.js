
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import SoftAvatar from "components/SoftAvatar";
import SoftBadge from "components/SoftBadge";
import team2 from "assets/images/team-2.jpg";
import Icon from "@mui/material/Icon";
import avatar from "assets/images/cust-avatar.jpg"

export function CustomerData({data,view}) {
const tableData = {
  columns: [
    { name: "author", align: "left" },
    { name: "function", align: "left" },
    { name: "status", align: "center" },
  ],

  rows: [],
};

   data&&data.length>0&&data.map((elm,i)=>{
    console.log(elm,"cghj");
     tableData.rows.push( {
      author: (<SoftBox display="flex" alignItems="center" px={1} py={0.5} key={i}>
        <SoftBox mr={2}>
          <SoftAvatar src={elm?.photo?`${process.env.REACT_APP_IMG}/${elm?.photo}`:avatar} alt={elm?.name} size="sm" variant="rounded" />
        </SoftBox>
        <SoftBox display="flex" flexDirection="column">
          <SoftTypography variant="button" fontWeight="medium">
            {elm?.fullName}
          </SoftTypography>
          <SoftTypography variant="caption" color="secondary">
            {elm?.email}
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
        <SoftBadge variant="gradient" badgeContent="online" color="success" size="xs" container />
      ),
      // shallow: (
      //   <SoftTypography variant="caption" color="secondary" fontWeight="medium">
      //       {elm?.shallowMember}
      //   </SoftTypography>
      // ),
      // action: (
      //   <Icon fontSize="small" color="inherit" onClick={()=>view(elm?._id)}>
      //   visibility
      // </Icon>
      // ),
    })
   })
  return tableData
}

export default CustomerData;
