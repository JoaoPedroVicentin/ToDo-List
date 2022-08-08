import styles from "./Post.module.css"
import { PlusCircle } from "phosphor-react"
import Clipboard from "../assets/Clipboard.svg"
import { List } from "./List"
import {v4 as uuidv4} from 'uuid';
import { ChangeEvent, FormEvent, useState } from "react"

interface Task{
    id: string,
    content: string,
    isComplete: boolean
}

export function Post(){

    const [tasks, setTasks] = useState<Task[]>([])

    const [newTaskText, setNewTaskText] = useState('')

    const tasksCompleted = tasks.filter(task => {
        return task.isComplete === true})

    function handleCreateNewTask(event: FormEvent){
        event.preventDefault()

        const newTask = {
            id: uuidv4(),
            content: newTaskText,
            isComplete: false
        }
        
        setTasks([newTask, ...tasks]);
        setNewTaskText('');
    }

    function handleNewTaskChange(event: ChangeEvent<HTMLTextAreaElement>){
        event.target.setCustomValidity('')
        setNewTaskText(event.target.value);
        
    }

    function deleteTask(taskToDelete: string){
        const tasksWithoutDeletedOne = tasks.filter(task => {
            return task.id != taskToDelete})
        setTasks(tasksWithoutDeletedOne)
    }

    function taskComplete(id: string){
        const updatedTasks = tasks.map((task) => {
            if(task.id === id) {
              task.isComplete = !task.isComplete
            } return task
          })
      
          setTasks(updatedTasks)
    }
    

    return(
        <main>
            <form onSubmit={handleCreateNewTask} className={styles.input}>
                <textarea 
                name="post"
                placeholder="Adicionar uma nova tarefa"
                value={newTaskText}
                onChange={handleNewTaskChange}
                required/>

                <button type="submit">
                    Criar 
                    <PlusCircle size={20}/>
                </button>
            </form>

            <div className={styles.posts}>
                <header>
                    <div className={styles.tasks}>
                        <p>Tarefas criadas</p>
                        <span>{tasks.length}</span>
                    </div>
                    <div className={styles.conclueded}>
                        <p>Concluídas</p>
                        <span>{tasksCompleted.length} de {tasks.length}</span>
                    </div>
                </header>

                {tasks.length === 0 && (
                    <div className={styles.empty} >
                        <img src={Clipboard}/>
                        <strong>Você ainda não tem tarefas cadastradas</strong>
                        <p>Crie tarefas e organize seus itens a fazer</p>
                    </div>
                )}

                <div className={styles.list}>
                    {tasks.map(task => {
                        return <List 
                                    key={task.id}
                                    id={task.id}
                                    content={task.content}
                                    isComplete={task.isComplete}
                                    onDeleteTask={deleteTask}
                                    onTaskComplete={taskComplete}
                                />
                    })}
                </div>
            </div>
        </main>
    )
}