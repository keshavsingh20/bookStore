import React, { useState } from 'react'
import '../styles/AddCategory.css'
import AdminHeader from '../components/AdminHeader'
import AdminFooter from '../components/AdminFooter'
import { useNavigate } from 'react-router-dom'
import app from "../firebase";
import {
    getStorage,
    ref,
    uploadBytesResumable,
    getDownloadURL,
} from "firebase/storage";

function AddCategory() {
    const [title, setTitle] = useState("");
    const [img, setImg] = useState(null);
    const navigate = useNavigate()

    const handleImageChange = (event)=> {
        const file = event.target.files[0];
        setImg(file)
    }

    const handleAddCategory = (e) => {
        e.preventDefault();
        // Check if an image is selected

        if (img) {
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
                        // console.log("Image File available at", downloadURL);
                        let bookData = await fetch("/api/category/add", {
                            method: "POST",
                            body: JSON.stringify({ title, image:downloadURL }),
                            headers: {
                                "Content-Type": "application/json",
                            }
                        })
                        bookData = await bookData.json()
                        if (bookData) {
                            navigate('/admin/manage/categories')
                        }
                    })
                }
            );
        }
    }

    return (
        <>
            <AdminHeader />

            <div className='admin-home-container'>
                <div class="main-content">
                    <div class="wrapper">
                        <h1 style={{textAlign:'start'}}>Add Category</h1>
                        <br /><br />

                        <form className='add-category'>
                            <div>
                                <label for="title">Title: </label>
                                <input type="text" name="title" id="title" onChange={(e)=>setTitle(e.target.value)} />
                            </div>
                            <div>
                                <label for="selImg">Select Image: </label>
                                <input type="file" name='selImg' id='selImg' onChange={handleImageChange} />
                            </div>
                            <button type='Submit' className='btn btn-primary' onClick={handleAddCategory}>Confirm And Add</button>
                        </form>
                    </div>
                </div>
            </div>

            <AdminFooter />
        </>
    )
}

export default AddCategory
