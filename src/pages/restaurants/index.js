
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
import customerData from './data/authorsTableData';
import Loading from "components/ApnaLoading";
import ViewCustomer from "./view";
import ArrowBackIosNewOutlinedIcon from '@mui/icons-material/ArrowBackIosNewOutlined';
import ArrowForwardIosOutlinedIcon from '@mui/icons-material/ArrowForwardIosOutlined';
import SoftButton from "components/SoftButton";
import { UseSelector } from "react-redux/es/hooks/useSelector";
import { useSelector } from "react-redux/es/hooks/useSelector";
import CreateShop from "./form/index";
import { Pagination } from "@mui/material";
import Stack from '@mui/material/Stack';

function Tables() {

  const [data, setData] = useState([]);
  const [counts, setCounts] = useState([]);
  const { columns, rows } = data;
  const [loading, setLoading] = useState(false);
  const id = localStorage.getItem('id');
  const token = localStorage.getItem('token');
  const [showCustomer, setshowCustomer] = useState(false);
  const [customerId, setCustomerId] = useState('');
  const [c, setC] = useState(0)
  const [totalPage, setTotalPages] = useState(1);
  const search = useSelector((state) => state.searchSlice.search);
  const [showForm, setShowForm] = useState(false);
  const [shopId, setShopId] = useState(null);
  const [refresh, setRefresh] = useState(0);
  const [reviews, setReviews] = useState([]);
  const [currentPage, setCurrentPage] = useState(0)


  const handleRefresh = () => setRefresh(refresh + 1);

  const handlePageChange = (page) => {
    setCurrentPage(page);
    getRestro(page, search);
  };

  const handleShowForm = (e) => {
    // console.log("ID", e);
    setShowForm(!showForm)
    setShopId(e)
  };


  const handleActive = async (elm) => {
    console.log("Live status changed ", elm.isLive);

    let currentStatus = elm.isLive;
    const formData = new FormData();
    formData.append('isLive', String(!currentStatus));
    try {
      const res = await fetch(`${process.env.REACT_APP_API}/api/v1/update/shop/${elm._id}`, {
        method: "PUT",
        headers: {
          Accept: "application/json",
          Authorization: token
        },
        body: formData,
        redirect: 'follow'
      });
      if (!res.ok) console.log("Error in res!", res);
      const result = await res.json();

      if (result.success) {
        toast.success(result.message);
        handleRefresh();
      } else {
        toast.error("Can't update isLive!")
      }
    } catch (error) {
      toast.error("IsLive did not updated!");
      console.log(error);
    }
  }


  const handleViewCustomer = async (e) => {
    setC(c + 1)
    setshowCustomer(!showCustomer)
    try {
      const res = await fetch(`${process.env.REACT_APP_API}/api/v1/get/shop/${e}`, {
        method: "GET",
        redirect: "follow",
        headers: {
          Authorization: token
        }
      });
      if (!res.ok) {
        throw new Error(`HTTP error! Status: ${res.status}`)
      }
      const result = await res.json();
      if (result.success) {
        setCustomerId(result.data);

        console.log(result.data, 'got res data');
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message)
    }

    try {
      console.log("Reviews try is running...");
      const res = await fetch(`${process.env.REACT_APP_API}/api/v1/get/all/review/${e}`, {
        method: "GET",
        redirect: "follow",
        headers: {
          Authorization: token
        }
      });
      if (!res.ok) {
        throw new Error(`HTTP error! Status: ${res.status}`)
      }
      const result = await res.json();
      // console.log(result, "eryhg");

      if (result.success) {
        console.log(result, 'Review Data');
        setReviews(result.data.reviews)
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message)
    } finally {
      setLoading(false);
    }
  }



  const downloadQR = async (e) => {
    console.log("Download", e);
    try {
      setLoading(true);
      const res = await fetch(`${process.env.REACT_APP_APE}/api/v1/get/Restaurant/qrCode/${e}`, {
        method: "GET",
        redirect: "follow",
        headers: {
          Authorization: token
        }
      });
      if (!res.ok) {
        throw new Error(`HTTP error! Status: ${res.status}`)
      }
      const result = await res.json();

      if (result.success) {
        console.log(result, "THis is result");
        const url = `${process.env.REACT_APP_APE}/${result?.data.pdf}`;
        window.open(url, "_blank");
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message)
    }
  }

  const getRestro = (ev, se) => {
    try {
      setLoading(true);
      fetch(`${process.env.REACT_APP_API}/api/v1/get/admin/Restaurant/${id}?search=${se}&page=${ev}`, {
        method: "GET",
        headers: {
          Authorization: token
        }
      }).then((res) => res.json())
        .then((result) => {
          if (result.success) {
            setTotalPages(result.totalPages)
            setData(customerData({
              data: result?.data,
              view: handleViewCustomer,
              downloadQR: downloadQR,
              handleActive: handleActive,
            }));
            setCounts(result.counts);
            setLoading(false)
          }
        })

    } catch (error) {
      toast.error(error.message)
    }
  }

  useEffect(() => {
    if (location.pathname == '/restaurants') {
      getRestro(currentPage, search);
    }
  }, [refresh, search])


  return (
    <DashboardLayout>
      <DashboardNavbar />
      <CreateShop show={showForm} unShow={setShowForm} data={shopId} handleRefresh={handleRefresh} />
      <ViewCustomer show={showCustomer} unShow={setshowCustomer} data={customerId} reviews={reviews} />
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
            {
              rows && <Stack spacing={5} m={5} sx={{ display: "flex", alignItems: 'center', justifyContent: "center" }}>
                <Pagination onChange={(event, page) => handlePageChange(page)}
                  count={totalPage} variant="outlined" shape="rounded" />
              </Stack>
            }
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