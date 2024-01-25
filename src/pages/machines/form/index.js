import BasicModal from 'components/Modal'
import React, { useEffect, useState } from 'react'
import SoftInput from "components/SoftInput";
import Uploader from "components/ApnaUploader";
import SoftBox from 'components/SoftBox';
import SoftButton from 'components/SoftButton';
import { Card } from '@mui/material';
import toast from 'react-hot-toast';
import { number } from 'prop-types';

const index = ({ show, unShow, data, handleRefresh }) => {

    // const [values, setValues] = useState({
    //     mid: "",
    //     key: ""
    // });

    const [mno, setMno] = useState('');

    // useEffect(() => {
    //     // console.log(id, "ID");
    //     if (id != null) {
    //         setValues({
    //             mid: data?.id,
    //             key: data?.key
    //         })
    //         setMno()
    //         console.log(show, "DATA");
    //     }
    // }, [data])

    const id = localStorage.getItem('id');
    const token = localStorage.getItem('token');
    // console.log(token, "TOKEN");

    const handleCreateExpense = async () => {
        if (mno.length === 10) {

            try {
                // const { mid, key } = values;
                // console.log(mid, key, "uguh");
                const formData = new FormData();
                // typeof(values.photo)=='object'&& formData.append('photo', photo);
                formData.append('mno', mno);
                // formData.append('key', key);
                // formData.append('amount', amount);

                const res = await fetch(`${process.env.REACT_APP_API}/api/v1/machine`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": token
                    },
                    body: JSON.stringify({
                        "machineNo": `${mno}`
                    })
                });
                // console.log('mid', mid);
                // console.log('key', key);

                if (!res.ok) {
                    console.log("Error in res.ok");
                    // const responseBody = await res.text();
                    // console.error("Response body:", responseBody);
                }

                const result = await res.json();
                console.log(result, "4567");
                if (result.success) {
                    toast.success(result.message);
                    // console.log(result.message, "grgirjri");
                    unShow();
                    handleRefresh();
                } else {
                    toast.error(result.message);
                    // console.log(result.message, "grgirjri");
                }

                // console.log("Full Response Body: ", responseBody);
            } catch (error) {
                toast.error(error.message)
                console.log(error.message, ":Error in catch ");
            }
        } else {
            toast.error("Invalid machine no.");
        }
    }
    const onChange = (e) => {
        // const name = e.target.name;
        // if (e.target.files) {
        //     if (e.target.files?.length > 1) {
        //         setValues({ ...values, [name]: [...e.target.files] });
        //     } else {
        //         setValues({ ...values, [name]: e.target.files[0] });
        //     }
        // } else {
        //     const value = e.target.value;
        //     setValues({ ...values, [name]: value });
        // }
        setMno(e.target.value)
        console.log(e.target.value);
    };

    return (
        <div>

            <BasicModal show={show} unShow={unShow}>
                <SoftBox mt={2}>
                    <Card
                        sx={{
                            backdropFilter: `saturate(200%) blur(30px)`,
                            backgroundColor: ({ functions: { rgba }, palette: { white } }) => rgba(white.main, 0.8),
                            boxShadow: ({ boxShadows: { navbarBoxShadow } }) => navbarBoxShadow,
                            position: "relative",
                            mt: 2,
                            mx: 3,
                            py: 2,
                            px: 2,
                        }}
                    >
                        <SoftBox m={1}>
                            <SoftInput
                                type={number}
                                name="mid"
                                placeholder="Enter Machine No."
                                icon={{ component: "mno", direction: "left" }}
                                onChange={onChange}
                                value={mno}
                            />
                        </SoftBox>
                        {/* <SoftBox m={1}>
                            <SoftInput
                                name="key"
                                placeholder="Enter Key"
                                icon={{ component: "key", direction: "left" }}
                                onChange={onChange}
                                value={values.key}
                            />
                        </SoftBox> */}
                        {/* <SoftBox m={1}>
                            <SoftInput
                                name="amount"
                                type="number"
                                value={values.amount}
                                placeholder="Enter Amount"
                                icon={{ component: "paid", direction: "left" }}
                                onChange={onChange}
                            />
                        </SoftBox> */}
                        {/* <Uploader name="photo" multiple={false} images={values.photo} onChange={onChange} /> */}
                        <SoftButton
                            type="submit"
                            size="small"
                            color="black"
                            fullWidth
                            onClick={handleCreateExpense}
                        >
                            {data == null ? 'submit' : 'update'}
                        </SoftButton>
                    </Card>
                </SoftBox>
            </BasicModal>
        </div>
    )
}

export default index