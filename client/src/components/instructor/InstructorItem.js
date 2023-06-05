import React, { useEffect, useState } from "react";
import axios from "axios";


export default function InstructorItem({ data, setData, instructor }) {

    function removeInstructor(id) {
        axios.delete(`http://localhost:4000/api/instructor/${id}`)
        const index = data.findIndex(item => item.id === instructor.id)
        data.splice(index, 1)
        // console.log('data',data);
        // console.log(index);
        setData([...data])
    }

    return (
        <div key={instructor.id}>
            <h3 key={instructor.id}>Id: {instructor.id}</h3>
            <p key={instructor.name}>Name: {instructor.name}</p>
            <p key={instructor.name + '1'}>UserID: {instructor.userId}</p>
            <button className="btn btn-secondary" key={instructor.name + 'ы'} onClick={() => { }}>Редактирование данных</button>
            <button className="btn btn-secondary" key={instructor.name + '2'} onClick={() => { removeInstructor(instructor.id) }}>Удалить инструктора</button>
            <hr></hr>
        </div>
    )
}