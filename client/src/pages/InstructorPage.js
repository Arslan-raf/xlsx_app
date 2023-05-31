import React, { useEffect, useState } from "react";
import axios from "axios";

export default function InstructorPage() {
    const [data, setData] = useState()
    const [formData, setFormData] = useState('')

    useEffect(() => {
        getInstructor()
    }, [])

    const getInstructor = () => {
        axios.get('http://localhost:4000/api/instructor')
            .then((result) => {
                setData(result.data)
                console.log(result.data);
            });
    }

    const saveInstructore = () => {
        axios.post('http://localhost:4000/api/instructor',{
            name: formData,
            // userId: 1,
          })
          .then(function (response) {
            setData(formData)
            setFormData('')
          })
    }

    const handleSubmit = (event) => {
        // event.preventDefault()
        saveInstructore()
    }

    const handleChange = (event) => {
        setFormData(event.target.value)
    }



    return (
        <div>
            <h2>Добавить инструктора:</h2>
            <form onSubmit={handleSubmit}>
                <input type="text" name="name" value={formData} onChange={handleChange} />
                <button type="submit">click</button>
            </form>

            <h2>Инструкторы:</h2>
            {
                data && data.map((item) => {
                    return (
                        <div key={item.id}>
                            <h3 key={item.id}>Id: {item.id}</h3>
                            <p key={item.name}>Name: {item.name}</p>
                            <p key={item.name + '1'}>UserID: {item.userId}</p>
                            <hr></hr>
                        </div>
                    )
                })
            }
        </div>
    )
}
