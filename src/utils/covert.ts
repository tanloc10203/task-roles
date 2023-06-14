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
