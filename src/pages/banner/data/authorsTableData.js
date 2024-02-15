
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import SoftAvatar from "components/SoftAvatar";
import SoftBadge from "components/SoftBadge";
import expense from "assets/images/expense.png";
import Icon from "@mui/material/Icon";

export function CustomerData({ data, view, edit, deleto }) {
  const tableData = {
    columns: [
      { name: "banner", align: "left" },
      // { name: "description", align: "left" },
      { name: "view", align: 'center' },
      { name: "edit", align: 'center' },
      { name: "delete", align: "center" },
    ],
    rows: [],
  };

  data && data.length > 0 && data.map((elm, i) => {
    console.log(elm, "expense");
    tableData.rows.push({
      banner: (<SoftBox display="flex" alignItems="center" px={1} py={0.5} key={i}>
        <SoftBox width={100} >
          <img src={elm?.image ? `${process.env.REACT_APP_IMG}/${elm?.image}` : expense} alt={elm?.title}
            style={{ width: '80%' }}
            variant="rounded" />
        </SoftBox>
      </SoftBox>),
      view: (
        <Icon fontSize="small" style={{ cursor: "pointer" }} color="inherit" onClick={() => view(elm)}>
          visibility
        </Icon>
      ),
      edit: (
        <Icon fontSize="small" style={{ cursor: "pointer" }} color="inherit" onClick={() => edit(elm)}>
          edit
        </Icon>
      ),
      delete: (
        <Icon fontSize="small" style={{ cursor: "pointer" }} color="inherit" onClick={() => deleto(elm?._id)}>
          delete
        </Icon>
      ),
    })
  })
  return tableData
}

export default CustomerData;
