import { getCredentialProps } from "./miscFuncs";

export const errorHandling = () => {
  const { id } = document.getElementsByTagName("form")[0];
  const formObj: HTMLFormElement = getCredentialProps(id);

  const errors = [];

  for (const key in formObj) {
    const form_val = formObj[key];

    if (form_val.length === 0 && key !== "address2") {
      errors.push({ message: `Please fill out the ${key} field` });
    }
  }
  return { formObj, errors };
};
