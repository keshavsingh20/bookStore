import React, { useState } from 'react'
import AdminHeader from '../components/AdminHeader'
import AdminFooter from '../components/AdminFooter'
import { useNavigate } from 'react-router-dom';
import app from "../firebase";
import {
    getStorage,
    ref,
    uploadBytesResumable,
    getDownloadURL,
} from "firebase/storage";

function AddBook() {
    const [title, setTitle] = useState("");
    const [price, setPrice] = useState("");
    const [author, setAuthor] = useState("");
    const [category, setCategory] = useState("");
    // const [image, setImage] = useState("")
    const [img, setImg] = useState(null); // stroe the selected image
    const [active, setActive] = useState("Yes")
    const navigate = useNavigate();

    const handleRadioChange = (event) => {
        setActive(event.target.value);
    };

    const handleImageChange = (event) => {
        const file = event.target.files[0];
        setImg(file);
    }

    const handleAddBook = (e) => {
        e.preventDefault();
        // Check if an image is selected

        if (img) {
            const folderName = 'books';
            const fileName = new Date().getTime() + img?.name;
            const storage = getStorage(app);
            const StorageRef = ref(storage, `${folderName}/${fileName}`);
            const uploadTask = uploadBytesResumable(StorageRef, img);

            uploadTask.on(
                "state_changed",
                (snapshot) => {
                    // Observe state change events such as progress, pause, and resume
                    // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
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
                        let bookData = await fetch("/api/book/add", {
                            method: "POST",
                            body: JSON.stringify({ title, price, category, active, author, image:downloadURL }),
                            headers: {
                                "Content-Type": "application/json",
                            }
                        })
                        bookData = await bookData.json()
                        if (bookData) {
                            navigate('/admin/manage/books')
                        }
                    })
                }
            );
        }

        // Add the book details to your database here
        // You can use Firebase Firestore or any other database you are using

    };




    return (
        <>
            <AdminHeader />

            <div className='admin-home-container'>
                <div className="main-content">
                    <div className="wrapper">
                        <h1 style={{ textAlign: 'start' }}>Add Book</h1>
                        <br /><br />

                        <form className='add-category'>
                            <div>
                                <label htmlFor="title">Title: </label>
                                <input type="text" name="title" id="title" onChange={(e) => setTitle(e.target.value)} />
                            </div>
                            <div>
                                <label htmlFor="price">Price: </label>
                                <input type="text" name="price" id="price" onChange={(e) => setPrice(e.target.value)} />
                            </div>
                            <div>
                                <label htmlFor="author">Author: </label>
                                <input type="text" name="author" id="author" onChange={(e) => setAuthor(e.target.value)} />
                            </div>
                            <div>
                                <label htmlFor="category">Category: </label>
                                <select name="category" id="category" onChange={(e) => setCategory(e.target.value)}>
                                    <option value="" selected disabled hidden>Select Category</option>
                                    <option value="Computer Science Engineering">Computer Science Engineering</option>
                                    <option value="Civil Engineering">Civil Engineering</option>
                                    <option value="Mechanical Engineering">Mechanical Engineering</option>
                                    <option value="Electrical Engineering">Electrical Engineering</option>
                                    <option value="Electronics And Communication Engineering">Electronics And Communication Engineering</option>
                                    <option value="Information Technology">Information Technology</option>
                                </select>
                            </div>
                            <div>
                                <label htmlFor="active">Active: </label>
                                <input type="radio" name="active" value="Yes" onChange={handleRadioChange} checked={active === 'Yes'} />&nbsp;&nbsp;Yes&nbsp;&nbsp;
                                <input type="radio" name="active" value="No" onChange={handleRadioChange} checked={active === 'No'} />&nbsp;&nbsp;No
                            </div>
                            <div>
                                <label htmlFor="selImg">Select Image: </label>
                                <input type="file" name='selImg' id='selImg' onChange={handleImageChange} />
                            </div>
                            <button type='Submit' className='btn btn-primary' onClick={handleAddBook}>Confirm And Add</button>
                        </form>
                    </div>
                </div>
            </div>

            <AdminFooter />
        </>
    )
}

export default AddBook
