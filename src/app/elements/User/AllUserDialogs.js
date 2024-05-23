import listAction from "@/core/listAction";
import UpdateUserDialog from "./Dialogs/UpdateUserDialog";
import { useListActions } from "@/contexts/listActionContext";

const AllUserDialogs = ({}) => {
  const { state } = useListActions();

  return (
    <>
      <UpdateUserDialog isOpen={state.type === listAction.UPDATE} />
    </>
  );
};

export default AllUserDialogs;
