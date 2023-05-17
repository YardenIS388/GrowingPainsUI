

import {useState, useEffect, useRef, useContext} from 'react'
import { StoryContext } from '../contexts/StoriesContext'
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
    const [shareStoryData, setShareStoryData]=useState({})
    const { isOpen, onOpen, onClose } = useDisclosure()

    const getCurrentDimension = () => {
        return {width: window.innerWidth, height: window.innerHeight}
    }

    useEffect(() => {
        const updateDimension = () => {
            setScreenSize(getCurrentDimension())
        }
        window.addEventListener('resize', updateDimension)

        return () => {
            window.removeEventListener('resize', updateDimension)
        }
    }, [screenSize])

   const openShareDrawer = (storyObj) => {
        setShareStoryData(storyObj)
        onOpen()    
   }

    return (
      <>

            <VStack bg='#080808' h={screenSize.height} px="16px" overflowY='hidden' >
                        <Header screenHeight={screenSize.height}/>
                        <Example screenHeight={screenSize.height}></Example>
                        <ShareStory screenHeight={screenSize.height} handleDrawerToggle={openShareDrawer}/>
                        <Footer></Footer>
            </VStack>
            <SuccsessShareStoryDrawer onClose={onClose} isOpen={isOpen} shareStoryData={shareStoryData}></SuccsessShareStoryDrawer>

      </>


  
    )
}