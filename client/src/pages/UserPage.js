import React, { useEffect, useState } from "react";
import axios from "axios";

export default function UserPage() {
    const [data, setData] = useState()

    useEffect(() => {
        getType()
    }, [])

    const getType = () => {
        axios.get('http://localhost:4000/api/user')
            .then((result) => {
                setData(result.data)
                // console.log(result.data);
            });
    }

    return (
        <div>
            
            <h2>Пользователи:</h2>
            {
                data && data.map((item) => {
                    return (
                        <div key={item.name}>
                            <h3 key={item.id}>{item.name}</h3>
                            <p key={item.email}>{item.email}</p>
                            <hr></hr>
                        </div>
                    )
                })
            }
        </div>
    )
}
