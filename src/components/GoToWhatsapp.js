import {Center, Image} from '@chakra-ui/react'
export default function GoToWhatsapp  ({id}) {

    const copy = async () => {

        console.log('copy')
        // const text = `https://growingpains.me/story/${id}`
        // await navigator.clipboard.writeText(text);
        // alert('Text copied');
      }

      const hrefToStory = `whatsapp://send?text= I think you would like this story- https://www.growingpains.me/stories/${id}`

    return (
        <a href={hrefToStory} data-action="share/whatsapp/share"  target="_blank">
                <Center boxSize='60px' bg='#303038' borderRadius='16px'>
                <Image src='../images/shareIcon.svg'></Image>
        </Center>
        </a>
        
    )

}