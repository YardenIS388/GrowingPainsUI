import {Circle, Text, HStack} from '@chakra-ui/react'
import SearchButton from './SearchButton'
export default function Header({screenHeight}){
   
    return(
   <HStack h={screenHeight*0.09} w='100%' color="white" justifyContent='space-between' alignItems={'flex-end'} pb={'8px'}>
       <HStack justifyContent={'space-between'} w="100%">
            <Text fontFamily={'Merriweather'} fontSize={'26px'} fontWeight={700}>
                Growing Pains
            </Text>
            <Circle size='24px'>
                <SearchButton></SearchButton>
            
            </Circle>
       </HStack>
   </HStack>
    )
    
}