import React, { useEffect, useState, useRef, forwardRef } from "react";
import axios from "axios";
import EventTable from "../components/events/EventTable";
import AddEventModal from "../components/events/AddEventModal";
const XLSX = require("xlsx");

export default function EventPage() {
    const [modal, setModal] = useState(false);

    const [events, setEvents] = useState([])

    const ref = useRef();

    useEffect(() => {
        getEvents()
        console.log("ref: ", ref.current);
    }, [])

    const getEvents = () => {
        axios.get('http://localhost:4000/api/event')
            .then((result) => {
                setEvents(result.data)
                console.log(ref.current)
                // console.log(result.data);
            });
    }


    const handleExcel = () => {

        //методы работы с xslx
        // //sheet -лист
        // aoa_to_sheet - обрабатывает массив массивов
        //json_to_sheet - массив объектов js
        //table_to_book(dom_element, opts) -  HTML TABLE
        //book_append_sheet(workbook, worksheet, sheet_name) - добавление рабочего листа к рабочей книги

        // const wb = XLSX.utils.book_new(),
        //     ws = XLSX.utils.json_to_sheet(events); 
        // XLSX.utils.book_append_sheet(wb, ws, "mySheet1");
        // XLSX.writeFile(wb, "MyExcel.xlsx")

        var workbook = XLSX.utils.table_to_book(ref.current);
        var ws = workbook.Sheets["Sheet1"];
        // XLSX.utils.sheet_add_aoa(ws, [["Created " + new Date().toISOString()]], { origin: -1 });
        XLSX.utils.sheet_add_aoa(ws);
        XLSX.writeFile(workbook, "Report.xlsb");



        // var workbook = XLSX.utils.book_new(),
        //     worksheet = XLSX.utils.aoa_to_sheet(events); 
        // workbook.SheetNames.push("First");
        // workbook.Sheets["First"] = worksheet;

        //         workbook = XLSX.utils.book_new() Creates a new Excel workbook.
        // worksheet = XLSX.utils.aoa_to_sheet(events) Creates a new worksheet, using the dummy events array above.
        // workbook.SheetNames.push("First") and workbook.Sheets["First"] = worksheet Attach the worksheet to the workbook.
    }

    return (
        <div>
            <div>
                Мероприятия:
                <button onClick={() => setModal(true)}>Добавить мероприятие</button>
            </div>
            <div>
                <button onClick={handleExcel}>Скачать Excel</button>
            </div>
            <AddEventModal events={events} setEvents={setEvents} visible={modal} setVisible={setModal}></AddEventModal>


            <EventTable myref={ref} events={events} setEvents={setEvents}></EventTable>
        </div>
    )
}
