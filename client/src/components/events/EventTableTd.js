import React, { useEffect, useState } from "react";
import axios from "axios";

export default function EventTableTd({ instructorId }) {

    const [instructor, setInstructor] = useState('')

    useEffect(() => {
        getAllInstructor()
    }, [])

    const getAllInstructor = async () => {
        if (!instructorId) {
            return
        }
        axios.get(`http://localhost:4000/api/instructor/${instructorId}`)
            .then((result) => {
                setInstructor(result.data)
                console.log(result.data);
            });
    }

    return (
        <td>
            {instructor && instructor.name}
        </td>
    )
}   