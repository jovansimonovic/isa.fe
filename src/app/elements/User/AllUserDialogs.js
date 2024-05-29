import listAction from "@/core/listAction";
import UpdateUserDialog from "./Dialogs/UpdateUserDialog";
import { useListActions } from "@/contexts/listActionContext";
import DeleteUserDialog from "./Dialogs/DeleteUserDialog";
import CreateUserDialog from "./Dialogs/CreateUserDialog";

const AllUserDialogs = ({}) => {
  const { state } = useListActions();

  return (
    <>
      <CreateUserDialog isOpen={state.type === listAction.CREATE} />
      <UpdateUserDialog isOpen={state.type === listAction.UPDATE} />
      <DeleteUserDialog isOpen={state.type === listAction.DELETE} />
    </>
  );
};

export default AllUserDialogs;
