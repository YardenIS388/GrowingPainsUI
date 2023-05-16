

import {useState, useEffect, useRef} from 'react'
import Header from '../components/Header'
import ShareStory from '../components/ShareStory'
import AccordionItem from '../components/AccordionItem'
import axios from 'axios'
import Footer from '../components/Footer'
import SuccsessShareStoryDrawer from '../components/SuccsessShareStoryDrawer'
import {Example} from '../components/Accordion'

import { VStack, Center, Text,Drawer, Box, HStack,Image,
    DrawerBody,
    DrawerFooter,
    DrawerHeader,
    DrawerOverlay,
    DrawerContent,
    DrawerCloseButton,
    useDisclosure} from '@chakra-ui/react'

export default function Home() {
    const [screenSize,setScreenSize] = useState({width: window.innerWidth, height: window.innerHeight});
    const [stories, setStories] = useState([])
    const [shareStoryData, setShareStoryData]=useState({})
    const { isOpen, onOpen, onClose } = useDisclosure()
   
  

  

   
    const rootURL = process.env.REACT_APP_ROOTURL
    const getStoriesURI = rootURL

    const getStoryList = async() => {
        try {

            const fetchData = await axios.get(getStoriesURI)
            console.log(fetchData.data)
            setStories(fetchData.data)
        } catch (error) {
            console.log(error)
        }
    }

    const getCurrentDimension = () => {
        return {width: window.innerWidth, height: window.innerHeight}
    }

    useEffect(() => {
   
        window.addEventListener('load', getStoryList)

        const updateDimension = () => {
            setScreenSize(getCurrentDimension())
        }

        window.addEventListener('resize', updateDimension)

        return () => {
            window.removeEventListener('load', getStoryList)
            window.removeEventListener('resize', updateDimension)
        }
    }, [stories, screenSize])

   const openShareDrawer = (storyObj) => {
        setShareStoryData(storyObj)
        onOpen()    
   }

    return (
      <>

<VStack
                bg='#080808'
                h={screenSize.height}
                px="16px">

                <Header screenHeight={screenSize.height} stories={stories}/>
                {/* <VStack h={screenSize.height * 0.8} w="100%">
                    <AccordionItem
                        title={'About this project'}
                        filter="-"
                        screenHeight={screenSize.height}></AccordionItem>
                    <AccordionItem
                        stories={stories}
                        filter='0-12'
                        title={'Ages 0-12'}
                        screenHeight={screenSize.height}></AccordionItem>
                    <AccordionItem
                        stories={stories}
                        filter='13-19'
                        title={'Ages 13-19'}
                        screenHeight={screenSize.height}></AccordionItem>
                    <AccordionItem
                        stories={stories}
                        filter='20-29'
                        title={'Ages 20-29'}
                        screenHeight={screenSize.height}></AccordionItem>
                    <AccordionItem
                        stories={stories}
                        filter='30+'
                        title={'Ages 30+'}
                        screenHeight={screenSize.height}></AccordionItem>
                </VStack> */}
                <Example screenHeight={screenSize.height} stories={stories}></Example>
                <ShareStory screenHeight={screenSize.height} handleDrawerToggle={openShareDrawer}/>
                <Footer></Footer>
            </VStack>

            <SuccsessShareStoryDrawer onClose={onClose} isOpen={isOpen} shareStoryData={shareStoryData}></SuccsessShareStoryDrawer>

      </>


  
    )
}