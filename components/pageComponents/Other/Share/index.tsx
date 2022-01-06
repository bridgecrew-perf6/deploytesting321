import {
  Flex,
  PopoverArrow,
  PopoverBody,
  PopoverContent,
  Portal,
} from "@chakra-ui/react";
import {
  FacebookIcon,
  FacebookShareButton,
  LinkedinIcon,
  LinkedinShareButton,
  TwitterIcon,
  TwitterShareButton,
} from "react-share";

const ShareBtns = () => {
  return (
    <Portal>
      <PopoverContent _focus={{ outline: "none" }} w="100%" borderRadius="lg">
        <PopoverArrow />
        <PopoverBody>
          <Flex justify="flex-start" align="center" px="4" py="2">
            <FacebookShareButton url="https://chakra-ui.com" disabled>
              <FacebookIcon round={true} size="24px" />
            </FacebookShareButton>
            <Flex mx="4">
              <TwitterShareButton url="https://chakra-ui.com" disabled>
                <TwitterIcon round={true} size="24px" />
              </TwitterShareButton>
            </Flex>
            <LinkedinShareButton url="https://chakra-ui.com" disabled>
              <LinkedinIcon round={true} size="24px" />
            </LinkedinShareButton>
          </Flex>
        </PopoverBody>
      </PopoverContent>
    </Portal>
  );
};

export default ShareBtns;
