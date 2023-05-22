import { useState } from "react";
import { useCreateTask } from "./reactQueryHooks";
import { toast } from "react-toastify";

// react-query
// to fetch the data we use useQuery
// to create, read and delete its used useMutation

// Query invalidation
// allows us to update the data without refreshing the page

const Form = () => {
  const [newItemName, setNewItemName] = useState("");

  // We can pass setNewItemName as a parameter or set up onSuccess when we invoke createTask in the handleSubmit expression.

  // const { createTask, isLoading } = useCreateTask(setNewItemName);

  const { createTask, isLoading } = useCreateTask();

  const handleSubmit = (e) => {
    e.preventDefault();
    createTask(newItemName, {
      onSuccess: () => {
        setNewItemName("");
      },
    });
  };
  return (
    <form onSubmit={handleSubmit}>
      <h4>task bud</h4>
      <div className="form-control">
        <input
          type="text "
          className="form-input"
          value={newItemName}
          onChange={(event) => setNewItemName(event.target.value)}
        />
        <button type="submit" className="btn" disabled={isLoading}>
          add task
        </button>
      </div>
    </form>
  );
};
export default Form;
