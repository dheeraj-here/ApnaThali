
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import SoftAvatar from "components/SoftAvatar";
import SoftBadge from "components/SoftBadge";
import team4 from "assets/images/logos/restaurant.png";
import Icon from "@mui/material/Icon";
import avatar from "assets/images/cust-avatar.jpg"
export function CustomerData({ data, view }) {

  const tableData = {
    columns: [
      { name: "id", align: "center" },
      { name: "author", align: "left" },
      { name: "function", align: "left" },
      { name: "status", align: "center" },
      { name: "time", align: "center" },
      { name: "action", align: "center" },
    ],

    rows: [],
  };

  data && data.length > 0 && data.map((elm, i) => {
    // console.log("This is LOGO", elm);
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
          <SoftTypography variant="caption" color="secondary">
            {elm?.email}
          </SoftTypography>
        </SoftBox>
      </SoftBox>),
      function: (
        <SoftBox display="flex" flexDirection="column">
          <SoftTypography variant="caption" fontWeight="medium" color="text">
            {`phone : ${elm?.contact}`}
          </SoftTypography>
          <SoftTypography variant="caption" color="secondary">
            {/* restaurant: {elm?.upiId} */}
            restaurent: dfghjk
          </SoftTypography>
        </SoftBox>
      ),
      status: (
        <SoftBadge variant="gradient" badgeContent={elm?.status} color={elm?.status == 'Active' ? "success" : "error"} size="xs" container />
      ),
      time: (
        <SoftBox display="flex" flexDirection="column">
          <SoftTypography variant="caption" fontWeight="medium" color="text">
            Open: {elm?.openTime}
          </SoftTypography>
          <SoftTypography variant="caption" color="secondary">
            Close: {elm?.closeTime}
          </SoftTypography>
        </SoftBox>

      ),
      action: (
        <Icon fontSize="small" color="inherit" onClick={() => view(elm?._id)}>
          visibility
        </Icon>
      ),
    })
  })
  return tableData
}

export default CustomerData;
