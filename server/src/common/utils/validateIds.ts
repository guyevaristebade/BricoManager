import { HttpException } from '@common/errors/httpException';

interface IIds {
    id?: string;
    userId?: string;
}
// plus tard mettre  un params plus générique
export const validateIds = ({ id, userId }: IIds) => {
    if (!id && id?.trim() === '') {
        throw new HttpException('Bad Request', 400, 'ID requis et non vide');
    }

    if (!userId && userId?.trim() === '') {
        throw new HttpException('Bad Request', 400, 'ID utilisateur requis et non vide');
    }
};
