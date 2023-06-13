import React, { useEffect, useState } from "react";
import axios from "axios";
import cl from './addEventModal.module.css';

export default function  UpdateEventModal({ data, setData, visible, setVisible }) {

    const rootClasses = [cl.AddEventModal]

    if (visible) {
        rootClasses.push(cl.active);
    }

    //вытягивание всех инструкторов
    const [dataInstr, setDataInstr] = useState([])

    useEffect(() => {
        getAllInstructors()
    }, [])

    const getAllInstructors = async () => {
        axios.get('http://localhost:4000/api/instructor')
            .then((result) => {
                setDataInstr(result.data)
                // console.log(result.data);
            });
    }

    // Инструктор
    const [selectInstructor, setSelectInstructor] = useState('')

    const handleSelectInstructor = (event) => {
        setSelectInstructor(event.target.value)
    }

    //название Мероприятия
    const [eventName, setEventName] = useState('')

    const handlerEvenName = (event) => {
        setEventName(event.target.value)
    }

    //дата начала
    const [startDate, setstartDate] = useState('')

    const handlerStartDate = (event) => {
        setstartDate(event.target.value)
        console.log(startDate);
    }

    //дата окончания

    const [endDate, setEndDate] = useState('')

    const handleEndDate = (event) => {
        setEndDate(event.target.value)
    }

    //Комментарии
    const [comment, setComment] = useState('')

    useEffect(()=>{
        console.log(selectInstructor)
    }, [selectInstructor])
    const handleComment = (event) => {
        setComment(event.target.value)
    }

    // Добавление мероприятия
    const handleSubmit = (event) => {
        event.preventDefault()
        saveInstructore()
    }

    const saveInstructore = () => {
        axios.post('http://localhost:4000/api/event', {
            event_name: eventName,
            instructor_id: selectInstructor,
            start_date: startDate,
            end_date: endDate,
            // transportId:"1", 
            comment: comment
        })
            .then(function (response) {
                //console.log("selectInstructor", selectInstructor);
                setData([...data, response.data])
                setVisible(false)
                setEventName('')
                setComment('')
                setEndDate('')
                setstartDate('')

            })
    }

    return (
        <div className={rootClasses.join(' ')} onClick={() => setVisible(false)}>
            <div className={cl.myModalContent} onClick={(e) => e.stopPropagation()}>
                <div className="contact_form_block">
                    <div className="form_detalis">
                        <h3 className="mb-3 form_heading">Добавление мероприятия</h3>
                        <form action="http://localhost:4000/api/event" method="post" onSubmit={handleSubmit} className="form">
                            <div>
                                <label>Название мероприятия</label>
                                <input
                                    value={eventName}
                                    type="text"
                                    name="event_name"
                                    onChange={handlerEvenName}
                                />
                            </div>

                            <div>
                                <label>Выберите инструктора</label>
                                <select required
                                    name="instructor_id"
                                    key={dataInstr[0]}
                                    value={selectInstructor}
                                    onChange={handleSelectInstructor}
                                >
                                    <option value="" selected disabled hidden>--Инструктор--</option>
                                    {
                                        dataInstr && dataInstr.map(
                                            (instructor) => {
                                                return (
                                                    <option
                                                        key={instructor.id}
                                                        value={instructor.id}
                                                    >
                                                        {instructor.name}
                                                    </option>
                                                )
                                            }
                                        )
                                    }
                                </select>
                            </div>

                            {/* Даты */}
                            <div>
                                <div>
                                    <label>Дата начала</label>
                                    <input
                                        type="date"
                                        value={startDate}
                                        onChange={handlerStartDate}
                                    ></input>
                                </div>
                                <div>
                                    <label>Дата окончания</label>
                                    <input
                                        type="date"
                                        value={endDate}
                                        onChange={handleEndDate}
                                    ></input>
                                </div>
                            </div>

                            {/* Комментарий */}
                            <div>
                                {/* <input type="text-area"> </input> */}
                                <textarea 
                                    name="comment"
                                    value={comment}
                                    onChange={handleComment}    
                                >
                                </textarea>
                            </div>


                            <button className="btn btn-primary" type="submit">Создать</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}