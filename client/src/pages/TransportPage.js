import React, { useEffect, useState } from "react";
import axios from "axios";
import AddInstructorModal from "../components/instructor/AddInstructorModal";
import InstructorItem from "../components/instructor/InstructorItem";

export default function InstructorPage() {
    const [modal, setModal] = useState(false);
    
    const [data, setData] = useState([])

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

    return (
        <div>
             <AddInstructorModal setData={setData} visible={modal} setVisible={setModal}/>

            <h2>Добавить нового инструктора:</h2>
            <button onClick={() => { setModal(true) }}>Добавить</button>

            <h2>Инструкторы:</h2>
            {
                data && data.map((instructor) => {
                    return (
                        <InstructorItem key={instructor.id} instructor={instructor} ></InstructorItem>
                    )
                })
            }
        </div>
    )
}
