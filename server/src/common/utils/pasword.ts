export const removePassword = (data: any) => {
    const { password, ...rest } = data;
    return rest;
};
