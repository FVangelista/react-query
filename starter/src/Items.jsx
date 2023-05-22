import SingleItem from "./SingleItem";
import { useFetchTasks } from "./reactQueryHooks";

const Items = () => {
  const { data, isLoading, isError } = useFetchTasks();

  if (isError)
    return <p style={{ marginTop: "1rem" }}>There was an error...</p>;

  if (isLoading) {
    return <p style={{ marginTop: "1rem" }}>Loading...</p>;
  }

  return (
    <div className="items">
      {data.taskList.map((item) => {
        return <SingleItem key={item.id} item={item} />;
      })}
    </div>
  );
};
export default Items;
