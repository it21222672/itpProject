import React, { useState, useEffect } from 'react';
import {
    MDBIcon, MDBCardImage,
    MDBCard, MDBCardBody, MDBCardTitle, MDBCardText, MDBRow, MDBCol, MDBBtn, MDBTableBody, MDBTable, MDBTableHead
} from 'mdb-react-ui-kit';
import axios from 'axios';
import jsPDF from "jspdf";
import 'jspdf-autotable';




function AdminPaymentReport() {

    const [paymentList, setPaymentList] = useState([]);
    const [totalC, setTotalC] = useState(0);
    const [edit, setEdit] = useState(true);

    const exportPDF = () => {
        const unit = "pt";
        const size = "A4"; // Use A1, A2, A3 or A4
        const orientation = "portrait"; // portrait or landscape

        const marginLeft = 40;
        const doc = new jsPDF(orientation, unit, size);

        doc.setFontSize(15);

        const title = "Report";
        const headers = [["Code", "Student Number", "Subject", "Class", "Email", "Date", "Price"]];

        const data = paymentList.map(paymentList => [paymentList.code, paymentList.stdNo, paymentList.subject, paymentList.classType, paymentList.email, paymentList.date, paymentList.realPrice + " Rs/="]);

        let content = {
            startY: 50,
            head: headers,
            body: data
        };

        doc.text(title, marginLeft, 40);
        doc.autoTable(content);
        doc.save("report.pdf")
    }

    const total = () => {
        let totalPrice = 0;
        for (let index = 0; index < paymentList.length; index++) {
            totalPrice += paymentList[index].realPrice;
        }
        setTotalC(totalPrice);
        setEdit(false)
    };


    const getList = async () => {
        try {
            const res = await axios.get("http://localhost:5000" + "/payment/allpayment/");
            console.log(res.data);
            setPaymentList(res.data);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getList()
    }, [])

    return (
        <div>
            {/* <Navbar /> */}
            <br />
            <br />
            <center>
                <h2 className='mt-5' id="#current" style={{ color: "#606060FF", paddingBottom: "1%" }}><>Admin Payment Report</></h2>
                <br />
                <div className='card' style={{ backgroundColor: "", boxShadow: "0 0 10px rgba(0, 0, 0, 0.5)", width: "95%" }}>
                    <div style={{ paddingLeft: "1167px", paddingBottom: "5px" }}>
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
                                </tr>
                            ))}
                        </MDBTableBody>
                    </MDBTable>
                    <br />
                    {edit ? (
                        <div></div>
                    ) : (
                        <div className='row'>
                            <div className='col' style={{ paddingLeft: "1174px" }}>
                                <h4>
                                    Total Price
                                </h4>
                            </div>
                            <div className='col' style={{ paddingRight: "22px", paddingTop: "3px" }}>
                                <h5>
                                    {totalC} Rs /=
                                </h5>
                            </div>
                        </div>
                    )}

                    <div className='row' style={{ textAlign: "center", width: "1457px", paddingLeft: "11px" }}>

                        <button size='lg' className="btn btn-danger" style={{ fontWeight: "bold", fontSize: "12px", backgroundColor: "red", }} onClick={() => total()}>Show Total Price</button>
                        <button type="button" className="btn btn-warning d-letter-spacing" style={{ fontWeight: "bold", fontSize: "12px" }} onClick={exportPDF}>Download Report</button>
                    </div>
                </div >
            </center>
            <br />
            <br />
            <br />
            {/* <Footer /> */}
        </div >
    )
};

export default AdminPaymentReport;
