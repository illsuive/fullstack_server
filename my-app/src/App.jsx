import { Header  , Login , Signup , Content , Feed} from '../index.js'
import {Route , Routes , Router } from 'react-router-dom'

import './App.css'

function App() {
 

  return (
    <div>
      <Header/>
      <Routes>
        <Route path='/' element={<Content/>}/>
        <Route path='/Login' element={<Login/>}/>
        <Route path='/Signup' element={<Signup/>}/>
        <Route path='/Feed' element={<Feed/>}/>
      </Routes>
    </div>
  )
}

export default App
