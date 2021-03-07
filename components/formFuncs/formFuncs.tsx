import { ErrorMssg } from "../appTypes/appType";

export const AppMssgList = ({ mssgs }: { mssgs: AppMssg[] }) => {
  return (
    <ul className="list-group">
      {mssgs.map((msg, idx) => (
        <li key={idx} className="list-group-item list-group-item-success m-1">
          {msg.message}
        </li>
      ))}
    </ul>
  );
};

export const ErrorList = ({ errors }: { errors: ErrorMssg[] }) => {
  return (
    <ul className="list-group">
      {errors.map((error, idx) => (
        <li key={idx} className="list-group-item list-group-item-danger m-1">
          {error.message}
        </li>
      ))}
    </ul>
  );
};

interface StateVal {
  id: string;
  name: string;
}

export const StateVals = ({ stateList }: { stateList: StateVal[] }) =>
  stateList.map((stateVal) => (
    <option key={stateVal.id}>{stateVal.name}</option>
  ));
