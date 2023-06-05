import React, { useEffect, useState } from "react";
import axios from "axios";
import cl from './addInstructorModal.module.css';

export default function AddInstructorModal({ data, setData, visible, setVisible }) {

    const rootClasses = [cl.myModal]

    if (visible) {
        rootClasses.push(cl.active);
    }

    const [formData, setFormData] = useState('')

    const saveInstructore = () => {
        axios.post('http://localhost:4000/api/instructor', {
            name: formData,
            // userId: 1,
        })
            .then(function (response) {
                setData([...data, response.data])
                setFormData('')
                setVisible(false)
            })
    }

    const handleSubmit = (event) => {
        event.preventDefault()
        saveInstructore()
    }

    const handleChange = (event) => {
        setFormData(event.target.value)
    }


    return (
        <div className={rootClasses.join(' ')} onClick={() => setVisible(false)}>
            <div className={cl.myModalContent} onClick={(e) => e.stopPropagation()}>
                <div className="contact_form_block">
                    <div className="form_detalis">
                        <h3 className="mb-3 form_heading">Добавление нового инструктора</h3>
                        <form onSubmit={handleSubmit}>
                            <input className="form-control" type="text" name="name" value={formData} onChange={handleChange} />
                            <button className="btn btn-primary" type="submit">click</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}