import React, { useEffect, useState } from "react";
import axios from "axios";
import cl from './addEventModal.module.css';


export default function AddEventClipboardModal({ events, setEvents, visible, setVisible }) {

    const [arrayResult, setArrayResult] = useState([])
    const [arrOfObjects, setArrOfObjects] = useState([])
    const [completed, setCompleted] = useState(false)

    useEffect(() => {
        if (visible) {
            pasteClipboard()
        }
        else {
            closeWindow()
        }
    }, [visible])

    async function pasteClipboard() {
        try {
            setCompleted(false)
            const text = await navigator.clipboard.readText();
            // setFromClipboard(text)
            console.log('Pasted content: ', text);

            //Метод str.match(regexp) ищет совпадения с regexp в строке str.
            const arrayOfLines = text.match(/[^\r\n]+/g);
            console.log('arrayOfLines: ', arrayOfLines);

            if (arrayOfLines.length === 0) {
                return { result: null };
            } else {
                await Promise.all(arrayOfLines.map(line => {
                    const arrayWords = splitLine(line);
                    if (arrayWords !== null) {
                        arrayResult.push(arrayWords);
                        // setArrayResult([...arrayResult, arrayWords])
                        // console.log("arrayWords: ", arrayWords);
                        // console.log("arrayResult + line", line,  arrayResult);
                    }
                }))
            }
            console.log("arrayResult", arrayResult);

            const newArrOfObjects =
                arrayResult.map(([event_name, start_date, end_date, comment, transportId, guestId, instructorId]) =>
                    ({ event_name, start_date, end_date, comment, transportId, guestId, instructorId }));

            newArrOfObjects.forEach(element => {
                console.log("element", element);
                arrOfObjects.push(element);
            });

            console.log("newArrOfObjects", newArrOfObjects);
            console.log("arrOfObjects", arrOfObjects);

            setCompleted(true)
        } catch (err) {
            console.error('Failed to read clipboard contents: ', err);
        }
    }


    function splitLine(line) {
        const arrayOfLines = line.match(/[^\t]+/g);
        return arrayOfLines;
    }

    function closeWindow() {
        setArrayResult([])
        arrayResult.splice(0, arrayResult.length);

        setArrOfObjects([])
        arrOfObjects.splice(0, arrOfObjects.length);

        console.log("Закрыл", arrayResult);
        console.log(arrOfObjects);
    }

    async function createAnArrayOfEvents() {
        axios.post('http://localhost:4000/api/event/creatingAnArrayOfEvents',  arrOfObjects )
            .then(response => {
                console.log(arrOfObjects);
            })
            .catch(error => {
                console.error(error);
            });
    }

    const rootClasses = [cl.AddEventModal]

    if (visible) {
        rootClasses.push(cl.active)
    }


    return (
        <div className={rootClasses.join(' ')} onClick={() => setVisible(false)}>
            <div className={cl.myModalContent} onClick={(e) => e.stopPropagation()}>
                <table border={1}>
                    <thead>
                        <tr>
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
                        </tr>
                    </thead>
                    <tbody>
                        {/* {arrOfObjects ? console.log("существует", arrOfObjects): console.log("НЕТ",arrOfObjects)} */}
                        {
                            arrOfObjects && completed && arrOfObjects.map((element) => {
                                return (
                                    <tr>
                                        <td>
                                            {element.event_name}
                                        </td>
                                        <td>
                                            {element.start_date}
                                        </td>
                                        <td>
                                            {element.end_date}
                                        </td>
                                        <td>
                                            {element.comment}
                                        </td>
                                        <td>
                                            {element.transportId}
                                        </td>
                                        <td>
                                            {element.guestId}
                                        </td>
                                        <td>
                                            {element.instructorId}
                                        </td>
                                    </tr>

                                )
                            })
                        }
                    </tbody>
                </table>
                <div>
                    <button onClick={createAnArrayOfEvents}>Добавить</button>
                    <button onClick={() => setVisible(false)}>Закрыть</button>
                </div>
            </div>
        </div>
    )
}


