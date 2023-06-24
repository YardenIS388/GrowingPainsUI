import {Center, Image} from '@chakra-ui/react'
export default function GoToWhatsapp  ({id, screenHeight}) {

      const hrefToStory = `whatsapp://send?text= I think you would like this story- https://www.growingpains.me/stories/${id}`

    return (
        <a href={hrefToStory} data-action="share/whatsapp/share"  target="_blank">
                <Center boxSize='60px' bg='rgba(255, 255, 255 , 0.05)' borderRadius='16px' h={screenHeight * 0.07} w={screenHeight * 0.07}>
                <Image src='../images/shareIcon.svg'></Image>
        </Center>
        </a>
        
    )

}