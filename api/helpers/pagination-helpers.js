/**
 * @function buildPagination
 * @description It will create a pageInfo Object which contains informations from pagination.
 * @param {Object} element - Object with informations which it will be used for create a pageInfo.
 * @param {Object} element.totalValues - Total Values.
 * @param {Object} element.data - Object from sequelize.
 * @param {Number} element.rowsPerPage - Quantity of rows per page.
 * @param {Number} element.currentPage - current page.
 */
const buildPagination = ({
  totalValues,
  rowsPerPage,
  currentPage,
  data = null,
}) => {
  if (data) totalValues = data.count.length;
  const totalPages = Math.ceil(totalValues / rowsPerPage);

  return {
    totalPages,
    totalValues,
    currentPage,
    rowsPerPage,
  };
};

module.exports = {
  buildPagination,
}