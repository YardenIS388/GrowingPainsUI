import {
    Center,
    Text,
    VStack,
    HStack,
    Drawer,
    DrawerBody,
    DrawerFooter,
    DrawerHeader,
    DrawerOverlay,
    DrawerContent,
    useDisclosure,
    Circle,
    Textarea,
    Image,
    Spinner
} from '@chakra-ui/react'
import {motion} from 'framer-motion'
import {useState, useEffect} from 'react'
import axios from 'axios';
import GoToWhatsapp from './GoToWhatsapp';


export default function ShareStory({screenHeight, handleDrawerToggle}) {

    const {isOpen, onOpen, onClose} = useDisclosure()
    const [formSuccess , setFormSucess] = useState('initial')
    //const [formSuccess, setFormSucess] = useState('done')
    const [storyField, setStoryField] = useState("A moment when I understood out that my parents aren’t perfect was when")
    const [ageGroup, setAgeGroup] = useState([false, false, false, false])
    const [language, setLanguage] = useState([true, false, false, false])
    const [succsessStoryObj, setSuccsessStoryObj] = useState({})
    const [isLoasing , setIsLoading] = useState(false)
    const [mailToLink, setMailToLink] = useState('mailto:delete@growingpains.me?subject=Take down story ')


    const rootURL = process.env.REACT_APP_ROOTURL
    console.log(rootURL)
    const createNewStory = async(newStory) => {
        console.log(rootURL)
        try {
            const response = await axios.post(rootURL, newStory);
            const storyObject = await axios.get(`${rootURL}/object/${response.data._id}`)
            return storyObject.data;

        } catch (error) {

            console.log('Error creating new story:', error);
            throw error
        }
    };

    async function handleSubmit(e) {
        // Prevent the browser from reloading the page

        e.preventDefault();
        setIsLoading(true)
        let selectedAgeGroup = ""
        let selectedLanguage = ''

        if (ageGroup[0] === true) {
            selectedAgeGroup = '0-12'
        }
        if (ageGroup[1] === true) {
            selectedAgeGroup = '13-19'
        }
        if (ageGroup[2] === true) {
            selectedAgeGroup = '20-29'
        }
        if (ageGroup[3] === true) {
            selectedAgeGroup = '30+'
        }

        if (language[0] === true) {
            selectedLanguage  = 'English'
        }
        if (language[1] === true) {
            selectedLanguage  = 'Hebrew'
        }
        if (language[2] === true) {
            selectedLanguage  = 'Spanish'
        }
        if (language[3] === true) {
            selectedLanguage  = 'Other'
        }

        console.log("click")
        const newStory = {
            content: storyField,
            ageGroup: selectedAgeGroup,
            language: selectedLanguage,
            art: 'http://example.com/image.jpg'
        };

        console.log({...newStory})

        try {
            const data = await createNewStory(newStory);
            console.log('New story created:', data);
            setSuccsessStoryObj(data)
            setFormSucess('done')
            setIsLoading(false)
            setMailToLink(`mailto:delete@growingpains.me?subject=Take down story #${data._id} `)

        } catch (error) {
            console.log('Error creating new story:', error);
            setIsLoading(false)
        }

    }

    const handleDrawerClose = () => {
        setFormSucess('initial')
        onClose()
    }

    const handleShare = ()=> {
        handleDrawerToggle(succsessStoryObj)
        console.log("share")
    }
    const handleTakeDown = ()=> {
        console.log("Take this down please")
    }

 

useEffect(() => {
     const audioElements = document.getElementsByClassName('audio');
     console.log('audio files: ', audioElements)

  }, []);


    return (

        <VStack h={screenHeight * 0.07} w='100%' gap="2px">
            <Center bg={'white'} borderRadius='16px' h='100%' w="100%" onClick={onOpen} boxShadow={'0px 4px 60px rgba(255, 255, 255 , 0.2)'}>
               <Text fontFamily={'Merriweather'} fontSize='18px' fontWeight={700}> Tell your story </Text> 
            </Center>
            <Drawer autoFocus={false} placement='bottom' onClose={handleDrawerClose} isOpen={isOpen} h={screenHeight * 0.8} >
                <DrawerOverlay backdropFilter={'blur(2px)'} /> {formSuccess === 'done'
                    ? <DrawerContent borderRadius='32px' bg='#26262E'  w='93%' mx='auto' h='80%' mb='10px'>
                            <DrawerHeader
                                display='flex'
                                justifyContent='space-between'
                                borderWidth='0px'
                                py='24px'>
                                <Text color='white' fontFamily={'Merriweather'} fontWeight={700} fontSize={'18px'}>
                                    Growing Pains # {succsessStoryObj
                                        ? succsessStoryObj.storyId
                                        : null}
                                </Text>
                                <Image src='../images/closeShare.svg' onClick={onClose}></Image>
                            </DrawerHeader>
                            <DrawerBody display='flex' flexDirection='column' justifyContent={'space-between'} alignItems='center' gap={3} p='0px'>
                                <HStack bg='#303038'  w='100%' py={5} gap={1} ps={5}>
                                    <Image src='../images/littleWhiteHeart.svg'></Image>
                                    <Text color='#A9A9B1' fontFamily={'Roboto'} fontWeight={400} fontSize='16px'>
                                        Thank you for sharing your story!</Text>
                                </HStack>
                                <Circle
                                    size='220px'
                                    >

                                        <Image 
                                            w='100%' 
                                            h='100%' 
                                            src={ `../images/marbles/marble-L-${succsessStoryObj && succsessStoryObj.storyId}.svg`}
                                            onError={(e) => {
                                                e.target.onerror = null
                                                e.target.src = '../images/marbles/marble-L-12.svg'
                                              }}>
                                        
                                        </Image>
                                    </Circle>
                                <VStack w="100%" alignItems='start' px='24px'>
                                    <Text color='#A9A9B1' fontFamily={'Roboto'} fontWeight={400} fontSize={'16px'}>Ages {succsessStoryObj
                                        ? succsessStoryObj.ageGroup
                                        : null}</Text>
                                    <Text color='white' fontFamily={'Roboto'} fontWeight={400} fontSize={'16px'}>
                                        {succsessStoryObj
                                        ? succsessStoryObj.content
                                        : null}
                                    </Text>
                                </VStack>
                            </DrawerBody>
                            <DrawerFooter display='flex' flexDirection='column' alignItems='flex-start' px='24px'>
                                <HStack w="100%">
                                   <GoToWhatsapp id={succsessStoryObj.storyId} screenHeight={screenHeight}></GoToWhatsapp>
                                    <Center bg='#303038' borderRadius='16px' h={screenHeight*0.07} w="80%" onClick={handleTakeDown}>
                                        <a href= {mailToLink}>
                                        <Text color='#A9A9B1' fontFamily={'Roboto'} fontWeight={400} fontSize={'16px'}> 
                                            I want to take this down
                                        </Text>
                                        </a>
                                    </Center>
                                </HStack>
                            </DrawerFooter>
                        </DrawerContent>
                    : <DrawerContent borderRadius='32px' w='93%' mx='auto' mb='10px'>
                        <DrawerHeader
                            display='flex'
                            pt='24px'
                            pb='8px'
                            alignItems={'flex-end'}
                            justifyContent='space-between'
                            borderWidth='0px'>
                            <Text fontFamily={'Merriweather'} fontSize={'18px'} fontWeight={700}>
                                Tell your story
                            </Text>
                            <Circle size='24px' onClick={onClose}>
                                <Image src='../images/blackCloseButton.svg'></Image>
                            </Circle>
                        </DrawerHeader>
                        <DrawerBody display='flex' flexDirection='column' gap={3}>
                            <HStack
                                fontFamily={'Roboto'}
                                fontSize={'16px'}
                                fontWeight={500}
                                as={motion.div}
                                w='100%'
                                p={1}
                                bg='#F6F5F8'
                                borderRadius='16px'
                                justifyContent={'space-between'}
                               
                                >
                                <Center
                                    as={motion.div}
                                    boxShadow={language[0] ? '0px 3px 7px rgba(25 , 25 , 31 , 0.16)' : null}
                                    h='40px'
                                    px={language[0]  ? 4 : 2}
                                    borderRadius='12px'
                                    color={language[0]
                                    ? 'white'
                                    : 'black'}
                                    bg={language[0]
                                    ? '#303038'
                                    : null}
                                    onClick={() => setLanguage([true, false, false, false])}>English</Center>
                                <Center
                                    as={motion.div}
                                    fontWeight={600}
                                    boxShadow={language[1] ? '0px 3px 7px rgba(25 , 25 , 31 , 0.16)' : null}
                                    h='40px'
                                    px={language[1]  ? 4 : 1}                                 
                                    borderRadius='12px'
                                    color={language[1]
                                    ? 'white'
                                    : 'black'}
                                    bg={language[1]
                                    ? '#303038'
                                    : null}
                                    onClick={() => setLanguage([false, true, false, false])}>עברית</Center>
                                <Center
                                    as={motion.div}
                                    boxShadow={language[2] ? '0px 3px 7px rgba(25 , 25 , 31 , 0.16)' : null}
                                    h='40px'
                                    px={ language[2] ? 4 : 1}
                                    borderRadius='12px'
                                    color={language[2] ? 'white': 'black'}
                                    bg={language[2]? '#303038': null}
                                    onClick={() => setLanguage([false, false, true, false])}>Español</Center>
                                <Center
                                    as={motion.div}
                                    h='40px'
                                    boxShadow={language[3] ? '0px 3px 7px rgba(25 , 25 , 31 , 0.16)' : null}
                                    px={language[3]  ? 4 : 2}
                                    borderRadius='12px'
                                    color={language[3]
                                    ? 'white'
                                    : 'black'}
                                    bg={language[3]
                                    ? '#303038'
                                    : null}
                                    onClick={() => setLanguage([false, false, false, true])}>Other</Center>
                            </HStack>
                            <Text fontFamily={'Roboto'} fontSize={'16px'} fontWeight={400} color='#303038'>
                                Imagine you’re writing to a close friend about a time when you realized your
                                parents aren’t perfect, that they’re just regular people like everyone else.
                            </Text>
                            <Textarea
                                bg="#F6F5F8"
                                position='relative'
                                h='147px'
                                borderRadius={'16px'}
                                color='#080808'
                                fontFamily={'Roboto'}
                                fontWeight={400}
                                fontSize={'16px'}
                                placeholder='A moment when I understood out that my parents aren’t perfect was when...'
                                value={storyField}
                                
                                onChange={(e) => {
                                setStoryField(e.target.value) 
                                if (formSuccess === 'initial') {
                                    setFormSucess('changed')
                                }
                            }}>
                                
                            </Textarea>
                            <Text textAlign='right' fontSize='14px' color='#A9A9B1' position='relative' zIndex={100} bottom={6} right={7} m='-14px'>{storyField.length}/250</Text>
                            <Text fontFamily={'Roboto'} fontSize={'16px'} fontWeight={400} color='#303038'>
                                How old were you when this happend?
                            </Text>
                            <HStack
                                as={motion.div}
                                fontFamily={'Roboto'}
                                fontSize={'16px'}
                                fontWeight={500}
                                w='100%'
                                justifyContent='space-around'
                                px={1}
                                bg='#F6F5F8'
                                borderRadius='16px'>
                                <Center
                                    as={motion.div}
                                    layout
                                    h='40px'
                                    w='80px'
                                    my={1}
                                    borderRadius='12px'
                                    boxShadow={ageGroup[0] ? '0px 3px 7px rgba(25 , 25 , 31 , 0.16)' : null}
                                    color={ageGroup[0]
                                    ? 'white'
                                    : 'black'}
                                    bg={ageGroup[0]
                                    ? '#303038'
                                    : null}
                                    onClick={() => setAgeGroup([true, false, false, false])}>0-12</Center>
                                <Center
                                    as={motion.div}
                                    layout
                                    h='40px'
                                    w='80px'
                                    m={1}
                                    boxShadow={ageGroup[1] ? '0px 3px 7px rgba(25 , 25 , 31 , 0.16)' : null}
                                    borderRadius='12px'
                                    color={ageGroup[1]
                                    ? 'white'
                                    : 'black'}
                                    bg={ageGroup[1]
                                    ? '#303038'
                                    : null}
                                    onClick={() => setAgeGroup([false, true, false, false])}>13-19</Center>
                                <Center
                                    as={motion.div}
                                    layout
                                    h='40px'
                                    w='80px'
                                    m={1}
                                    boxShadow={ageGroup[2] ? '0px 3px 7px rgba(25 , 25 , 31 , 0.16)' : null}
                                    borderRadius='12px'
                                    color={ageGroup[2]
                                    ? 'white'
                                    : 'black'}
                                    bg={ageGroup[2]
                                    ? '#303038'
                                    : null}
                                    onClick={() => setAgeGroup([false, false, true, false])}>20-29</Center>
                                <Center
                                    as={motion.div}
                                    layout
                                    h='40px'
                                    w='80px'
                                    m={1}
                                    boxShadow={ageGroup[3] ? '0px 3px 7px rgba(25 , 25 , 31 , 0.16)' : null}
                                    borderRadius='12px'
                                    color={ageGroup[3]
                                    ? 'white'
                                    : 'black'}
                                    bg={ageGroup[3]
                                    ? '#303038'
                                    : null}
                                    onClick={() => setAgeGroup([false, false, false, true])}>30+</Center>
                            </HStack>
                            <Text mb={1} fontFamily={'Roboto'} fontSize={'14px'} fontWeight={400} color='#8A8A92'>
                                Sharing your story is completely anonymous, for it to remain that way don’t
                                write things that people could link back to you.
                            </Text>
                        </DrawerBody>
                        <DrawerFooter>
                            <Center
                                bg='black'
                                color="white"
                                borderRadius='16px'
                                h='59px'
                                w="100%"
                                boxShadow={'0px 4px 60px rgba(0, 0, 0, 0.2)'}
                                onClick={(e) => handleSubmit(e)}
                                opacity={formSuccess === 'initial'               
                                ? 0.5
                                : 1}>
                                <Text fontFamily={'Merriweather'} fontWeight={700} fontSize={'18px'}> 
                                        Share anonymously

                                        { isLoasing  && <Spinner/> }                                        
                                </Text>
                            </Center>
                        </DrawerFooter>
                    </DrawerContent>}

            </Drawer>
        </VStack>

    )
}
