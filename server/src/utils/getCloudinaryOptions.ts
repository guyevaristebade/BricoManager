export const getCloudinaryOptions = (storageFileName: string) => {
    return {
        use_filename: true,
        unique_filename: false,
        overwrite: true,
        folder: `BricoManager/${storageFileName}`,
        quality: 'auto',
        fetch_format: 'auto',
        format: 'webp',
        width: 600,
        height: 600,
        crop: 'limit',
    };
};
