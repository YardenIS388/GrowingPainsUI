import {Route, Routes} from 'react-router-dom'
import {ChakraProvider} from '@chakra-ui/react'
import Home from './pages/Home.js'
import StoryPage from './pages/StoryPage.js'
import Footer from './components/Footer.js'


function App() {
    return (

        <ChakraProvider>
            <Routes>
                <Route path='/' element={<Home></Home>}> </Route>
                <Route path='/stories/:id' element={<StoryPage></StoryPage>}></Route>
            </Routes>
        </ChakraProvider>

    )
}

export default App