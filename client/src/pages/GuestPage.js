import React, { useEffect, useState } from "react";
import axios from "axios";

export default function GuestPage() {
    const [data, setData] = useState()

    useEffect(() => {
        getType()
    }, [])

    const getType = () => {
        axios.get('http://localhost:4000/api/guest')
            .then((result) => {
                setData(result.data)
                // console.log(result.data);
            });
    }

    return (
        <div>
            <h2>Гости:</h2>
            {
                data && data.map((item) => {
                    return (
                        <div>
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
