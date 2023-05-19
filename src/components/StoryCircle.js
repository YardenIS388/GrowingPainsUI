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

export default function StoryCircle({imageSrc, audio, story}) {
    const {isOpen, onOpen, onClose} = useDisclosure()

    return ( 
    <> 
    <Avatar as={motion.div}   
           layout
            src={imageSrc} 
            onClick={onOpen} 
            w='100%' 
            h="100%">
    </Avatar> 
    < Drawer autoFocus={false}
            isOpen = { isOpen }
            onClose = {onClose}
            placement = 'bottom' > 
            <DrawerOverlay backdropFilter={'blur(3px)'}/> 
            < DrawerContent 
                    bg = '#26262E' 
                    borderRadius = { '32px'}
                    mx = {'auto'}
                    mb = {'10px'}
                    w = "93%"
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
                <Image src='../images/marbleSound.svg' mx='auto'></Image>
                    <Text
                        color='#A9A9B1'
                        textAlign='left'
                        w='100%'
                        fontFamily={'Roboto'}
                        fontWeight={400}
                        fontSize={'16px'}>

                        Ages {story ? story.ageGroup : null}

                    </Text>
                    <VStack justifyContent={'space-between'} gap={'8px'}>

                        <Text color='white' fontFamily={'Roboto'} fontWeight={400} fontSize={'16px'}>
                            {story? story.content: null}
                        </Text>
                        <AudioPlayer storyData={story} audioFile={'../audio/audio-1.mp3'} isOpen={isOpen}></AudioPlayer>
                 </VStack>
            </VStack> </DrawerBody>

          <DrawerFooter>
                <HStack w='100%'>                        
                    <GoToWhatsapp id={story? story.storyId : null}></GoToWhatsapp>            
                    <ShareStory screenHeight={window.innerHeight}></ShareStory > 
                </HStack> 
            </DrawerFooter>
        </DrawerContent > 
    </Drawer> 
        
    </>
    )
    
}