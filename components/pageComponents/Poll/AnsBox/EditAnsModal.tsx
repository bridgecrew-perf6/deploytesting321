import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  Button,
  Textarea,
  Input,
  Box,
  IconButton,
} from "@chakra-ui/react";
import { AiOutlineCamera } from "react-icons/ai";

export const EditAnsModal = ({ isEditOpen, onEditClose, ansData }: any) => {
  const updateAnsHandler = (e: any) => {
    e.preventDefault();
    let updatedAns = e.target.ansTextarea.value;
    console.log("updatedAnswer", updatedAns);
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
              <Box mt="3" ml="1">
                <label>
                  <input type="file" style={{ display: "none" }} />
                  <AiOutlineCamera size="25px" />
                </label>
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
