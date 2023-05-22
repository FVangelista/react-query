import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import customFetch from "./utils";
import { toast } from "react-toastify";

export const useFetchTasks = () => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["tasks"],
    // queryFn needs to return a promise
    queryFn: async () => {
      const { data } = await customFetch.get("/");
      return data;
    },
  });

  return { data, isLoading, isError };
};

export const useCreateTask = () => {
  const queryClient = useQueryClient();
  const {
    mutate: createTask,
    isLoading,
    isError,
  } = useMutation({
    mutationFn: (newItemName) =>
      customFetch.post("/", {
        title: newItemName,
      }),
    onSuccess: () => {
      queryClient.invalidateQueries("tasks");
      toast.success("task added");
    },
    onError: (error) => {
      toast.error(error.response.data.msg);
    },
  });

  return { createTask, isLoading, isError };
};

export const useEditTask = () => {
  const queryClient = useQueryClient();
  const { mutate: editTask } = useMutation({
    mutationFn: ({ taskId, isDone }) =>
      customFetch.patch(`/${taskId}`, { isDone }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
    },
  });

  return { editTask };
};

export const useDeleteTask = () => {
  const queryClient = useQueryClient();
  const { mutate: deleteTask, isLoading } = useMutation({
    mutationFn: (taskId) => customFetch.delete(`/${taskId}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
    },
  });
  return { deleteTask, isLoading };
};
