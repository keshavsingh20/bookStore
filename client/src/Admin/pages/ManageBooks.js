import React, { useEffect, useState } from 'react'
import '../styles/ManageBooks.css'
import AdminHeader from '../components/AdminHeader'
import AdminFooter from '../components/AdminFooter'
import bookImg from '../../assets/images/book/Book_Name_164.jpg'
import { Link } from 'react-router-dom'
import app from "../firebase";
import { getStorage, ref, deleteObject } from "firebase/storage";

function ManageBooks() {
    const [books, setBooks] = useState([])

    useEffect(() => {
        getBooks()
    }, [])

    const getBooks = async () => {
        let result = await fetch("/api/book/books/details");

        result = await result.json();
        setBooks(result);
    }


    const handleDeleteBook = async (id, imageName) => {

        const storage = getStorage(app);

        // Create a reference to the file to delete
        const desertRef = ref(storage, `${imageName}`);

        // Delete the file
        deleteObject(desertRef).then(() => {
            // File deleted successfully
            console.log('file delted successfully...!')
            try {
                fetch(`/api/book/delete/${id}`, {
                    method: 'DELETE',
                    headers: {
                        // authorization: `bearer ${JSON.parse(localStorage.getItem('token'))}`
                    }
                }).then(async (result) => {
                    result = await result.json()
                    if (result.acknowledged === true) {
                        // window.location.reload(false);
                        getBooks()
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
                    <h1>Manage Books</h1>

                    <Link to='/admin/add/book' className='btn btn-success adm-btn'>Add New Book</Link>
                    <div className='table-container'>
                        <table className="table tbl-full table-striped">
                            <thead>
                                <tr className="tbl-heading">
                                    <th>S.N.</th>
                                    <th>Title</th>
                                    <th>Price</th>
                                    <th>Image</th>
                                    <th>Active</th>
                                    <th>Category</th>
                                    <th>Author</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {/* <tr>
                                    <td>1.</td>
                                    <td>Object Oriented Programming</td>
                                    <td>500.0</td>
                                    <td><img src={bookImg} className='adm-img-book' alt="" /></td>
                                    <td>Yes</td>
                                    <td>CSE</td>
                                    <td>Author A</td>
                                    <td>
                                        <Link to='/admin/update/book' className="btn btn-primary adm-btn">Update</Link>
                                        <a href="#" className="btn btn-danger adm-btn">Delete</a>
                                    </td>
                                </tr> */}

                                {
                                    books.length > 0 ?
                                        books.map((book, index) =>
                                            <tr key={index}>
                                                <td>{index + 1}</td>
                                                <td>{book.title}</td>
                                                <td>{book.price}</td>
                                                <td><img src={book?.image} className='adm-img-book' alt="" /></td>
                                                <td>{book.active}</td>
                                                <td>{book.category}</td>
                                                <td>{book.author}</td>
                                                <td>
                                                    <Link to={`/admin/update/book/${book._id}`} className="btn btn-primary adm-btn">Update</Link>
                                                    <a href="#" className="btn btn-danger adm-btn" onClick={() => handleDeleteBook(book._id, book.image)}>Delete</a>
                                                </td>
                                            </tr>
                                        )
                                        :
                                        <tr>
                                            <td colSpan={8}><h2>No Books Found..!</h2></td>
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

export default ManageBooks
