import { ISubTopic } from "../../../appTypes/appType";

export const SubTopicTags = ({ data }: { data: ISubTopic[] }) => {
  return (
    <ul className="list-group list-group-horizontal d-flex justify-content-around p-1 border border-light p-0">
      {data.map((item) => (
        <li
          className="list-group-item text-dark flex-fill text-center"
          key={item._id}
        >
          <label style={{ fontSize: 13 }}>{item.subTopic}</label>
        </li>
      ))}
    </ul>
  );
};
