const validateImage = (image) => {
    // Verifica que la imagen sea válida (base64 o formato específico)
    return image && image.startsWith('data:image');
};

module.exports = {
    validateImage,
};