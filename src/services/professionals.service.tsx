import http from '../http-common';
import { buildProfessionalLanguage } from '../helpers/build-language';
import {
    FormCreateLanguage,
    ILanguage,
    IProfessionalLenguage,
    IProfessionals,
    IProfesssional
} from '../interfaces/professionals.interface';

import { LanguageOption } from '../interfaces/form.interface';

export const getAll = async () => {
    const resp = await http.get<IProfessionals>('/professionals/');
    return resp.data;
};

export const getNextPageProffesionals = async (page: number) => {
    const resp = await http.get<IProfessionals>(`/professionals/?page=${page}`);
    return resp.data;
};

export const getProffesionalById = async (id: number | null) => {
    const resp = await http.get<IProfesssional>(`/professionals/${id}/`);
    return resp.data;
};

export const getProfessionalLanguages = async (id: number | null) => {
    const resp = await http.get<IProfessionalLenguage[]>(
        `/professional-languages/?professional__id=${id}`
    );
    return resp.data;
};

export const getAllLengauges = async () => {
    const resp = await http.get<ILanguage[]>(`/languages/`);
    return buildProfessionalLanguage(resp.data);
};

export const getDataProfessional = async (id: number) => {
    return await Promise.all<
        IProfesssional,
        IProfessionalLenguage[],
        LanguageOption[]
    >([
        getProffesionalById(id),
        getProfessionalLanguages(id),
        getAllLengauges()
    ]);
};

export const addProfessional = async (data: FormData) => {
    const resp = await http.post<IProfesssional>(`/professionals/`, data, {
        headers: { 'Content-Type': 'multipart/form-data' }
    });
    return resp.data;
};

export const editProfessional = async (id: number, data: FormData) => {
    const resp = await http.patch(`/professionals/${id}/`, data, {
        headers: { 'Content-Type': 'multipart/form-data' }
    });
    return resp.data;
};

export const deleteProfessional = async (id: number) => {
    const resp = await http.delete(`/professionals/${id}/`);
    return resp.data;
};

export const addProfessionalLenguage = async (data: FormCreateLanguage) => {
    const resp = await http.post('/professional-languages/', data, {
        headers: { 'Content-Type': 'multipart/form-data' }
    });

    return resp.data;
};

export const deleteProfessionalLenguage = async (id: number) => {
    const resp = await http.delete(`/professional-languages/${id}`);

    return resp.data;
};
