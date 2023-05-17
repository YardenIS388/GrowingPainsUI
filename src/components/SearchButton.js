import {
    Box,
    Image,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    useDisclosure,
    HStack,
    Text,
    Input,
    Center
} from '@chakra-ui/react'
import { StoryContext } from '../contexts/StoriesContext'
import {useState, useContext} from 'react'
import {motion} from 'framer-motion'

import {Link} from 'react-router-dom'

export default function SearchButton() {
    const {isOpen, onOpen, onClose} = useDisclosure()
    const [storyData, setStoryData] = useState(null)
    const [searchResult, setSearchResult] = useState('Type in the number of the story you’re looking for')
    const [id, setId] = useState('')

    const stories = useContext(StoryContext)

   
    const getStoryById = async() => {
   
            const story = stories.find(current => current.storyId === id)
            setStoryData(story)
            if(story){
                console.log({...story})
                setSearchResult(`Found story #${story.storyId}`)
            }else{
                setSearchResult('Sorry, there does not seem to be a story with that number yet')
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
                <ModalContent bg='#26262E' borderRadius='32px' mt={40} mx={'16px'} >
                    <ModalHeader>
                        <HStack w='100%' justifyContent={'space-between'}>
                                <Text color='white' fontFamily={'Merriweather'} fontSize='24px' > Search a story</Text>
                                <Image  size='24px' src='../images/closeShare.svg' onClick={handleClose}></Image>
                        </HStack>
                    </ModalHeader>
                    <ModalBody display={'flex'} flexDirection={'column'} alignItems={'center'} as={motion.div} mb={3} layout>
                       {
                        storyData ? 
                        <Box  w='150px' h='150px'>
                            <Link to={`/stories/${storyData.storyId}`}>
                                <Image src='../images/marble.svg'></Image>
                            </Link>
                        </Box>
                        
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
                            type={'text'}
                            pattern="\d*"
                            borderRadius={'16px'}
                            bg="#303038"
                            textAlign={"center"}
                            value={id}
                            onChange={(e) => {setId(e.target.value)}} 
                             >                            
                       </Input>
                        <Box borderRadius={'16px'} bg="#303038" h='40px' w="50px" display={'flex'} alignItems={'center'} justifyContent={"center"} onClick={getStoryById}>
                            <Image src='../images/chevron-down.svg' transform={'rotate(270deg)'}></Image>
                        </Box>
                       
                      </HStack>
                      <Text color='#8A8A92' fontFamily={'Roboto'} fontSize='14px' mt={4}>{searchResult}</Text>
                    </ModalBody>
                </ModalContent>
            </Modal>
        </Box>
    )
}