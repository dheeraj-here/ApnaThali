
import { useState } from "react";
import Card from "@mui/material/Card";
import Icon from "@mui/material/Icon";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import logoXD from "assets/images/small-logos/logo-xd.svg";
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import Table from "examples/Tables/Table";
import { useEffect } from "react";
import SoftProgress from "components/SoftProgress";
import Restro from 'assets/images/logos/restaurant.png'
function Projects({data}) {
 
  const [columns, setcolumns] = useState([{ name: "companies", align: "left" },
  { name: "detail", align: "center" },
  { name: "user", align: "center" },
   ])
  const [rows, setRows] = useState([]);

  useEffect(() => {
    data&&data.length>0&&data.map((elm, index)=>{
      console.log(elm, "we got elm in db", index);
       setRows(prev=>[...prev,{
        companies: [elm?.logo?`${process.env.REACT_APP_IMG}/${elm?.logo}`:Restro, elm?.name],
        detail: (
          <SoftTypography variant="caption" color="text" fontWeight="medium">
           {elm?.contact}<br/>
           {elm?.email}
          </SoftTypography>
        ),
        user: (
          <SoftTypography variant="caption" color="text" fontWeight="medium">
          {elm?.userId?.fullName}
         </SoftTypography>
        ),
      }])
    })
  }, [data]);
  
  
  const [menu, setMenu] = useState(null);

  const openMenu = ({ currentTarget }) => setMenu(currentTarget);
  const closeMenu = () => setMenu(null);

  const renderMenu = (
    <Menu
      id="simple-menu"
      anchorEl={menu}
      anchorOrigin={{
        vertical: "top",
        horizontal: "left",
      }}
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={Boolean(menu)}
      onClose={closeMenu}
    >
      <MenuItem onClick={closeMenu}>Action</MenuItem>
      <MenuItem onClick={closeMenu}>Another action</MenuItem>
      <MenuItem onClick={closeMenu}>Something else</MenuItem>
    </Menu>
  );

  return (
    <Card>
      <SoftBox display="flex" justifyContent="space-between" alignItems="center" p={3}>
        <SoftBox>
          <SoftTypography variant="h6" gutterBottom>
            Recent restaurants
          </SoftTypography>
          {/* <SoftBox display="flex" alignItems="center" lineHeight={0}>
            <Icon
              sx={{
                fontWeight: "bold",
                color: ({ palette: { info } }) => info.main,
                mt: -0.5,
              }}
            >
              done
            </Icon>
            <SoftTypography variant="button" fontWeight="regular" color="text">
              &nbsp;<strong>30 done</strong> this month
            </SoftTypography>
          </SoftBox> */}
        </SoftBox>
        <SoftBox color="text" px={2}>
          <Icon sx={{ cursor: "pointer", fontWeight: "bold" }} fontSize="small" onClick={openMenu}>
            more_vert
          </Icon>
        </SoftBox>
        {renderMenu}
      </SoftBox>
      <SoftBox
        sx={{
          "& .MuiTableRow-root:not(:last-child)": {
            "& td": {
              borderBottom: ({ borders: { borderWidth, borderColor } }) =>
                `${borderWidth[1]} solid ${borderColor}`,
            },
          },
        }}
      >
        <Table columns={columns} rows={rows} />
      </SoftBox>
    </Card>
  );
}

export default Projects;
