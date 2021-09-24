import React, { useRef } from "react";
import { useReactToPrint } from "react-to-print";
import { Table } from "_pageComponents/index";

const ToPdf = (props: any) => {
  const componentRef = useRef<HTMLDivElement>(null);
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });
  return (
    <div>
      <Table ref={componentRef} />
      <button onClick={handlePrint}>Print this out!</button>
    </div>
  );
};

export default ToPdf;
