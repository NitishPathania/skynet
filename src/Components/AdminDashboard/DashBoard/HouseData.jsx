import React, { useEffect, useState } from 'react'
import SideBar from '../SideBar/SideBar'
import axios from 'axios'
import { api } from '../../Api/Api'
const HouseData = () => {
    const [houseDetails, setHouseDetails] = useState([])
    const getHouseDetails = () => {
        try {
            axios.get(`${api}getHouseDetails`).then((res) => {
                // console.log(res)
                setHouseDetails(res.data.userData)




            })
        } catch (error) {
            console.log("Internal Server Error")
        }
    }
    useEffect(() => {
        getHouseDetails()
    })

    return (

        <div className="main_admin">

            <SideBar />
            <div className="admin_content">
                <div className='table_div tabel_div_two'>
                    <div className='top_heading_div'>
                        <h2 className='non_verify_user'>Type of Entries</h2>

                    </div>
                    <table className='tabel_div_two'>
                        <thead>
                            <tr>
                                <th>HouseNo.</th>
                                <th>Owner</th>
                                <th>Edit</th>
                                <th>Delete</th>
                            </tr>
                        </thead>
                        <tbody>
                            {houseDetails.length === 0 ? (
                                <tr>
                                    <td colSpan="6" className='not_user_yet'><h2>Not User Yet</h2></td>
                                </tr>
                            ) : (
                                houseDetails.map((item) => (
                                    <tr key={item._id}>
                                        <td className='entryName'>{item.
                                            houseNo
                                        }</td>
                                        <td className='entryName'>{item.
                                            ownerNameEnglish

                                        }/{item.ownerNameHindi
                                            }</td>



                                        <td className='delBtn'><button >Edit</button></td>
                                        <td className='delBtn'><button >Delete</button></td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>



                </div>




            </div>
        </div>

    )
}

export default HouseData
