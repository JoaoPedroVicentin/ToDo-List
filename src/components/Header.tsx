import styles from "./Header.module.css";

import toDoList from "../assets/logo-todolist.svg"

export function Header(){
    return(
        <header className={styles.header}>
            <img src={toDoList} alt="Logotipo ToDo List"/>
        </header>
    )
}