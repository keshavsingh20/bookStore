import React, { useState, useEffect } from 'react'
import AdminHeader from '../components/AdminHeader'
import AdminFooter from '../components/AdminFooter'
import { useParams, useNavigate } from 'react-router-dom';
import app from "../firebase";
import {
    getStorage,
    ref,
    uploadBytesResumable,
    getDownloadURL,
    deleteObject,
} from "firebase/storage";

function UpdateBook() {
    const [title, setTitle] = useState("");
    const [price,setPrice] = useState("");
    const [author, setAuthor] = useState("");
    const [category, setCategory] = useState("");
    const [image, setImage] = useState("")
    const [active, setActive] = useState("")
    const [img, setImg] = useState(null);
    const params = useParams();
    const navigate = useNavigate();


    useEffect(() => {
        getBookDetails();
    }, [])
    const getBookDetails = async () => {
        let book = await fetch(`/api/book/book/details/${params.id}`)
        book = await book.json();
        setTitle(book.title);
        setImage(book.image);
        setPrice(book.price);
        setAuthor(book.author);
        setActive(book.active);
        setCategory(book.category);
    }

    const handleRadioChange = (event) => {
        setActive(event.target.value);
    };

    const handleImageChange = (event) => {
        const file = event.target.files[0];
        setImg(file)
    }

    const handleBookUpdate = (e)=>{
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
                   // console.log("Image File available at", downloadURL);
                    let bookData = await fetch(`/api/book/update/${params.id}`, {
                        method: "PUT",
                        body: JSON.stringify({ title, price, category, author, active, image: downloadURL }),
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
        )
    }

    const updateData = async () => {
        let bookData = await fetch(`/api/book/update/${params.id}`, {
            method: "PUT",
            body: JSON.stringify({ title, price, category, author, active,}),
            headers: {
                "Content-Type": "application/json",
            }
        })
        bookData = await bookData.json()
        if (bookData) {
            navigate('/admin/manage/books')
        }
    }




    return (
        <>
            <AdminHeader />

            <div className='admin-home-container'>
                <div className="main-content">
                    <div className="wrapper">
                        <h1 style={{ textAlign: 'start' }}>Update Book</h1>
                        <br /><br />

                        <form className='add-category'>
                            <div>
                                <label htmlFor="title">Title: </label>
                                <input type="text" name="title" id="title" value={title} onChange={(e)=>setTitle(e.target.value)}/>
                            </div>
                            <div>
                                <label htmlFor="price">Price: </label>
                                <input type="text" name="price" id="price" value={price} onChange={(e)=>setPrice(e.target.value)} />
                            </div>
                            <div>
                                <label htmlFor="author">Author: </label>
                                <input type="text" name="author" id="author" value={author} onChange={(e)=>setAuthor(e.target.value)} />
                            </div>
                            <div>
                                <label htmlFor="category">Category: </label>
                                <select name="category" id="category" onChange={(e)=>setCategory(e.target.value)}>
                                    <option value={category} selected disabled>{category}</option>
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
                            <div style={{ display: 'flex', flexDirection: 'column' }}>
                                <div><label htmlFor="selImg">Select Image: </label>
                                    <input type="file" name='selImg' id='selImg' onChange={handleImageChange} />
                                </div>
                                <img src={image} alt="" style={{ width: '100px' }} />
                            </div>
                            <button type='Submit' className='btn btn-primary'  onClick={handleBookUpdate}>Update</button>
                        </form>
                    </div>
                </div>
            </div>

            <AdminFooter />
        </>
    )
}

export default UpdateBook
