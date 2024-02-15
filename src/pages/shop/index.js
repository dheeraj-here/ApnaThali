
import Card from "@mui/material/Card";
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import Table from "examples/Tables/Table";
import Grid from "@mui/material/Grid";
import MiniStatisticsCard from "examples/Cards/StatisticsCards/MiniStatisticsCard";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import shopData from './data/authorsTableData';
import Loading from "components/ApnaLoading";
import ViewCustomer from "./view"
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import SoftButton from "components/SoftButton";
// import CreateShop from "../restaurants/form";

function Tables() {

  const [data, setData] = useState([]);
  const { columns, rows } = data;
  const [loading, setLoading] = useState(false)
  const id = localStorage.getItem('id');
  const token = localStorage.getItem('token');
  const [showCustomer, setshowCustomer] = useState(false);
  const [customerId, setCustomerId] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [shopId, setShopId] = useState(null);
  const [refresh, setRefresh] = useState(0);

  const handleRefresh = () => setRefresh(refresh + 1);

  const handleShowForm = (e) => {
    console.log("ID", e);
    setShowForm(!showForm)
    setShopId(e)
  };

  const handleViewCustomer = (e) => {
    console.log(e, "View clicked");
    setshowCustomer(!showCustomer)
    setShopId(e)
  };
  const deleteShop = (ev) => {
    try {

      fetch(`${process.env.REACT_APP_API}/api/v1/delete/shop/${ev}?index=0`, {
        method: "DELETE",
        headers: {
          Authorization: token
        }
      }).then((res) => res.json())
        .then((result) => {
          if (result.success) {
            toast.success(result.message);
            handleRefresh()
          } else {
            toast.error(result.message)
          }
        })
    } catch (error) {
      toast.error(error.message)
    }
  }

  const getShop = () => {
    try {
      setLoading(true);
      fetch(`${process.env.REACT_APP_API}/api/v1/get/all/shop`, {
        method: "GET",
        headers: {
          Authorization: token
        },
        redirect: 'follow'
      }).then((res) => res.json())
        .then((result) => {
          if (result.success) {
            console.log(result, "Shop data");
            setLoading(false);
            setData(shopData({
              data: result?.data,
              view: handleViewCustomer,
              edit: handleShowForm,
              deleto: deleteShop
            }))
          }
          // console.log(columns, rows, "collroww");
        })
    } catch (error) {
      toast.error(error.message)
    }
  }
  useEffect(() => {
    getShop()
  }, [refresh]);


  return (
    <DashboardLayout>
      <DashboardNavbar />
      {/* <CreateShop show={showForm} unShow={setShowForm} data={shopId} handleRefresh={handleRefresh} /> */}
      <ViewCustomer show={showCustomer} unShow={setshowCustomer} data={shopId} />
      <SoftBox py={3}>
        <SoftBox mb={3}>
          <Card>
            <SoftButton
              size="small"
              color="black"
              sx={{ width: '100px', borderRadius: '5px', mx: '10px', padding: '10px 80px' }}
              onClick={() => handleShowForm(null)}
            >
              Create Shop
            </SoftButton>
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
              {loading ? <Loading /> : <Table columns={columns} rows={rows} />}
            </SoftBox>
          </Card>
        </SoftBox>
      </SoftBox>
      {/* <Footer /> */}
    </DashboardLayout>
  );
}

export default Tables;
{/* <SoftBox display="flex" justifyContent="space-between" alignItems="center" p={3}>
  <SoftTypography variant="h6">Authors table</SoftTypography>
</SoftBox> */}

{/* <Card>
  <SoftBox display="flex" justifyContent="space-between" alignItems="center" p={3}>
    <SoftTypography variant="h6">Projects table</SoftTypography>
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
    <Table columns={prCols} rows={prRows} />
  </SoftBox>
</Card> */}