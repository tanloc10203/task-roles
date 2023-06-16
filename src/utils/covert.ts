export const convertObjToString = (obj: { [key: string]: any }) => {
  let values: Array<string> = [];
  let where = "";

  Object.keys(obj).forEach((key, index) => {
    if (index > 0) {
      where += " AND ";
    }

    where += `\`${key}\` = ?`;
    values = [...values, obj[key]];
  });

  return { where, values };
};

export const convertStringToArrayForSelect = (
  select: string,
  fillables: Array<string>
) => {
  if (!select) return fillables;

  let selectCutToObj = select
    .split(" ")
    .reduce((obj, value) => (obj = { ...obj, [value]: value }), {});

  let fillablesTemp: Array<string> = [];
  let result: Array<string> = [];

  Object.keys(selectCutToObj).forEach((key) => {
    const keyCut = key.split("-"); // ['', 'key'];

    if (keyCut[0] === "" || !keyCut[0]) {
      if (fillablesTemp.length) {
        fillablesTemp = [...fillablesTemp.filter((fill) => fill !== keyCut[1])];
      } else {
        fillablesTemp = [...fillables.filter((fill) => fill !== keyCut[1])];
      }
    } else {
      result = [...result, keyCut[0]];
    }
  });

  return result.length ? result : fillablesTemp;
};

/** @description Convert mảng sang chuỗi query */
export const convertParamToString = (params: Array<string | number>) => {
  let paramStr = "";
  let count = params.length;
  for (let idx = 0; idx < count; idx++) {
    if (idx == count - 1) {
      paramStr += JSON.stringify(params[idx]);
    } else {
      paramStr += JSON.stringify(params[idx]) + ", ";
    }
  }
  return paramStr;
};
