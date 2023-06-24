

import {useState, useEffect} from 'react'
import Header from '../components/Header'
import ShareStory from '../components/ShareStory'
import SuccsessShareStoryDrawer from '../components/SuccsessShareStoryDrawer'
import {Example} from '../components/Accordion'
import { VStack, useDisclosure} from '@chakra-ui/react'
import ConfettiAnimation from '../components/ConfettiAnimation'

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
          window.addEventListener('resize', updateDimension);
        return () => {
            window.removeEventListener('resize', updateDimension);
        }
    }, [])

   const openShareDrawer = (storyObj) => {
        setShareStoryData(storyObj)
        onOpen()    
   }

    return (
   
            <VStack bg='#080808' h={screenSize.height} px="16px" overflowY='hidden' pb={4}>
                        <Header screenHeight={screenSize.height}/>
                        <Example screenHeight={screenSize.height}></Example>
                        <ShareStory screenHeight={screenSize.height} handleDrawerToggle={openShareDrawer}/>
                        <SuccsessShareStoryDrawer onClose={onClose} isOpen={isOpen} shareStoryData={shareStoryData}></SuccsessShareStoryDrawer>
                       
            </VStack>
           

    


  
    )
}