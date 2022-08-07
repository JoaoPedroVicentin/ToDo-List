import styles from "./List.module.css"
import { Trash, Check } from "phosphor-react"

interface TaskProps{
    id: string;
    content: string;
    isComplete: boolean
    onDeleteTask: (id: string) => void;
    onTaskComplete: (id: string) => void;
}

export function List({id, content, isComplete, onDeleteTask, onTaskComplete}: TaskProps ){

    function handleDeleteTask(){
        onDeleteTask(id);
    }

    function handleTaskCompleted(){
        onTaskComplete(id)
    }

    return(
        <div className={styles.list}>
            <div className={styles.task}>
                <label>
                    <input checked={isComplete} onClick={handleTaskCompleted} type="checkbox"/>
                    <span className={styles.check}><Check/></span>
                </label>
                <p className={isComplete ? styles.complete : styles.noComplete}>{content}</p>
                <div className={styles.button}>
                    <button onClick={handleDeleteTask} title="Deletar tarefa">
                        <Trash size={24}/>
                    </button>
                </div>
            </div>
        </div>
    )
}