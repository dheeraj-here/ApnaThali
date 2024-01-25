
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import SoftAvatar from "components/SoftAvatar";
import SoftBadge from "components/SoftBadge";
import team2 from "assets/images/team-2.jpg";
import Icon from "@mui/material/Icon";

export function CustomerData({data,view,edit,deleto}) {
const tableData = {
  columns: [
    { name: "expense", align: "left" },
    { name: "description", align: "left" },
    { name: "action", align: "center" },
    { name: "edit", align: "center" },
    { name: "delete", align: "center" },
  ],

  rows: [],
};

   data&&data.length>0&&data.map((elm,i)=>{
     tableData.rows.push( {
      expense: (<SoftBox display="flex" alignItems="center" px={1} py={0.5} key={i}>
        <SoftBox mr={2}>
          <SoftAvatar src={elm?.photo?`${process.env.REACT_APP_IMG}/${elm?.photo}`:team2} alt={elm?.title} size="sm" variant="rounded" />
        </SoftBox>
        <SoftBox display="flex" flexDirection="column">
          <SoftTypography variant="button" fontWeight="medium">
            {elm?.amount}
          </SoftTypography>
          <SoftTypography variant="caption" color="secondary">
            {elm?.title}
          </SoftTypography>
        </SoftBox>
      </SoftBox>),
      description: (<SoftBox display="flex" flexDirection="column">
        <SoftTypography variant="caption" color="secondary">
        Description: {elm?.description}
        </SoftTypography>
      </SoftBox>),
      action: (
        <Icon fontSize="small" style={{cursor:"pointer"}} color="inherit" onClick={()=>view(elm)}>
        visibility
      </Icon>
      ),
      edit: (
        <Icon fontSize="small" style={{cursor:"pointer"}} color="inherit" onClick={()=>edit(elm)}>
        edit
      </Icon>
      ),
      delete: (
        <Icon fontSize="small" style={{cursor:"pointer"}} color="inherit" onClick={()=>deleto(elm?._id)}>
        delete
      </Icon>
      ),
    })
   })
  return tableData
}

export default CustomerData;
