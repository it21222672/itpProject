import React, { useState, useEffect } from 'react';
import {
    MDBIcon, MDBCardImage,
    MDBCard, MDBCardBody, MDBCardTitle, MDBCardText, MDBRow, MDBCol, MDBBtn, MDBTableBody, MDBTable, MDBTableHead, MDBInput
} from 'mdb-react-ui-kit';
import axios from 'axios';
import Swal from 'sweetalert2';
import { reactLocalStorage } from 'reactjs-localstorage';


function PaymentList() {

    const [paymentList, setPaymentList] = useState([]);
    const [searchName, SetsearchName] = useState([]);


    const getList = async () => {
        try {
            const res = await axios.get("http://localhost:5000" + "/payment/allpayment/" + searchName);
            setPaymentList(res.data);
        } catch (error) {
            console.log(error);
        }
    };

    const preedit = (code, stdNo, subject, classType, email, date) => {

        reactLocalStorage.setObject("Edit", [code, stdNo, subject, classType, email, date]);
        window.location.href = "/PaymentEdit";
    }

    function remove(code) {
        axios.delete("http://localhost:5000" + "/payment/deletepayment/" + code).then(() => {
            window.location.href = "/PaymentList";

        }).catch((err) => {
            Swal.fire({
                title: "Error!",
                text: "Payment Not Delete",
                icon: 'error',
                confirmButtonText: "OK",
                type: "success"
            })
        })
    }

    return (
        <div>
            {/* <Navbar /> */}
            <br />
            <br />
            <center>
                <h2 className='mt-5' id="#current" style={{ color: "#606060FF", paddingBottom: "1%" }}><>Payment List</></h2>
                <br />
                <div className='card' style={{ backgroundColor: "", boxShadow: "0 0 10px rgba(0, 0, 0, 0.5)", width: "95%" }}>
                    <div style={{ paddingLeft: "1050px", paddingBottom: "5px" }}>
                    </div>
                    <div className='row'>
                        <div className='col' style={{ paddingTop: "21px" }}>
                            <h6>Enter Your Student Number :</h6>
                        </div>
                        <div className='col' style={{ paddingLeft: "709px" }} >
                            <MDBInput className="mt-3 bg-white" id='form1' type='text' placeholder="" style={{ width: "300px", }} onChange={(e) => {
                                SetsearchName(e.target.value);
                            }} />
                        </div>

                        <div className='col' style={{ paddingTop: "15px" }}>
                            <button type="button" className="btn btn-success d-letter-spacing" onClick={getList}>Go</button>
                        </div>
                    </div>

                    <MDBTable className="mt-2" hover>
                        <MDBTableHead className="bg-dark">
                            <tr>
                                <th scope='col' ><h6 className="text-white" style={{ fontWeight: '300', letterSpacing: '2px', fontSize: '18px' }}>Code</h6></th>
                                <th scope='col' ><h6 className="text-white" style={{ fontWeight: '100', letterSpacing: '2px', fontSize: '18px' }}>Student Number</h6></th>
                                <th scope='col' ><h6 className="text-white" style={{ fontWeight: '100', letterSpacing: '2px', fontSize: '18px' }}>Subject</h6></th>
                                <th scope='col' ><h6 className="text-white" style={{ fontWeight: '100', letterSpacing: '2px', fontSize: '18px' }}>Class</h6></th>
                                <th scope='col' ><h6 className="text-white" style={{ fontWeight: '100', letterSpacing: '2px', fontSize: '18px' }}>Email</h6></th>
                                <th scope='col' ><h6 className="text-white" style={{ fontWeight: '100', letterSpacing: '2px', fontSize: '18px' }}>Date</h6></th>
                                <th scope='col' ><h6 className="text-white" style={{ fontWeight: '100', letterSpacing: '2px', fontSize: '18px' }}>Image</h6></th>
                                <th scope='col' ><h6 className="text-white" style={{ fontWeight: '100', letterSpacing: '2px', fontSize: '18px' }}>Price</h6></th>
                                <th scope='col' ><h6 className="text-white" style={{ fontWeight: '100', letterSpacing: '2px', fontSize: '18px' }}>Action</h6></th>
                            </tr>
                        </MDBTableHead>
                        <MDBTableBody>
                            {paymentList.map((paymentList, key) => (
                                <tr className="bg-light">
                                    <td style={{ fontSize: '17px' }}>{paymentList.code}</td>
                                    <td style={{ fontSize: '17px' }}>{paymentList.stdNo}</td>
                                    <td style={{ fontSize: '17px' }}>{paymentList.subject}</td>
                                    <td style={{ fontSize: '17px' }}>{paymentList.classType}</td>
                                    <td style={{ fontSize: '17px' }}>{paymentList.email}</td>
                                    <td style={{ fontSize: '17px' }}>{paymentList.date}</td>
                                    <td style={{ fontSize: '17px' }}><img src={"https://res.cloudinary.com/dnomnqmne/image/upload/v1630743483/" + paymentList.picture} style={{ width: "150px", }} /></td>
                                    <td style={{ fontSize: '17px' }}>{paymentList.realPrice} Rs/=</td>
                                    <td>
                                        <button size='lg' className="btn btn-dark" style={{ fontWeight: "bold", fontSize: "12px" }} onClick={() => preedit(paymentList.code, paymentList.stdNo, paymentList.subject, paymentList.classType, paymentList.email, paymentList.date)}>Edit</button>&nbsp;&nbsp;
                                        <button size='lg' className="btn btn-danger" style={{ fontWeight: "bold", fontSize: "12px", backgroundColor: "red" }} onClick={() => remove(paymentList.code)}>Delete</button>{''}
                                    </td>
                                </tr>
                            ))}
                        </MDBTableBody>
                    </MDBTable>
                </div >
            </center>
            <br />
            <br />
            <br />
            {/* <Footer /> */}
        </div >
    )
};

export default PaymentList;
