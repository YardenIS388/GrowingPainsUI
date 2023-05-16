import {
    Box,
    Image,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    useDisclosure,
    HStack,
    Text,
    Input
} from '@chakra-ui/react'
import {useState, useEffect} from 'react'
import axios from 'axios'
import {motion} from 'framer-motion'
import StoryCircle from './StoryCircle'

export default function SearchButton() {
    const {isOpen, onOpen, onClose} = useDisclosure()
    const [storyData, setStoryData] = useState(null)
    const [searchResult, setSearchResult] = useState('')
    const [id, setId] = useState('#')

   
    const getStoryById = async() => {

        const getStoryByIdURI = `http://localhost:8000/stories/story/${id}`
        try {

            const fetchData = await axios.get(getStoryByIdURI)
            console.log(fetchData.data)
            setStoryData(fetchData.data)
        } catch (error) {
            setSearchResult('Sorry, something went wrong with the search')
            console.log(error)
        }
    }

    const handleClose = ()=> {
        setStoryData(null)
        setId('#')
        onClose()
    }

    return (
        <Box>
            <Image src='../images/magniGlassIcON.svg' onClick={onOpen} size='24px' ></Image>
            <Modal isOpen={isOpen} onClose={handleClose}>
                <ModalOverlay/>
                <ModalContent bg='#26262E' borderRadius='32px' mt={40} >
                    <ModalHeader>
                        <HStack w='100%' justifyContent={'space-between'}>
                                <Text color='white' fontFamily={'Merriweather'} fontSize='24px' > Search Story</Text>
                                <Image  size='24px' src='../images/closeShare.svg' onClick={handleClose}></Image>
                        </HStack>
                    </ModalHeader>
                    <ModalBody display={'flex'} flexDirection={'column'} alignItems={'center'} as={motion.div} layout>
                       {
                        storyData ? 
                        <StoryCircle imgSrc={'../images/marble1.svg'} story={storyData}></StoryCircle>
                        :
                        <Box borderWidth={2} w='150px' h='150px' borderRadius="100%" borderStyle={'dashed'} display={'flex'} justifyContent={'center'} alignItems={'center'}>
                           
                       </Box>
                       }

                      <HStack alignItems={'center'} mt={10}>
                         <Input
                            width='100px'
                            color='white'
                            fontFamily={'Merriweather'}
                            borderWidth='0px'
                            type={'number'}
                            borderRadius={'16px'}
                            bg="#303038"
                            value={id}
                            onChange={(e) => {setId(e.target.value)}}  >                            
                       </Input>
                        <Box borderRadius={'16px'} bg="#303038" h='40px' display={'flex'} alignItems={'center'} onClick={getStoryById}>
                            <Image src='../images/chevron-down.svg' transform={'rotate(270deg)'}></Image>
                        </Box>
                       
                      </HStack>
                      <Text color='white'>{searchResult}</Text>
                    </ModalBody>

                    <ModalFooter>
                      
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </Box>
    )
}