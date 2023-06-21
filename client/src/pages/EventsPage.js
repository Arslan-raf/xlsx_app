import React, { useEffect, useState, useRef, forwardRef } from "react";
import axios from "axios";
import EventTable from "../components/events/EventTable";
import AddEventModal from "../components/events/AddEventModal";
import Loader from "../components/UI/Loader";
import AddEventClipboardModal from "../components/events/AddEventClipboardModal";
const XLSX = require("xlsx");

export default function EventPage() {
    //видимость модального окна
    const [modal, setModal] = useState(false);
    const [clipboardModal, setClipboardModal] = useState(false);

    //сами данные, мероприятия 
    const [events, setEvents] = useState([])

    //кол-во всех записей мероприятий, элементы которые нужно пропускать, лимит - кол-во которое показываю на странице
    const [countEvents, setCountEvents] = useState(0)
    const [offset, setOffset] = useState(0)
    const [limit, getLimit] = useState(3)

    //таблица сама, и последний столбец для удаления (чтобы не сохранять в эксель)
    const ref = useRef();
    const refButtons = useRef();

    //индикатор загрузки
    const [loader, setLoader] = useState(false)


    //при нажатии кнопок пагинации изменяется offset и вытягиваются новые данные
    useEffect(() => {
        getEvents()
    }, [offset])

    //получение всех постов, для уточнения кол-ва 
    useEffect(() => {
        axios.get(`http://localhost:4000/api/event/getAllEvents`)
            .then((result) => {
                setCountEvents(result.data.length)
            });
    }, [])

    //СЮДА ЖЕ НУЖНО БУДЕТ ИНДИКАТОР ЗАГРУЗКИ (ДЕЛАТЬ TRUE до запроса и FALSE полсе получения данных)
    const getEvents = () => {
        setLoader(true)
        axios.get(`http://localhost:4000/api/event/${offset}&${limit}`)
            .then((result) => {
                setEvents(result.data)
                setLoader(false)
            });
    }

    //обработчики кнопок пагинации
    const nextPage = () => {
        // console.log("countEvents", Math.ceil(countEvents / 3));
        // console.log("offset", offset);

        if (offset === Math.ceil(countEvents / 3) + 3) {
            setOffset(offset)
        }
        else {
            setOffset(offset + 3)
            // btnNext.current.disabled = false
        }
    }

    const prevPage = () => {
        if (offset === 3 || offset === 0) {
            setOffset(0)
            // console.log(offset);
        }
        else {
            setOffset(offset - 3)
            // console.log(offset);
            // btnNext.current.disabled = false
        }
    }

    // обработчик создания эксель файла
    const handleExcel = () => {

        //РАБОЧЕЕ
        // var workbook = XLSX.utils.table_to_book(ref.current);
        // var ws = workbook.Sheets["Sheet1"];

        // console.log("workbook ",workbook);
        // console.log("ws ",ws);
        // delete (ws['G'])
        // XLSX.utils.sheet_add_aoa(ws, '');
        // XLSX.writeFile(workbook, "Report.xlsb");

        const buttons = refButtons.current;

        //тоже РАБОЧЕЕ
        const ws = XLSX.utils.table_to_sheet(ref.current);
        console.log('ws', ws);

        //установление ширины столбцам
        ws['!cols'] = [];

        for (let i = 0; i < 7; i++) {
            if (i === 0) {
                ws['!cols'][i] = { width: 5 };
            }
            else ws['!cols'][i] = { width: 25 };
        }

        const range = ws["!ref"];
        // Разбиваем диапазон на начальную и конечную ячейки
        const [startCell, endCell] = range.split(":"); //A1:G4
        // Получаем номер колонки конечной ячейки
        // console.log("endCell", endCell); //G4

        //хочу получить букву последнего столбца и кол-во строк
        const lastChar = endCell.split('') //['G','4']
        // console.log(lastChar);

        for (let i = 0; i <= Number(lastChar[1]); i++) {
            delete (ws[`${lastChar[0]}${i}`])
        }
        // delete (ws['G2'])

        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
        // console.log("wb", wb);

        /* save file */
        XLSX.writeFile(wb, 'SheetTest.xlsx');
    }


    //ОШИБКА ПРИ ИМПОРТИРОВАНИИ:
    //     Unfortunately you can't use readFile in the browser:
    // readFile is only available in server environments. Browsers have no API for reading arbitrary files given a path, so another strategy must be used.

    // const handleImportExcel = () => {
    //     const workbook = XLSX.readFile('../excelFiles/textImport.xlsx')
    //     let worksheet = workbook.Sheets[workbook.SheetNames[0]]

    //     for (let i = 2; i < 7; i++) {
    //         const id = worksheet[`A${i}`].v;
    //         const name = worksheet[`B${i}`].v;
    //         // const name = worksheet[`B${i}`].v;
    //         // const name = worksheet[`B${i}`].v;
    //         console.log({
    //             id: id,
    //             name: name
    //         });
    //     }

    // }

    //тест работы с буфером обмена
    const [fromClipboard, setFromClipboard] = useState('')

    const handlerFromClipboard = (event) => {
        setFromClipboard(event.target.value)
    }

    const pasteClipboard = async () => {
        try {
            const arrayResult = [];
            const text = await navigator.clipboard.readText();
            setFromClipboard(text)
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
                        console.log("arrayWords: ", arrayWords);
                    }
                }))
            }

            console.log(arrayResult);
        } catch (err) {
            console.error('Failed to read clipboard contents: ', err);
        }
    }

    function splitLine(line) {
        const arrayOfLines = line.match(/[^\t\s]+/g);
        return arrayOfLines;
    }

    return (
        <div>
            <div>
                Мероприятия:
                <button onClick={() => setModal(true)}>Добавить мероприятие</button>
                <button onClick={() => setClipboardModal(true)}>Добавить мероприятие с помощью Буфера обмена</button>
            </div>
            <div>
                <button onClick={handleExcel}>Скачать Excel</button>
                {/* <button onClick={handleImportExcel}>Получить данные из Excel</button> */}
            </div>

            <div>
                <label>Сюда вставится текст с буфера обмена: </label>
                <input value={fromClipboard} onChange={handlerFromClipboard} />
                <button onClick={pasteClipboard}>Вставить текст</button>
            </div>

            <AddEventModal events={events} setEvents={setEvents} visible={modal} setVisible={setModal}></AddEventModal>
            <AddEventClipboardModal events={events} setEvents={setEvents} visible={clipboardModal} setVisible={setClipboardModal} ></AddEventClipboardModal>
            {
                loader
                    ? <Loader />
                    : <EventTable refButtons={refButtons} myref={ref} events={events} setEvents={setEvents}></EventTable>
            }
            {/* <EventTable refButtons={refButtons} myref={ref} events={events} setEvents={setEvents}></EventTable> */}
            <div style={{ display: "flex", justifyContent: "center", gap: 20 }}>
                <button onClick={prevPage}>Back</button>
                <button onClick={nextPage}>Next</button>
            </div>
        </div>
    )
}
