import React from "react";
import cl from './Loader.module.css'

const Loader = () => {
    return(
        <div className={cl.flexed}>
            <div className={cl.loader}></div>
            <p> Загрузка...</p>
        </div>
    )
}

export default Loader;