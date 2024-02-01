import Table from "examples/Tables/Table";
import Card from "@mui/material/Card";
import { useState, useEffect } from "react";
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import { BasicTabs } from "./policyTabs";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

function Tables() {

const navigate = useNavigate();

  const token = localStorage.getItem("token");
  const id = localStorage.getItem("id");
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [refresh, setRefresh] = useState(0);
  const handelRefresh = () =>setRefresh(refresh +1)
  const [policies, setPolicies] = useState([]);

  useEffect(() => {
    setLoading(true)
    fetch(`${process.env.REACT_APP_API}/api/v1/company/getCompany`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((resp) => {
        console.log(resp,'fsg')
        if (resp.success) {
          setPolicies(prev=>[...prev,resp?.data?.privacy_policy])
          setPolicies(prev=>[...prev,resp?.data?.term_condition])
          setPolicies(prev=>[...prev,resp?.data?.return_policy])
          setLoading(false)
        }
      })
       .catch((err) => {
       return toast.success(err.message);
       })
  }, [refresh]);

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <SoftBox py={3}>
        <SoftBox mb={3}>
          <Card>
            <SoftBox
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              p={3}
            >
              <SoftTypography variant="h6">
                Update Your Policies
              </SoftTypography>
            </SoftBox>

            <BasicTabs />
          </Card>
        </SoftBox>
      </SoftBox>
      {/* <Footer /> */}
    </DashboardLayout>
  );
}

export default Tables;
