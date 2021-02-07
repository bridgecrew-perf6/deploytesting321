export const containsSpecialCharacters = (str) => {
  const regex = /[ !@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/g;
  return regex.test(str);
};

export const getCredentialProps = (formType) => {
  const objList = document.getElementsByTagName("input");
  const formObj = {};

  for (let i = 0; i < objList.length; i++) {
    const domItem = objList[i];
    formObj[camelCaseString(domItem.id)] = domItem.value;
  }

  if (formType === "registration") {
    const selectorVal = document.getElementById("State");

    selectorVal.value === "Select State"
      ? (formObj[camelCaseString(selectorVal.id)] = "")
      : (formObj[camelCaseString(selectorVal.id)] = selectorVal.value);
  }

  return formObj;
};

export const camelCaseString = (str) => {
  return str
    .toLowerCase()
    .replace(/[^a-zA-Z0-9]+(.)/g, (m, chr) => chr.toUpperCase());
};

export const StateVals = ({ stateList }) =>
  stateList.map((stateVal) => (
    <option key={stateVal.id}>{stateVal.name}</option>
  ));

export const getFormBorderStyle = (formObj) => {
  const formBorderObj = {};

  for (const key in formObj) {
    if (formObj[key] === "") {
      formBorderObj[key] = "form-control border border-danger";
    } else formBorderObj[key] = "form-control"
  }

  return formBorderObj;
};

export const AppMssgList = ({ mssgs }) => {
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