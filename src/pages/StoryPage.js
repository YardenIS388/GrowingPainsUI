import {Box, Text,VStack, HStack, Image,Circle, useDisclosure, Center} from '@chakra-ui/react'
import {useParams} from 'react-router-dom'
import axios from 'axios'
import {useState, useEffect, } from 'react'
import {Link} from 'react-router-dom'
import ShareStory from '../components/ShareStory'
import SuccsessShareStoryDrawer from '../components/SuccsessShareStoryDrawer'
import AudioPlayer from '../components/AudioPlayer'
import StoryCircle from '../components/StoryCircle'
import Footer from '../components/Footer'
import SearchButton from '../components/SearchButton'
export default function StoryPage(){

    const [screenSize,setScreenSize] = useState({width: window.innerWidth, height: window.innerHeight});
    const [storyData, setStoryData] = useState(null)
    const [isPlaying, setIsPlaying]= useState(false)
    const [shareStoryData, setShareStoryData]=useState({})
    const { isOpen, onOpen, onClose } = useDisclosure()

    const {id} = useParams()

        const rootURL = process.env.REACT_APP_ROOTURL
        const getStoryByIdURI = `${rootURL}/story/${id}`


    const getStoryById = async() => {
        try {

            const fetchData = await axios.get(getStoryByIdURI)
            console.log(fetchData.data)
            setStoryData(fetchData.data)
        } catch (error) {
            console.log(error)
        }
    }

    const getCurrentDimension = () => {
        return {width: window.innerWidth, height: window.innerHeight}
    }
    const openShareDrawer = (storyObj) => {
        setShareStoryData(storyObj)
        onOpen()    
   }

    useEffect(() => {

        const updateDimension = () => {
            setScreenSize(getCurrentDimension())
        }
   
        window.addEventListener('load', getStoryById)
        return () => {
        window.removeEventListener('load', getStoryById) 
        }
    }, [storyData])

    if(storyData){
        return(
            <VStack bg="#26262E"  style={{backgroundImage: 'url(../images/marble1.svg)', backgroundRepeat:'no-repeat', backgroundPosition:'center 0px'}}>
                    <VStack h={screenSize.height} justifyContent='space-between'>
                <HStack justifyContent='space-between' w='100%' pt='32px' px={3}>
                    <Link to={"/"}>
                       <Image src='../images/backIcon.svg'>

                       </Image>
                    </Link>
                    <Text color='white' fontSize='26px' fontFamily={'Merriweather'} fontWeight={700}> Growing Pains #{id}</Text>
                    <Box>
                       <SearchButton></SearchButton>
                    </Box>
                </HStack>

               
               <VStack pb={5} gap={5} bg='linear-gradient(180deg, rgba(38, 38, 46, 0) 0%, rgba(38, 38, 46, 0.3) 23.96%);'>

                <VStack color='white' w="100%" alignItems='flex-start' px='40px' >
                    <Text color='#A9A9B1' fontFamily={'Roboto'} fontWeight={400} fontSize='16px'> Ages {storyData.ageGroup}</Text>
                    <Text fontFamily={'Roboto'} fontWeight={400} fontSize='16px' pb='16px'> {storyData.content}</Text>
                    <AudioPlayer storyData={storyData} audioFile={'audio-1.mp3'}>

                    </AudioPlayer>
                </VStack>


                <HStack w='100%' px='40px'>
                    <Center boxSize='60px' bg='#303038' borderRadius='16px' onClick={()=> openShareDrawer(storyData)}>
                        <Image src='../images/shareIcon.svg'></Image>
                    </Center>
                    <ShareStory screenHeight={screenSize.height} handleDrawerToggle={openShareDrawer}/>
                </HStack>
                
                <SuccsessShareStoryDrawer onClose={onClose} isOpen={isOpen} shareStoryData={shareStoryData} ></SuccsessShareStoryDrawer>
                </VStack>
            </VStack>
            </VStack>
        )
    }else{
        return(
            <VStack bg="#26262E"  style={{backgroundImage: 'url(../images/noStoryFoundMarble.svg)', backgroundRepeat:'no-repeat', backgroundPosition:'center 0px'}}>
                    <VStack h={screenSize.height} justifyContent='space-between'>
                <HStack justifyContent='space-between' w='100%' pt='32px' px={3}>
                    <Link to={"/"}>
                       <Image src='../images/backIcon.svg'>

                       </Image>
                    </Link>
                    <Text color='white' fontSize='26px' fontFamily={'Merriweather'} fontWeight={700}> Growing Pains #{id}</Text>
                    <Box>
                        <Image src='../images/magniGlassIcON.svg'/>
                    </Box>
                </HStack>

               
               <VStack alignItems={'flex-start'} pb={5} bg='linear-gradient(180deg, rgba(38, 38, 46, 0) 0%, rgba(38, 38, 46, 0.3) 23.96%);'>

                    <Text color='#A9A9B1' fontFamily={'Roboto'} fontWeight={400} fontSize='16px'> Whoops, we ran into a problem </Text>
                    <Text color='white' fontFamily={'Roboto'} fontWeight={400} fontSize='16px' pb='16px'> This story doesn’t exist yet, or was deleted. You can go to the story gallery to see all of the stories, or check out some of them below.</Text>

                    <HStack justifyContent={'space-around'} w="100%" pb='32px'>
                        <StoryCircle imageSrc='../images/marbleSound.svg'></StoryCircle>
                        <StoryCircle imageSrc='../images/marbleSound.svg'></StoryCircle>
                        <StoryCircle imageSrc='../images/marbleSound.svg'></StoryCircle>
                    </HStack>
                    <Box w='100%' display={'flex'} justifyContent={'center'} alignItems={'flex=end'} position={'absolute'} bottom='16px'>
                         <Footer></Footer>
                    </Box>
                   
                </VStack>
               
            </VStack>
           
            </VStack>
        )
    }



}