import moment from "moment";

const dateFormat = (date) => {
  return moment(date).format("DD/MM/YYYY");
};

export default dateFormat;
