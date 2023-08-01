import {Box, Text,VStack, HStack, Image,Circle, useDisclosure, Center} from '@chakra-ui/react'
import {useParams} from 'react-router-dom'
import axios from 'axios'
import {Link} from 'react-router-dom'
import ShareStory from '../components/ShareStory'
import SuccsessShareStoryDrawer from '../components/SuccsessShareStoryDrawer'
import AudioPlayer from '../components/AudioPlayer'
import StoryCircle from '../components/StoryCircle'
import SearchButton from '../components/SearchButton'
import GoToWhatsapp from '../components/GoToWhatsapp'
import { StoryContext } from "../contexts/StoriesContext";
import {useContext, useState, useEffect} from "react";

export default function StoryPage(){

    const [screenSize,setScreenSize] = useState({width: window.innerWidth, height: window.innerHeight});
    const [storyData, setStoryData] = useState(null)
    const [isPlaying, setIsPlaying]= useState(false)
    const [shareStoryData, setShareStoryData]=useState({})
    const { isOpen, onOpen, onClose } = useDisclosure()
    const storyList = useContext(StoryContext)

    const maxWidth = '700px'

    const {id} = useParams()

        const rootURL = process.env.REACT_APP_ROOTURL
        const getStoryByIdURI = `${rootURL}/story/${id}`

       
   

    const getCurrentDimension = () => {
        return {width: window.innerWidth, height: window.innerHeight}
    }
    const openShareDrawer = (storyObj) => {
        setShareStoryData(storyObj)
        onOpen()    
   }

 

    useEffect(() => {
        const getStoryById = async() => {
            try {
    
                const fetchData = await axios.get(getStoryByIdURI)
             
                setStoryData(fetchData.data)
            } catch (error) {
                console.log(error)
            }
        }
        getStoryById()
        const updateDimension = () => {
            setScreenSize(getCurrentDimension())
          }
          window.addEventListener('resize', updateDimension);
        return () => {

            window.removeEventListener('resize', updateDimension);
      
        }
    }, [])

    if(storyData){
        return(
            <VStack maxWidth={maxWidth} mx="auto"  bg="#080808"  style={{backgroundImage: `url(../images/marbles/marble-XL-${storyData.storyId}.svg)`, backgroundRepeat:'no-repeat', backgroundPosition:'center 0px'}}>
                    <VStack h={screenSize.height} justifyContent='space-between' w='100%'>
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

               
               <VStack pb={5} gap={storyData.hasOwnProperty('audioFIleName') ? 5 : 0} bg='linear-gradient(180deg, rgba(38, 38, 46, 0) 0%, rgba(38, 38, 46, 0.3) 23.96%);' w='100%'>

                <VStack color='white' w="100%" alignItems='flex-start' px='40px'>
                    <Text color='#A9A9B1' fontFamily={'Roboto'} fontWeight={400} fontSize='16px'> Ages {storyData.ageGroup}</Text>
                    <Text fontFamily={'Roboto'} fontWeight={400} fontSize='16px' pb='16px'> {storyData.content}</Text>
                   {storyData.hasOwnProperty('audioFIleName') && <AudioPlayer storyData={storyData} audioFile={"../audio/"+storyData.audioFIleName}>

                    </AudioPlayer>}
                </VStack>


                <HStack w='100%' px='40px'>

                    <GoToWhatsapp id={id} screenHeight={screenSize.height}></GoToWhatsapp>                  
                    <ShareStory screenHeight={screenSize.height} handleDrawerToggle={openShareDrawer}/>
                </HStack>
                
                <SuccsessShareStoryDrawer onClose={onClose} isOpen={isOpen} shareStoryData={shareStoryData} ></SuccsessShareStoryDrawer>
                </VStack>
            </VStack>
            </VStack>
        )
    }else{
        return(
            <VStack maxWidth={maxWidth} mx="auto"  bg="#080808"  style={{backgroundImage: 'url(../images/noStoryFoundMarble.svg)', backgroundRepeat:'no-repeat', backgroundPosition:'center 0px'}}>
                    <VStack h={screenSize.height} justifyContent='space-between'>
                <HStack justifyContent='space-between' w='100%' pt='32px' px={3}>
                    <Link to={"/"}>
                       <Image src='../images/backIcon.svg'>

                       </Image>
                    </Link>
                    <Text color='white' fontSize='26px' fontFamily={'Merriweather'} fontWeight={700}> Growing Pains #{id}</Text>
                    <SearchButton></SearchButton>
                </HStack>

               
               <VStack px='16px' alignItems={'flex-start'} pb={5} bg='linear-gradient(180deg, rgba(38, 38, 46, 0) 0%, rgba(38, 38, 46, 0.3) 23.96%);'>

                    <Text  color='#A9A9B1' fontFamily={'Roboto'} fontWeight={400} fontSize='16px'> Whoops, we ran into a problem </Text>
                    <Text  color='white' fontFamily={'Roboto'} fontWeight={400} fontSize='16px' pb='16px'> This story doesn’t exist yet, or was deleted. You can go to the story gallery to see all of the stories, or check out some of them below.</Text>

                    <HStack justifyContent={'space-around'} w="100%" pb='32px'>
                       {
                         storyList.length > 0 && storyList.slice(0,3).map((story => {
                            if(story.hasOwnProperty("audioFIleName")){ 
                             return(
                                <Box key={(story.storyId)} h="90px" w="90px">
                                    <StoryCircle imageSrc={`../images/marbles/marble-s-${story.storyId}.svg`} story={story}> </StoryCircle>
                                </Box>
                            )}
                        }))
                       }
                    </HStack>
                  
                   
                </VStack>
               
            </VStack>
           
            </VStack>
        )
    }



}