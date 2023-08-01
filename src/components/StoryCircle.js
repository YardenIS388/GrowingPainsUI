import {
    Avatar,
    Drawer,
    DrawerBody,
    DrawerFooter,
    DrawerHeader,
    DrawerOverlay,
    DrawerContent,
    useDisclosure,
    Box,
    Image,
    Text,
    HStack,
    VStack
} from '@chakra-ui/react'
import {motion} from 'framer-motion'
import ShareStory from '../components/ShareStory'
import AudioPlayer from './AudioPlayer'
import GoToWhatsapp from './GoToWhatsapp'
import {useState, useEffect} from 'react'

export default function StoryCircle({imageSrc, audio, story}) {
    const {isOpen, onOpen, onClose} = useDisclosure()
    const [audioPlayerSignal , setAudioPlayerSignal] = useState(false)

    const audioPlayerStop = ()=> {
        setAudioPlayerSignal(true)
    }
    const audioPlayerStart = ()=> {
        setAudioPlayerSignal(true)
    }

    useEffect(()=> {

        if(isOpen){
            setAudioPlayerSignal(true)
        }

    },[audioPlayerSignal])
    
    return ( 
    <> 
    <Box  borderRadius={100} w='100%' h='100%' display={'flex'} justifyContent={'center'} alignItems={'center'}>
    <img    
            src={imageSrc} 
            onError={(e) => {
             
                e.target.onerror = null
                e.target.src = '../images/marbles/marble-xs-34.svg'
              }}
            alt={`Story  #${story &&  story.storyId }`}
            onClick={onOpen}
            
           >
    </img> 
    </Box>
    < Drawer autoFocus={false}
            isOpen = { isOpen }
            onClose = {onClose}
            placement = 'bottom' 
            maxW={"500px"}> 
            <DrawerOverlay backdropFilter={'blur(3px)'}/> 
            < DrawerContent 
                    bg = '#26262E' 
                    borderRadius = { '32px'}
                    mx = {'auto'}
                    mb = {'10px'}
                    w = "93%"
                    maxW={"500px"}
                    > 
        <DrawerHeader display='flex' justifyContent={'space-between'} py='24px'>
            <Text color='white' fontFamily={'Merriweather'} fontWeight={700}>
                Growing Pains #{story? story.storyId : null}
            </Text>
            <Box onClick={onClose}>
                <Image src='../images/closeShare.svg'></Image>
            </Box>
        </DrawerHeader> 
        < DrawerBody > 
             <VStack justifyContent={'space-between'} gap={'0px'}>
                <Image src={`../images/marbles/marble-L-${story && story.storyId}.svg`} mx='auto'  onError={(e) => {
                e.target.onerror = null
                e.target.src = '../images/marbles/marble-L-12.svg'
              }}></Image>
                    <Text
                        color='#A9A9B1'
                        textAlign='left'
                        w='100%'
                        fontFamily={'Roboto'}
                        fontWeight={400}
                        fontSize={'16px'}>

                        Ages {story ? story.ageGroup : null}

                    </Text>
                    <VStack gap={'8px'}>

                        <Text color='white' w={'100%'} fontFamily={'Roboto'} textAlign='left' fontWeight={400} fontSize={'16px'}>
                            {story? story.content: null}
                        </Text>
                        { story && story.hasOwnProperty('audioFIleName') && <AudioPlayer cutAudioSignal={audioPlayerSignal} storyData={story} audioFile={`../audio/${story.audioFIleName}`} isOpen={isOpen}></AudioPlayer>}
                 </VStack>
            </VStack> </DrawerBody>

          <DrawerFooter>
                <HStack w='100%'>                        
                    <GoToWhatsapp id={story? story.storyId : null} screenHeight={window.innerHeight}></GoToWhatsapp>            
                    <ShareStory audioPlayerStop={audioPlayerStop} screenHeight={window.innerHeight}></ShareStory > 
                </HStack> 
            </DrawerFooter>
        </DrawerContent > 
    </Drawer> 
        
    </>
    )
    
}