
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import SoftAvatar from "components/SoftAvatar";
import SoftBadge from "components/SoftBadge";
import expense from "assets/images/expense.png";
import Icon from "@mui/material/Icon";

export function CustomerData({data,view,edit,deleto}) {
const tableData = {
  columns: [
    { name: "shop", align: "left" },
    { name: "name", align: "left" },
    { name: "action", align: "center" },
    { name: "edit", align: "center" },
    { name: "delete", align: "center" },
  ],
  rows: [],
};

   data&&data.length>0&&data.map((elm,i)=>{
    console.log(elm, "expense");
     tableData.rows.push( {
      shop: (<SoftBox display="flex" alignItems="center" px={1} py={0.5} key={i}>
        <SoftBox mr={2}>
          <SoftAvatar src={elm?.logo?`${process.env.REACT_APP_IMG}/${elm?.logo}`: expense} alt={elm?.title} size="sm" variant="rounded" />
        </SoftBox>
        <SoftBox display="flex" flexDirection="column">
          <SoftTypography variant="button" fontWeight="medium">
            {elm?.amount}
          </SoftTypography>
          <SoftTypography variant="caption" color="secondary">
            {elm?.name}
          </SoftTypography>
        </SoftBox>
      </SoftBox>),
      name: (<SoftBox display="flex" flexDirection="column">
        <SoftTypography variant="caption" color="secondary">
       {elm?.description}
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
