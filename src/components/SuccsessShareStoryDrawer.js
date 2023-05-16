import {
    VStack,
    Center,
    Text,
    Drawer,
    Box,
    HStack,
    Image,
    DrawerBody,
    DrawerFooter,
    DrawerHeader,
    DrawerOverlay,
    DrawerContent,
    DrawerCloseButton,
    useDisclosure
} from '@chakra-ui/react'

export default function SuccsessShareStoryDrawer({onClose , isOpen, shareStoryData}) {

    return (
        <Drawer
        isOpen={isOpen}
        placement='bottom'
        onClose={onClose}
        
       
      >
        <DrawerOverlay bg='rgba(0, 0, 0, 0.7)' filter='auto' blur='10px'  />
        <DrawerContent borderRadius='32px' bg='rgba(0, 0, 0, 0.8)' p={0} >
         
          <DrawerBody display='flex' flexDirection='column' gap={3} w='100%' filter='auto' backdropBlur='10px'   style={{padding:'16px'}} >
            <VStack  borderRadius='32px' p={3} gap={2} style={{background:'url("../images/story-share-card bg.svg")'}} borderColor='#67686D' borderWidth='5px'>
            <HStack justifyContent='space-between'  w='100%' h='60px' px={5} borderRadius='16px' style={{background:'url("../images/share-card-title-bg.svg'}} borderColor='#515159' borderWidth='0.5px' boxShadow='0px 4px 52px rgba(0, 0, 0, 0.25)'>     
                    <Text color='white'> Growing Pains #{shareStoryData.storyId}</Text>
                    <Text color='#A9A9B1'>Ages {shareStoryData.ageGroup}</Text>
            </HStack>
                <Image src='../images/conffetti/02.svg' boxSize='220px' mx='auto'/>
                <Text color='white'>
                   {shareStoryData.content}
                </Text>
                <Text color='#62626A'> growingpains.me/{shareStoryData.storyId}</Text>
            </VStack>
            <HStack w='100%' bg='#26262E' p={5} borderRadius='32px' justifyContent='space-between'>
                <Center bg='white' borderRadius='16px' h='59px' w='60px'>
                      <Image src='../images/blackShare.svg'/>
                </Center>
                <Center bg='#32BA3D' borderRadius='16px' h='59px' w='60px'>
                      <Image src='../images/whatsapp.svg'/>
                </Center>
                <Center bg='#D63057' borderRadius='16px' h='59px' w='60px'>
                      <Image src='../images/instagram.svg'/>
                </Center>
                <Center bg='#303038' borderRadius='16px' h='59px' w='60px' onClick={onClose}>
                      <Image src='../images/closeShare.svg'/>
                </Center>
            </HStack>

           
          </DrawerBody>           
        </DrawerContent>
      
            </Drawer>
    )
}
