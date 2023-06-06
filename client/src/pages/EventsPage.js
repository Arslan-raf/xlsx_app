import React, { useEffect, useState } from "react";
import axios from "axios";
import AddInstructorModal from "../components/instructor/AddInstructorModal";
import InstructorItem from "../components/instructor/InstructorItem";

export default function InstructorPage() {
    const [modal, setModal] = useState(false);
    
    const [data, setData] = useState([])

    useEffect(() => {
      
    }, [])

    const getInstructor = () => {

    }

    return (
        <div>

        </div>
    )
}
