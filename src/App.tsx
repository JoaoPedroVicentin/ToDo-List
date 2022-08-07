
import styles from "./App.module.css"
import { Header } from "./components/Header";
import { Post } from "./components/Post";

import "./global.css";

function App() {

  return (
    <div>
      <Header/>

      <div className={styles.wrapper}>
          <Post />
      </div>
    </div>
  )
}

export default App
