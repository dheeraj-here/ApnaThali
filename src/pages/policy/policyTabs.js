import * as React from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import { useState, useEffect } from "react";
import SoftBox from "components/SoftBox";
import SoftButton from "components/SoftButton";
import {
  convertToRaw,
  convertFromHTML,
  ContentState,
  EditorState,
} from "draft-js";
import draftToHtml from "draftjs-to-html";
import htmlToDraft from "html-to-draftjs";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import ViewPolicy from "./viewPolicy";

import Loading from "components/ApnaLoading";
import { stateFromHTML } from "draft-js-import-html";
import toast from "react-hot-toast";
function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export function BasicTabs(props) {
  const [value, setValue] = React.useState(0);
  const [data, setData] = useState([]);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const [loading, setLoading] = useState(false);
  const [refresh, setRefresh] = useState(0);
  const handelRefresh = () =>setRefresh(refresh +1);
  const [showPolicy, setShowPolicy] = useState(false);
  const [dummy, setDummy] = useState([])
  const [editorState, setEditorState] = useState([]);
  const [editorStateCode, setEditorStateCode] = useState([]);

  const onChangeEditor = (ev) => {
    const temp = [...editorState];
    temp.splice(value, 1, ev);
    setEditorState(temp);
    setEditorStateCode(draftToHtml(convertToRaw(ev.getCurrentContent())));
  };

  const token = localStorage.getItem("token");
  const id = localStorage.getItem("id");
  const [policies, setPolicies] = useState([]);

  useEffect(() => {
    setLoading(true)
    fetch(`${process.env.REACT_APP_API}/api/v1/company/getCompany`)
      .then((res) => res.json())
      .then((resp) => {
        console.log(resp,'fnmbvc')
        if (resp.success) {
          setDummy(resp.success);
          editorState.push(EditorState.createWithContent(
            ContentState.createFromBlockArray(
              convertFromHTML(resp?.data?.term_condition)
            )))
          editorState.push(EditorState.createWithContent(
            ContentState.createFromBlockArray(
              convertFromHTML(resp?.data?.privacy_policy)
            )))
          setPolicies(prev=>[...prev,resp?.data?.term_condition])
          setPolicies(prev=>[...prev,resp?.data?.privacy_policy])
          setLoading(false)
        }
      })
       .catch((err) => {
        console.log(err)
      });
  }, [refresh]);
 

  

  const submitPolicy = (ev) => {
    fetch(`${process.env.REACT_APP_API}/api/v1/update/company`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `${token}`,
      },
      body: JSON.stringify({ [ev]: editorStateCode }),
    })
      .then((res) => res.json())
      .then((resp) => {
        console.log(resp)
        if (resp.success) {
          toast.success(resp.message)
          handelRefresh()
          setEditorStateCode("");
 
        } 
      })
      .catch((err) => {
        console.log(err)
      });
  };


  return (
    <Box sx={{ width: "100%" }}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
        >
          <Tab label="term & Conditions" onClick={() => setValue(0)} />;
          <Tab label="Privacy policy" onClick={() => setValue(1)} />;
        </Tabs>
      </Box>
      {loading ? (
        <Loading />
      ) : (
              <TabPanel value={value} index={0}>
                <ViewPolicy
                  data={policies[0]}
                  show={showPolicy}
                  unShow={setShowPolicy}
                />
                <SoftButton
                  variant="gradient"
                  color="dark"
                  type="submit"
                  mb={3}
                  onClick={() => setShowPolicy(true)}
                >
                  View Term & Condition
                </SoftButton>
                <SoftBox mb={3}>
                  <Card>
                    <SoftBox
                      sx={{
                        "& .MuiTableRow-root:not(:last-child)": {
                          "& td": {
                            borderBottom: ({
                              borders: { borderWidth, borderColor },
                            }) => `${borderWidth[1]} solid ${borderColor}`,
                          },
                        },
                      }}
                    >
                      <Editor
                        editorState={editorState[0]}
                        toolbarclassNameName="toolbarclassNameName"
                        wrapperclassNameName="wrapperclassNameName"
                        editorclassNameName="editorclassNameName"
                        onEditorStateChange={onChangeEditor}
                      />
                      <SoftBox
                        style={{
                          display: "flex",
                          alignItems: "flex-end",
                          justifyContent: "end",
                        }}
                      >
                        <SoftButton
                          variant="gradient"
                          color="dark"
                          type="submit"
                          onClick={() => submitPolicy('term_condition')}
                        >
                          Submit
                        </SoftButton>
                      </SoftBox>
                    </SoftBox>
                  </Card>
                </SoftBox>
              </TabPanel>
      )}
      {loading ? (
        <Loading />
      ) : (
              <TabPanel value={value} index={1}>
                <ViewPolicy
                  data={policies[1]}
                  show={showPolicy}
                  unShow={setShowPolicy}
                />
                <SoftButton
                  variant="gradient"
                  color="dark"
                  type="submit"
                  mb={3}
                  onClick={() => setShowPolicy(true)}
                >
                  View Privacy Policy
                </SoftButton>
                <SoftBox mb={3}>
                  <Card>
                    <SoftBox
                      sx={{
                        "& .MuiTableRow-root:not(:last-child)": {
                          "& td": {
                            borderBottom: ({
                              borders: { borderWidth, borderColor },
                            }) => `${borderWidth[1]} solid ${borderColor}`,
                          },
                        },
                      }}
                    >
                      <Editor
                        editorState={editorState[1]}
                        toolbarclassNameName="toolbarclassNameName"
                        wrapperclassNameName="wrapperclassNameName"
                        editorclassNameName="editorclassNameName"
                        onEditorStateChange={onChangeEditor}
                      />
                      <SoftBox
                        style={{
                          display: "flex",
                          alignItems: "flex-end",
                          justifyContent: "end",
                        }}
                      >
                        <SoftButton
                          variant="gradient"
                          color="dark"
                          type="submit"
                          onClick={() => submitPolicy('privacy_policy')}
                        >
                          Submit
                        </SoftButton>
                      </SoftBox>
                    </SoftBox>
                  </Card>
                </SoftBox>
              </TabPanel>
      )}
    </Box>
  );
}

BasicTabs.propTypes = {
  data: PropTypes.array.isRequired,
  loading: PropTypes.bool.isRequired,
};
