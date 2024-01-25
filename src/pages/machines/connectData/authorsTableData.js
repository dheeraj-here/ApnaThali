import React from 'react';
import SoftBox from 'components/SoftBox';
import SoftAvatar from 'components/SoftAvatar';
import team2 from 'assets/images/team-2.jpg';
import SoftTypography from 'components/SoftTypography';
import Icon from 'assets/theme/components/icon';
import Button from 'assets/theme/components/button';
import ConnectRestro from '../view'
import Avatar from 'assets/images/cust-avatar.jpg';
import SoftButton from 'components/SoftButton';
// import { Switch } from '@mui/material';
import { Switch } from '@mui/material';

const RestroData = ({ data, handleSwitch }) => {
  console.log(data, "On RESTRO conenct");
  const tableData = {
    columns: [
      { name: "machine", align: "left" },
      { name: "name", align: "left" },
      { name: "connect", align: "center" },
    ],

    rows: [],
  };
  data && data.length > 0 && data.map((elm, i) => {
    console.log(elm, "DATA here for connectREstro");
    tableData.rows.push({
      machine: (<SoftBox display="flex" alignItems="center" px={1} py={0.5} key={i}>

        <SoftBox display="flex" flexDirection="column">
          <SoftTypography variant="button" fontWeight="medium">
            {elm?.machineNo}
          </SoftTypography>

        </SoftBox>
      </SoftBox>),
      
      connect: (
        <SoftBox >
          <SoftTypography variant="h5" fontWeight="medium">
            Connect
          </SoftTypography>
          <Switch onChange={() => handleSwitch(elm)} />
        </SoftBox>


      ),
    })
  })
  return tableData

}

export default RestroData;
