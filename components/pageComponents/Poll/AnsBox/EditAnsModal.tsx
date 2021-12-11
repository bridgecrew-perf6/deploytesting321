import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  Button,
  Textarea,
  Box,
  useToast,
  Flex,
  Image,
  IconButton,
} from "@chakra-ui/react";
import { useState } from "react";
import { saveImgtoCloud } from "_components/apis/imgUpload";
import { useMutation } from "@apollo/client";
import ImgPicker from "_components/pageComponents/Other/Image/ImgPicker";
import GraphResolvers from "../../../../lib/apollo/apiGraphStrings";
import { updateAnswer } from "lib/apollo/apolloFunctions/mutations";
import dynamic from "next/dynamic";
import { Answer } from "_components/appTypes/appType";
import { AiOutlineClose } from "react-icons/ai";

const BtnImage = dynamic(
  () => {
    return import("./ImageModal");
  },
  { ssr: false }
);

interface EditAnsModal {
  isEditOpen: boolean;
  onEditClose: () => void;
  ansData: Answer;
  pollId: string;
}

export const EditAnsModal = ({
  isEditOpen,
  onEditClose,
  ansData,
  pollId,
}: EditAnsModal) => {
  const toast = useToast();
  const [selectedImgs, setSelectImgs] = useState<any>([]);
  const [showImg, toggleShowImg] = useState(true);
  const { UPDATE_ANSWER } = GraphResolvers.mutations;
  const [editAnswer, { loading: editAnswerLoading }] =
    useMutation(UPDATE_ANSWER);

  const updateAnsHandler = async (e: any) => {
    e.preventDefault();
    let updatedAns = e.target.ansTextarea.value;
    const imgIds: string[] | undefined = await saveImgtoCloud(selectedImgs);

    let editA = {
      _id: ansData._id,
      answer: updatedAns,
      answerImage: imgIds ? imgIds[0] : "",
      poll: pollId,
    };

    try {
      await updateAnswer(editAnswer, JSON.stringify(editA));
      toast({
        title: "Answer updated successfully",
        status: "success",
        isClosable: true,
        duration: 3000,
      });
      onEditClose();
    } catch (err: any) {
      if (
        err.message ===
        "Content contains inappropriate language.  Please update and resubmit."
      ) {
        toast({
          title:
            "Content contains inappropriate language.  Please update and resubmit.",
          status: "error",
          isClosable: true,
          duration: 3000,
        });
        return;
      }
      toast({
        title: "Error! Cannot update Answer",
        status: "error",
        isClosable: true,
        duration: 3000,
      });
    }
  };
  return (
    <Modal isOpen={isEditOpen} onClose={onEditClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Edit Answer</ModalHeader>
        <form onSubmit={updateAnsHandler}>
          <ModalBody>
            <Box>
              <Textarea
                defaultValue={ansData?.answer}
                name="ansTextarea"
                _focus={{ borderColor: "poldit.100" }}
              />
              {/* Imageg picker*/}
              <Box mt="4">
                <ImgPicker
                  selectedImgs={selectedImgs}
                  selectImgs={setSelectImgs}
                  imageLimit={1}
                />
              </Box>

              {showImg && (
                <Flex
                  mr="4"
                  position="relative"
                  h="100px"
                  w="100px"
                  align="center"
                  justify="center"
                  borderWidth="1px"
                  borderColor="gray.300"
                >
                  <Image src={ansData.answerImage} w="100%" />
                  <IconButton
                    aria-label="del-images"
                    color="red.400"
                    icon={<AiOutlineClose size="15" />}
                    size="xs"
                    position="absolute"
                    top="0"
                    right="0"
                    bg="gray.600"
                    onClick={() => {
                      toggleShowImg(false);
                      setSelectImgs([]);
                    }}
                    _focus={{ outline: "none" }}
                    _hover={{ bg: "gray.600" }}
                    _active={{ bg: "gray.500" }}
                  />
                </Flex>
              )}
            </Box>
          </ModalBody>

          <ModalFooter>
            <Button
              colorScheme="blue"
              mr={3}
              onClick={() => {
                ansData.answerImage && toggleShowImg(true);
                onEditClose();
              }}
              size="sm"
            >
              Cancel
            </Button>
            <Button
              bg="poldit.100"
              color="white"
              borderColor="poldit.100"
              borderWidth="1px"
              size="sm"
              _hover={{ color: "poldit.100", bg: "white" }}
              _focus={{ outline: "none", bg: "white", color: "poldit.100" }}
              _active={{ color: "poldit.100", bg: "white" }}
              type="submit"
              isLoading={editAnswerLoading}
            >
              Update
            </Button>
          </ModalFooter>
        </form>
      </ModalContent>
    </Modal>
  );
};
