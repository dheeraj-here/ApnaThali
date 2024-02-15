
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
import Loading from "components/ApnaLoading";
import BasicModal from "components/Modal";
import { Switch } from "@mui/material";
import SoftButton from "components/SoftButton";
// import ViewCustomer from "./";


const index = ({ show, unShow, handleFresh, data, machineNo }) => {

  // const [data, setData] = useState([]);
  const [counts, setCounts] = useState([]);
  // const { columns, rows } = data;
  const [loading, setLoading] = useState(false);
  const id = localStorage.getItem('id');
  const token = localStorage.getItem('token');
  const [showCustomer, setshowCustomer] = useState(false);
  const [customerId, setCustomerId] = useState('');
  const [options, setOptions] = useState([]);
  const [selectedValue, setSelectedValue] = useState('');
  const [phone, setPhone] = useState('')
  const [resId, setResId] = useState('');
  const [connected, setConnected] = useState(false)

  useEffect(() => {
    // console.log(data, "sdfghjk");
    // data.map((op) => {
    //   console.log(op.id);
    // })
  }, []);
  // console.log(machineData, 'sderfgthyujikolp');

  const h = () => {
    console.log("Hello");
  }

  const handleDropdownChange = (event) => {
    const val = event.target.value;
    const selectedOption = data.find(elm => elm.id === val)
    setSelectedValue(event.target.value); //for showing purpose
    setResId(selectedOption._id);
  };

  const handleSwitch = async (e) => {
    console.log(e,machineNo, "connect runs..");
    unShow();
    
    try {
      // console.log("Switch changes", machineData, resId);
      const res = await fetch(`${process.env.REACT_APP_API}/api/v1/connect/machine`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": token
        },
        body: JSON.stringify({
          "phone": `${machineNo}`,
          "restaurantId": `${resId}`,
          "connect": true
        })
      });

      if (!res.ok) {
        console.log("Error in res.ok");
      }

      const result = await res.json();
      if (result.success) {
        toast.success(result.message);
        console.log("Machine connected successfully!", machineNo, resId);
        handleFresh();
      } else {
        toast.error(result.message);
      }
    } catch (error) {
      toast.error(error.message)
      console.log(error.message, ":Error in catch ");
    }
  }


  return (
    <BasicModal show={show} unShow={unShow} width={600} top="70%">
      {/* <ViewCustomer show={showCustomer} unShow={setshowCustomer} id={customerId}/> */}
      <SoftBox mt={3} >
        <Card >
          <SoftBox p='10px 20px'>
            Select an Restaurent
          </SoftBox>
          <SoftBox px="20px">
            <select
              id="dynamicDropdown"
              value={selectedValue}
              onChange={handleDropdownChange}
              style={{
                padding: '8px',
                fontSize: '16px',
                width: '200px',
                borderRadius: '4px',
                border: '1px solid #ccc',
              }}
            >
              <option value="" disabled onClick={h}>
                Select an option
              </option>
              {data.map((option) => (
                <option key={option._id} value={option.id}>
                  {option.id}
                </option>
              ))}
            </select>
          </SoftBox>

          <SoftBox p='10px 20px' >
            {selectedValue &&
              <SoftButton
                size="small"
                color="black"
                onClick={() => handleSwitch(selectedValue)}
              >
                {connected ? "Disconnect" : "Connect"}
              </SoftButton>
            }
          </SoftBox>

        </Card>
      </SoftBox>
    </BasicModal>
  );
}

export default index;
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