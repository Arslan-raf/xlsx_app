import React, { useEffect, useRef, forwardRef, useState } from "react";
import EventTableTd from './EventTableTd'
import axios from "axios";

const EventTable = ({ events, setEvents, myref, refButtons }) => {

    const [visible, setVisible] = useState(false)


    const eventDelete = (id) => {
        axios.delete(`http://localhost:4000/api/event/${id}`)
        const index = events.findIndex(item => item.id === id)
        events.splice(index, 1)
        // console.log('events', events);
        // console.log(index);
        setEvents([...events])
    }

    const eventUpdate = (id) => {
        axios.put(`http://localhost:4000/api/event/${id}`)
        setVisible(true)
        setEvents([...events])
    }


    return (
        <div>
            <table className="table" ref={myref} >
                <thead>
                    <tr>
                        <td>
                            Id
                        </td>
                        <td>
                            Название Мероприятия
                        </td>
                        <td>
                            Дата начала
                        </td>
                        <td>
                            Дата окончания
                        </td>
                        <td>
                            Комментарий
                        </td>
                        <td>
                            Инструктор
                        </td>
                        <td>

                        </td>
                    </tr>
                </thead>
                <tbody>
                    {
                        events && events.map((event) => {
                            return (
                                <tr>
                                    <td>
                                        {event.id}
                                    </td>
                                    <td>
                                        {event.event_name}
                                    </td>
                                    <td>
                                        {event.start_date}
                                    </td>
                                    <td>
                                        {event.end_date}
                                    </td>
                                    <td>
                                        {event.comment}
                                    </td>
                                    <EventTableTd instructorId={event.instructorId}></EventTableTd>
                                    <td id="deleteForExcel" ref={refButtons}>
                                        <button onClick={() => eventUpdate(event.id)} >редакт</button>
                                        <button onClick={() => eventDelete(event.id)}>удалить</button>
                                    </td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>
        </div>
    )
}

export default EventTable