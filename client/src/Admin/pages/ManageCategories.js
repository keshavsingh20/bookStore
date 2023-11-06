import React, { useState, useEffect } from 'react'
import '../styles/ManageCategories.css'
import AdminHeader from '../components/AdminHeader'
import AdminFooter from '../components/AdminFooter'
import exploreImg from '../../assets/images/category/Book_Category_497.jpg'
import { Link } from 'react-router-dom'
import app from "../firebase";
import { getStorage, ref, deleteObject } from "firebase/storage";


function ManageCategories() {
    const [categories, setCategories] = useState([])

    useEffect(() => {
        getCategories()
    }, [])

    const getCategories = async () => {
        let result = await fetch("/api/category/details");

        result = await result.json();
        setCategories(result);
    }

    const handleDeleteCategory = async (id, imageName) => {

        const storage = getStorage(app);

        // Create a reference to the file to delete
        const desertRef = ref(storage, `${imageName}`);

        // Delete the file
        deleteObject(desertRef).then(() => {
            // File deleted successfully
            console.log('file delted successfully...!')
            try {
                fetch(`/api/category/delete/${id}`, {
                    method: 'DELETE',
                    headers: {
                        // authorization: `bearer ${JSON.parse(localStorage.getItem('token'))}`
                    }
                }).then(async(result)=> {
                    result = await result.json()
                    if(result.acknowledged === true){
                        // window.location.reload(false);
                        getCategories()
                    }
                })
            } catch (err) {
                console.log(err)
            }
        }).catch((error) => {
            // Uh-oh, an error occurred!
            console.log(error)
        });
    }


    return (
        <>
            <AdminHeader />

            <div className='admin-home-container'>
                <div className="main-content">
                    <h1>Manage Category</h1>

                    <Link to="/admin/add/category" className='btn btn-success adm-btn'>Add New Category</Link>
                    <div className='table-container'>
                        <table className="table tbl-full table-striped">
                            <thead>
                                <tr className="tbl-heading">
                                    <th>S.N.</th>
                                    <th>Title</th>
                                    <th>Image</th>
                                    {/* <th>Featured</th>
                                    <th>Active</th> */}
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    categories.length > 0 ?
                                        categories.map((category, index) =>
                                            <tr key={index}>
                                                <td>{index + 1}</td>
                                                <td>{category.title}</td>
                                                <td><img src={category?.image} className='adm-img' alt="" /></td>
                                                <td>
                                                    <Link to={`/admin/update/category/${category._id}`} className="btn btn-primary adm-btn" >Update</Link>
                                                    <a href="#" className="btn btn-danger adm-btn" onClick={() => handleDeleteCategory(category._id, category.image)}>Delete</a>
                                                </td>
                                            </tr>
                                        )
                                        :
                                        <tr>
                                            <td colSpan={4}><h2>No Categories Found...!</h2></td>
                                        </tr>

                                }
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            <AdminFooter />

        </>
    )
}

export default ManageCategories
