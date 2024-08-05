import { Row, Table } from "@tanstack/react-table";
import { MouseEvent } from "react";
import { Button } from "../../button";
import { PenBox } from "lucide-react";

interface EditCellProps {
  row: any;
  table: any;
}

const EditCell = ({ row, table }: EditCellProps) => {
  const meta = table.options.meta;

  const setEditedRows = (e: MouseEvent<HTMLButtonElement>) => {
    const element = e.currentTarget.name;
    meta?.setEditedRows((old: []) => ({
      ...old,
      [row.id]: !old[row.id],
    }));
    if (element !== "edit") {
      meta?.revertData(row.index, e.currentTarget.name === "cancel");
    }
  };

  return meta?.editedRows[row.id] ? (
    <>
      <Button size={"sm"} onClick={setEditedRows} name="cancel">
        X
      </Button>{" "}
      <Button size={"sm"} onClick={setEditedRows} name="done">
        ✔
      </Button>
    </>
  ) : (
    <Button size={"sm"} onClick={setEditedRows} name="edit">
      <PenBox size={18}/>
    </Button>
  );
};

export default EditCell;
