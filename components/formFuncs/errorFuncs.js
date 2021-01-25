import { getCredentialProps } from "./miscFuncs";

export const errorHandling = () => {
  const { id } = document.getElementsByTagName("form")[0];
  const formObj = getCredentialProps(id);

  const errors = [];

  for (const key in formObj) {
    const form_val = formObj[key];

    if (form_val.length === 0 && key !== "address2") {
      errors.push({ message: `Please fill out the ${key} field` });
    }
  }
  return { formObj, errors };
};

export const ErrorList = ({ errors }) => {
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
