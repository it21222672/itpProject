import React, { useState, useEffect } from 'react';
import { TextField } from '@mui/material';
import axios from 'axios';
import Swal from 'sweetalert2';
import { reactLocalStorage } from 'reactjs-localstorage';

function PaymentEdit() {

    var Edit = reactLocalStorage.getObject('Edit');
    console.log(Edit);

    const [code, setCode] = useState(Edit[0])
    const [stdNo, setStdNo] = useState(Edit[1])
    const [subject, setSubject] = useState(Edit[2])
    const [classType, setClassType] = useState(Edit[3])
    const [email, setEmail] = useState(Edit[4])
    const [date, setDate] = useState(Edit[5])
    const [imageSelected, setimageSelected] = useState("");
    const [submit, setSubmit] = useState(true);


    const validateEmail = (email) => {
        // Regular expression for email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const edit = async (e) => {
        e.preventDefault();
        var price = 0

        if (subject === "Biology") {
            price = 3000
        }
        else if (subject === "Mathematics") {
            price = 2500
        }
        else if (subject === "Technology") {
            price = 2000
        }

        var realPrice = 0

        if (classType === "Theory") {
            realPrice = price + 0
        }
        else if (classType === "Revision") {
            realPrice = price + 1000
        }

        const formData = new FormData();
        formData.append("file", imageSelected);
        formData.append("upload_preset", "ml_default");

        const responses = await axios.post(
            "https://api.cloudinary.com/v1_1/dnomnqmne/image/upload",
            formData
        );
        const picture = imageSelected.name;

        const payment = { code, stdNo, subject, classType, email, date, picture, realPrice };
        try {
            const response = await axios.put("http://localhost:5000" + "/payment/updatepayment", payment);
            console.log(response.data);
            Swal.fire({
                title: "Success!",
                text: "Payment Edited",
                icon: 'success',
                confirmButtonText: "OK",
                type: "success"
            })
            setTimeout(() => {
                window.location.href = "/PaymentList";
            }, 1000);


        } catch (error) {
            console.log(error.message);
            Swal.fire({
                title: "Error!",
                text: "Payment Not Edited",
                icon: 'error',
                confirmButtonText: "OK",
                type: "success"
            })
            setTimeout(() => {
                window.location.href = "/PaymentList";
            }, 1000);
        }
    };

    const valid = () => {
        if ((stdNo !== "") && (subject !== "") && (classType !== "") && (email !== "") && (date !== "") && (imageSelected !== "")) {
            setSubmit(false)
        } else {
            setSubmit(true)
        }
    }

    useEffect(() => {
        valid()
    }, [stdNo, subject, classType, email, date, imageSelected])

    return (
        <div>
            {/* <Navbar /> */}
            <br />
            <br />
            <center>
                <div className='card' style={{ backgroundColor: "", boxShadow: "0 0 10px rgba(0, 0, 0, 0.5)", width: "60%" }}>

                    <h3 style={{ marginTop: '40px' }}>Edit Payment</h3>

                    <div class="row container-fluid" style={{ marginTop: '7%', marginBottom: '7%' }}>
                        <form>

                            <div class="row mb-4">
                                <div className="col">
                                    <TextField className="form-control" id="outlined-basic" label="Student No" variant="outlined" style={{ width: "700px", }} placeholder='Q01' onChange={(e) => {
                                        setStdNo(e.target.value);
                                    }} value={stdNo} />
                                </div>
                            </div>
                            <div className="row mb-4">
                                <div className="col">
                                    <label style={{ paddingLeft: "46px" }}>Subject Stream : </label>
                                </div>
                                <div className="col">
                                    <div style={{ paddingRight: "488px" }} >
                                        <select id="packages" style={{ backgroundColor: "#343a40", color: "#fff" }} onChange={(e) => {
                                            setSubject(e.target.value);
                                        }} value={subject}  >
                                            <option value=""> Subjects</option>
                                            <option value="Biology">Biology</option>
                                            <option value="Mathematics">Mathematics</option>
                                            <option value="Technology">Technology</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                            <div className="row mb-4">
                                <div className="col">
                                    <label style={{ paddingLeft: "11px" }}>Class Type : </label>
                                </div>
                                <div className="col">
                                    <div style={{ paddingRight: "519px" }} >
                                        <select id="packages" style={{ backgroundColor: "#343a40", color: "#fff" }} onChange={(e) => {
                                            setClassType(e.target.value);
                                        }} value={classType}  >
                                            <option value=""> Type</option>
                                            <option value="Theory">Theory</option>
                                            <option value="Revision">Revision</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                            <div class="row mb-4">
                                <div className="col">
                                    <TextField
                                        className="form-control"
                                        id="outlined-basic"
                                        label="Email"
                                        variant="outlined"
                                        style={{ width: "700px" }}
                                        onChange={(e) => {
                                            setEmail(e.target.value);
                                        }}
                                        value={email}
                                        error={!validateEmail(email)}
                                        helperText={!validateEmail(email) ? 'Please enter a valid email address' : ''}
                                    />
                                </div>
                            </div>
                            <div class="row mb-4">
                                <div className="col">
                                    <TextField
                                        className="form-control"
                                        id="outlined-basic"
                                        label="Date"
                                        variant="outlined"
                                        style={{ width: "700px" }}
                                        type="date"
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                        onChange={(e) => {
                                            setDate(e.target.value);
                                        }}
                                        value={date}
                                    />

                                </div>
                            </div>
                            <div class="row mb-4">
                                <div className='col'>
                                    <input type="file" onChange={(e) => {
                                        setimageSelected(e.target.files[0]);
                                    }} class="form-control" id="customFile" style={{ width: "700px", height: "45px", }} />
                                </div>
                            </div>
                            <br />
                            <button type="submit" class="btn btn-dark btn-block mb-5" style={{ width: "500px" }} disabled={submit} onClick={edit}>Edit</button>
                        </form>
                    </div>
                </div>
            </center >
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            {/* <Footer /> */}
        </div >
    )
};

export default PaymentEdit
