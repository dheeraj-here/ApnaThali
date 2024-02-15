import BasicModal from 'components/Modal'
import React, { useEffect, useState } from 'react'
import SoftInput from "components/SoftInput";
import Uploader from "components/ApnaUploader";
import SoftBox from 'components/SoftBox';
import SoftButton from 'components/SoftButton';
import { Card } from '@mui/material';
import toast from 'react-hot-toast';

const index = ({ show, unShow, handleRefresh, data }) => {

    const [values, setValues] = useState({
        link: "",
        image: "",
    });

    useEffect(() => {
        if (data != null) {
            setValues({
                link: data.link,
                image: '',
            })
            console.log(data, '123');
        }
    }, [data])

    const id = localStorage.getItem('id');
    const token = localStorage.getItem('token');

    const handleCreateBanner = () => {
        try {
            const { link, image } = values;
            console.log(values, "1234");

            const formData = new FormData();
            typeof (values.image) == 'object' && formData.append('image', image);
            formData.append('link', link);

            fetch(data == null ? `${process.env.REACT_APP_API}/api/v1/banner` : `${process.env.REACT_APP_API}/api/v1/banner/${id}`, {
                method: data == null ? "POST" : "PUT",
                headers: {
                    Accept: "application/json",
                    Authorization: token
                },
                body: formData,
                redirect: 'follow'
            }).then((res) => res.json())
                .then((result) => {
                    console.log(result, "this is result");
                    if (result.success) {
                        toast.success(result.message);
                        console.log(formData, 'formdata');
                        unShow();
                        handleRefresh()
                    } else {
                        toast.error(result.message)
                    }
                })
        } catch (error) {
            toast.error(error.message)
        }
    }
    const onChange = (e) => {
        const name = e.target.name;
        if (e.target.files) {
            if (e.target.files?.length > 1) {
                setValues({ ...values, [name]: [...e.target.files] });
            } else {
                setValues({ ...values, [name]: e.target.files[0] });
            }
        } else {
            const value = e.target.value;
            setValues({ ...values, [name]: value });
        }
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
                            px: 2
                        }}
                    >
                        <SoftBox m={1}>
                            <SoftInput
                                name="link"
                                placeholder="Enter Link"
                                icon={{ component: "link", direction: "left" }}
                                onChange={onChange}
                                value={values.link}
                            />
                        </SoftBox>
                        <Uploader name="image" multiple={false} images={values.image} onChange={onChange} />

                        <SoftButton
                            type="submit"
                            size="small"
                            color="black"
                            fullWidth
                            onClick={handleCreateBanner}
                        >
                            {data == null ? 'submit' : 'update'}
                        </SoftButton>
                    </Card>
                </SoftBox>
            </BasicModal >
        </div >
    )
}

export default index