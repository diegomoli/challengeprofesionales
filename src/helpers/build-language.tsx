import {
    FormCreateLanguage,
    ILanguage,
    IProfessionalLenguage
} from '../interfaces/professionals.interface';

export const buildProfessionalLanguage = (data: ILanguage[]) => {
    return data.map((l) => ({
        label: l.name,
        key: l.id,
        value: l.id
    }));
};

export const buildDefaultValues = (data: IProfessionalLenguage[]) => {
    return data.map((l) => l.language.id) ?? [];
};

export const buildDeleteLanguage = (data: IProfessionalLenguage[]) => {
    return data.map((l) => l.id);
};

export const buildCreateLanguage = (
    id: number,
    data: number[]
): FormCreateLanguage[] => {
    return data.map((d) => ({
        language_id: d,
        professional_id: id
    }));
};
