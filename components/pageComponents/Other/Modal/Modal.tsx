import React from "react";
import { Modal, Button } from "react-bootstrap";
import usersInfoBox from "../../../../appStyles/adminStyles/usersInfoBox.module.css";

const Model = (props: any) => {
  return (
    <Modal size={props.size} show={props.show} onHide={props.handleClose}>
      <Modal.Header closeButton>
        <Modal.Title style={{ color: "#EE6A1D" }}>
          {props.modalTitle}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>{props.children}</Modal.Body>
      <Modal.Footer>
        {props.buttons ? (
          props.buttons.map((btn: any, index: any) => (
            <Button
              style={{ width: props.width, height: props.height }}
              key={index}
              variant={btn.color}
              onClick={btn.onClick}
              type="submit"
            >
              {btn.label}
            </Button>
          ))
        ) : (
          <Button
            variant="primary"
            {...props}
            style={{ backgroundColor: "#33333" }}
            className="btn-sm"
            onClick={props.onSubmit}
          >
            Save
          </Button>
        )}
      </Modal.Footer>
    </Modal>
  );
};

export default Model;
