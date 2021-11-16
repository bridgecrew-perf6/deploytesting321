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
} from "@chakra-ui/react";
import { useState } from "react";
import { saveImgtoCloud } from "_components/apis/imgUpload";
import { useMutation } from "@apollo/client";
import ImgPicker from "_components/pageComponents/Other/Image/ImgPicker";
import GraphResolvers from "../../../../lib/apollo/apiGraphStrings";
import { updateAnswer } from "lib/apollo/apolloFunctions/mutations";

export const EditAnsModal = ({ isEditOpen, onEditClose, ansData }: any) => {
  const [selectedImgs, setSelectImgs] = useState<any>([]);
  const { UPDATE_ANSWER } = GraphResolvers.mutations;
  const [editAnswer, { error }] = useMutation(UPDATE_ANSWER);

  const updateAnsHandler = async (e: any) => {
    e.preventDefault();
    let updatedAns = e.target.ansTextarea.value;

    let editA = {
      _id: ansData._id,
      answer: updatedAns,
    };

    console.log("editA", editA);
    updateAnswer(editAnswer, JSON.stringify(editA));
    if (error) {
      console.log("update_error", error);
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
                />
              </Box>
            </Box>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onEditClose} size="sm">
              Cancel
            </Button>
            <Button
              bg="poldit.100"
              color="white"
              borderColor="poldit.100"
              borderWidth="1px"
              size="sm"
              _hover={{ color: "poldit.100", bg: "white" }}
              _focus={{ outline: "none", bg: "white" }}
              _active={{ color: "poldit.100", bg: "white" }}
              type="submit"
            >
              Update
            </Button>
          </ModalFooter>
        </form>
      </ModalContent>
    </Modal>
  );
};
