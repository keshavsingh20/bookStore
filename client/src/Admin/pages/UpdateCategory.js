import React, { useState, useEffect } from 'react'
import { Link, useParams, useNavigate } from 'react-router-dom'
import AdminHeader from '../components/AdminHeader'
import AdminFooter from '../components/AdminFooter'
import app from "../firebase";
import {
    getStorage,
    ref,
    uploadBytesResumable,
    getDownloadURL,
    deleteObject,
} from "firebase/storage";



function UpdateCategory() {
    const [title, setTitle] = useState("");
    const [image, setImage] = useState("");
    const [img, setImg] = useState(null);
    const navigate = useNavigate()
    const params = useParams();

    useEffect(() => {
        getCategoryDetails();
    }, [])
    const getCategoryDetails = async () => {
        let category = await fetch(`/api/category/category/details/${params.id}`)
        category = await category.json();
        setTitle(category.title);
        setImage(category.image);
    }

    const handleImageChange = (event) => {
        const file = event.target.files[0];
        setImg(file)
    }

    const handleCategoryUpdate = (e) => {
        e.preventDefault();
        // first delete the previous image stored in the firebase
        if (img) {
            const storage = getStorage(app);
            // Create a reference to the file to delete
            const desertRef = ref(storage, `${image}`);
            deleteObject(desertRef).then(() => {
                // File deleted successfully
                console.log('file delted successfully...!')
                updateImageWithData();
            }).catch((error) => {
                console.log(error)
            });
        }
        else {
            updateData()
        }
    }

    const updateImageWithData = () => {
        const folderName = 'categories';
        const fileName = new Date().getTime() + img?.name;
        const storage = getStorage(app);
        const StorageRef = ref(storage, `${folderName}/${fileName}`);
        const uploadTask = uploadBytesResumable(StorageRef, img);

        uploadTask.on(
            "state_changed",
            (snapshot) => {
                const progress =
                    (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                console.log("Upload is " + progress + "% done");
                switch (snapshot.state) {
                    case "paused":
                        console.log("Upload is paused");
                        break;
                    case "running":
                        console.log("Upload is running");
                        break;
                }
            },
            (error) => {
                // Handle unsuccessful uploads
            },
            () => {
                // Handle successful uploads on complete
                // For instance, get the download URL: https://firebasestorage.googleapis.com/...
                getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
                    //console.log("Image File available at", downloadURL);
                    let categoryData = await fetch(`/api/category/update/${params.id}`, {
                        method: "PUT",
                        body: JSON.stringify({ title, image: downloadURL }),
                        headers: {
                            "Content-Type": "application/json",
                        }
                    })
                    categoryData = await categoryData.json()
                    if (categoryData) {
                        navigate('/admin/manage/categories')
                    }
                })
            }
        )
    }

    const updateData = async () => {
        let categoryData = await fetch(`/api/category/update/${params.id}`, {
            method: "PUT",
            body: JSON.stringify({ title }),
            headers: {
                "Content-Type": "application/json",
            }
        })
        categoryData = await categoryData.json()
        if (categoryData) {
            navigate('/admin/manage/categories')
        }
    }

    return (
        <>
            <AdminHeader />

            <div className='admin-home-container'>
                <div className="main-content">
                    <div className="wrapper">
                        <h1 style={{ textAlign: 'start' }}>Update Category</h1>
                        <br /><br />

                        <form className='add-category'>
                            <div>
                                <label htmlFor="title">Title: </label>
                                <input type="text" name="title" id="title" value={title} onChange={(e) => setTitle(e.target.value)} />
                            </div>
                            <div style={{ display: 'flex', flexDirection: 'column' }}>
                                <div><label htmlFor="selImg">Select Image: </label>
                                    <input type="file" name='selImg' id='selImg' onChange={handleImageChange} />
                                </div>
                                <img src={image} alt="" style={{ width: '200px' }} />
                            </div>
                            <button type='Submit' className='btn btn-primary' onClick={handleCategoryUpdate} >Update</button>
                        </form>
                    </div>
                </div>
            </div>

            <AdminFooter />
        </>
    )
}

export default UpdateCategory
