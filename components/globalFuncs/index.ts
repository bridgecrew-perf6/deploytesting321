export const dateToString = (date: Date) => new Date(date).toISOString();

export const getSectionList = (flatList: any[], sectionDivider: number) => {
  const sectionList = [];

  const listEnd = flatList.length % sectionDivider;
  const listParts = Math.floor(flatList.length / sectionDivider);

  for (let i = 0; i < listParts; i++) {
    let startIdx: number;
    let endIdx: number;

    if (i === 0) {
      startIdx = 0;
      endIdx = i + sectionDivider;
    } else {
      startIdx = i * sectionDivider;
      endIdx = startIdx + sectionDivider;
    }

    sectionList.push(flatList.slice(startIdx, endIdx));
  }

  listEnd > 0 && sectionList.push(flatList.slice(-listEnd));

  return sectionList;
};

export const getSortedListByDate = (dataList: any[]) => {
  return dataList.sort(
    (a, b) =>
      new Date(b.creationDate).valueOf() - new Date(a.creationDate).valueOf()
  );
};

export const getSortedListByChat = (dataList: any[]) => {
  const listWithChatMssg = dataList.map((item) => {
    if (item.chatMssgs) {
      return item;
    } else return { ...item, chatMssgs: [] };
  });

  const listWithChatSorted = listWithChatMssg.sort(
    (a, b) => b.chatMssgs?.length - a.chatMssgs?.length
  );

  return listWithChatSorted;
};

export const getAlphabeticalList = (dataList: any[], prop: string) => {
  return dataList.sort((a, b) => {
    const nameA = a[prop].toUpperCase();
    const nameB = b[prop].toUpperCase();

    if (nameA < nameB) {
      return -1;
    }

    if (nameA > nameB) {
      return 1;
    }

    return 0;
  });
};

export const getStoredSearch = () => {
  if (typeof window !== "undefined") {
    const storageVal = localStorage.getItem("PoldIt-data") || "";
    const { searchVal } = JSON.parse(storageVal);
    return searchVal;
  }
};

// export const storeSearchVal = (objToStore: object) => {
//   console.log(objToStore)
//   localStorage.setItem("PoldIt-data", JSON.stringify({ objToStore }));
//   return;
// };
export const showAbbreviatedTxt = (mssg: string) => {
  if (mssg.length > 25) {
    return `${mssg.slice(0, 25)}...`;
  }
  return mssg;
};

export const roundValue = (val: number | undefined) => {
  if (!val) {
    return 0;
  }
  return Math.round(val * 100);
};

export const getUniqueObjList = (list1: any[], list2: any[]) => {
  let finalList: any[] = [];

  const mergedList = [...list1, ...list2];

  mergedList.forEach((x) => {
    const match = finalList.some((item) => item.id === x.id);

    !match && finalList.push(x);
  });

  return finalList;
};
