module.exports = {
    transformPhoto: (url, width, height) => {
        const cloudinaryBaseUrl = url.split("/image/upload/")[0];
        const photolPath = url.split("/image/upload/")[1];
        return `${cloudinaryBaseUrl}/w_${width},h_${height},c_fill/${photolPath}`;
    },
    formatDate: (date) => {
        return new Date(date).toLocaleDateString('en-GB');
    }
}