import {Route, Routes} from 'react-router-dom'
import {ChakraProvider} from '@chakra-ui/react'
import Home from './pages/Home.js'
import StoryPage from './pages/StoryPage.js'
import FAQPage from './pages/FAQPage.js'
import { useState, useEffect } from 'react'
import axios from 'axios'
import { StoryProvider } from './contexts/StoriesContext.js'


function App() {

    const  [stories, setStories] = useState({})
    

    useEffect(() => {

        const rootURL = process.env.REACT_APP_ROOTURL
        const getStoriesURI = rootURL
        const getStoryList = async() => {
          
            try {
                const fetchData = await axios.get(getStoriesURI)
                setStories (fetchData.data)
            } catch (error) {
                console.log(error)
            }
        }
        getStoryList()
        return () => {
 
        }
    }, [])

    return (

        <ChakraProvider>
            <StoryProvider storyList={stories}>
                <Routes style={{backgroundColor:'pink'}}>
                    <Route path='/' element={<Home></Home>}> </Route>
                    <Route path='/stories/:id' element={<StoryPage></StoryPage>}></Route>
                    <Route path='/FAQ' element={<FAQPage></FAQPage>}></Route>
                </Routes>
            </StoryProvider>
           
        </ChakraProvider>

    )
}

export default App