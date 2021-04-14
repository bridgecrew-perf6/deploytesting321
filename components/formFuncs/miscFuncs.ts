import { IHTMLElementForm, ISubTopic, ITopic } from "../appTypes/appType";

export const containsSpecialCharacters = (str: string) => {
  const regex = /[ !@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/g;
  return regex.test(str);
};

export const getCredentialProps = (formType: string) => {
  const objList = document.getElementsByTagName("input");
  const formObj: any = {};

  for (let i = 0; i < objList.length; i++) {
    const domItem = objList[i];
    formObj[camelCaseString(domItem.id)] = domItem.value;
  }

  if (formType === "registration") {
    const selectorVal: IHTMLElementForm | null = document.getElementById(
      "State"
    );

    if (selectorVal) {
      selectorVal.value === "Select State"
        ? (formObj[camelCaseString(selectorVal.id)] = "")
        : (formObj[camelCaseString(selectorVal.id)] = selectorVal.value);
    }
  }

  return formObj;
};

export const camelCaseString = (str: string) => {
  return str
    .toLowerCase()
    .replace(/[^a-zA-Z0-9]+(.)/g, (m, chr) => chr.toUpperCase());
};

export const getFormBorderStyle = (formObj: HTMLFormElement) => {
  const formBorderObj: HTMLFormElement = ({} as any) as HTMLFormElement;

  for (const key in formObj) {
    if (formObj[key] === "") {
      formBorderObj[key] = "form-control border border-danger";
    } else formBorderObj[key] = "form-control";
  }

  return formBorderObj;
};

export const createAppMssgList = (msgList: object[]) => {
  return JSON.stringify(msgList);
};

export const filterSubtopicsforTopic = (
  data: ITopic[] | undefined,
  selectedTopic: string | null
) => {

  return data?.filter((item) => item.topic === selectedTopic)[0]?.subTopics;

  // let subTopicList: ISubTopic[] | [] | undefined;

  // for (let i = 0; i < data.length; i++) {
  //   const element = data[i];
  //   console.log(element)
  //   if (element.topic === selectedTopic) {
  //     console.log(element.subtopics)
  //     subTopicList = element.subtopics;
  //   }
  // }

  // return subTopicList;
  // return data.map((item) => item.topic === selectedTopic);
};
