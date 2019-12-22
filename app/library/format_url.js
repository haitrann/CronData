module.exports = (data, pageNumber) => {
    return data.slice(0, data.length - 3) + `/trang${pageNumber}.gd?loadmore=1`;
}