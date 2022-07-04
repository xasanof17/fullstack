import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Form() {
  const [showStudent, setShowStudent] = useState(false);
  const [addStudent, setAddStudent] = useState(false);

  const [contact, setContact] = useState({
    name: '',
    descr: '',
    number: ''
  })
  const [contacts, setContacts] = useState([{ name: '', descr: '', number: '', _id: '' }]);
  const [isUpdate, setIsUpdate] = useState(false);
  const [updateContact, setUpDateContact] = useState({ name: '', number: '', descr: '', id: '' });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setContact(prev => {
      return {
        ...prev,
        [name]: value,
      }
    })
  }
  const submitHandler = (e) => {
    e.preventDefault();
    const { name, descr, number } = contact
    const newContact = { name, descr, number };
    axios.post("/newContact", newContact);
    toast.success("Contact was added successfully!")
    setContact({
      name: '',
      descr: '',
      number: '',
    })
  };

  // delete contact from table and database
  const deleteContact = (id) => {
    axios.delete("/delete/" + id);
    toast.error("Contact was deleted successfully?!")
  }
  // update contact from table and database
  const updateContactHandler = (id) => {
    axios.put("/put/" + id, updateContact);
    toast.update("Contact was updated successfully!")
  }

  const handleUpdate = (e) => {
    const { name, value } = e.target;
    setUpDateContact(prev => {
      return {
        ...prev,
        [name]: value
      }
    })
  }

  const updateData = (id) => {
    setIsUpdate(true);
    setUpDateContact(prev => {
      return {
        ...prev,
        id: id
      }
    })
  }

  useEffect(() => {
    fetch("/contacts")
      .then(res => {
        if (res.ok) {
          return res.json();
        }
      })
      .then(result => setContacts(result))
      .catch(err => console.log(err))
  }, [contacts])

  return (
    <>
      <div className="d-flex justify-content-md-end justify-content-center">
        <button onClick={() => setAddStudent(!addStudent)} type='button' className="btn btn-primary mr-2">Add STUDENT</button>
        <button onClick={() => setShowStudent(!showStudent)} type='button' className="btn btn-secondary">SHOW STUDENT</button>
      </div>
      {addStudent ? (
        !isUpdate ? (
          <form className='form my-5' autoComplete="off">
            <div className='mb-3'>
              <label htmlFor='name' className='form-label'>
                Enter Your Name
              </label>
              <input type='text' name='name' className='form-control' id='name' value={contact.name}
                onChange={handleChange} required />
            </div>
            <div className='mb-3'>
              <label htmlFor='number' className='form-label'>
                Enter Your Number
              </label>
              <input type='tel' maxLength="12" name='number' className='form-control' id='number' value={contact.number}
                onChange={handleChange} required />
            </div>
            <div className="form-floating mb-3">
              <label htmlFor="descr">Comment</label>
              <textarea autoComplete='on' onChange={handleChange} value={contact.descr} name='descr' className="form-control" placeholder="Enter Your Comment" id="descr" required></textarea>
            </div>
            <button onClick={submitHandler} type='sumbit' className='btn btn-outline-primary w-100' autoComplete='on'>Submit</button>
          </form>
        ) : (
          <form className='form my-5' autoComplete="off">
            <div className='mb-3'>
              <label htmlFor='name' className='form-label'>
                Enter Your Name
              </label>
              <input type='text' name='name' className='form-control' id='name' value={updateContact.name}
                onChange={handleUpdate} required />
            </div>
            <div className='mb-3'>
              <label htmlFor='number' className='form-label'>
                Enter Your Number
              </label>
              <input type='tel' maxLength="12" name='number' className='form-control' id='number' value={updateContact.number}
                onChange={handleUpdate} required />
            </div>
            <div className="form-floating mb-3">
              <label htmlFor="descr">Comment</label>
              <textarea autoComplete='on' onChange={handleUpdate} value={updateContact.descr} name='descr' className="form-control" placeholder="Enter Your Comment" id="descr" required></textarea>
            </div>
            <button onClick={() => updateContactHandler(updateContact.id)} type='sumbit' className='btn btn-outline-primary w-100' autoComplete='on'>Change</button>
          </form>
        )
      ) : null}
      {showStudent ? (
        !isUpdate ? (
          <table className="table table-hover table-striped mt-3">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Name</th>
                <th scope="col">Number</th>
                <th scope="col">Comment</th>
                <th scope="col">Actions</th>
              </tr>
            </thead>
            <tbody>
              {contacts.map((item, index, _id) => (
                <tr key={item._id}>
                  <th scope="row">{index + 1}</th>
                  <td>{item.name}</td>
                  <td>{item.number}</td>
                  <td>{item.descr}</td>
                  <td>
                    <div className="btns">
                      <button onClick={() => deleteContact(item._id)} className='btn btn-outline-danger'>delete</button>
                      <button onClick={() => updateData(item._id)} className='btn btn-outline-success'>update</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : null)
        : null}
    </>
  )
}