import React, { useContext } from 'react';
import {
    addProfessional,
    addProfessionalLenguage,
    getAllLengauges
} from '../services/professionals.service';
import { UserForm } from './UserForm';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { FormValues, LanguageOption } from '../interfaces/form.interface';
import { Modal } from 'antd';
import { UserContext } from '../context/UserContext';
import { AxiosError } from 'axios';
import { buildCreateLanguage } from '../helpers/build-language';
import { FormCreateLanguage } from '../interfaces/professionals.interface';

export const CreateUser = () => {
    const { isModalOpen, setIsModalOpen, setErrorMessage, errorMessage } =
        useContext(UserContext);

    const queryClient = useQueryClient();

    const { status, data, error } = useQuery<LanguageOption[], Error>(
        'Languages',
        () => getAllLengauges()
    );

    const { mutateAsync: AddProffessionalMutate } = useMutation(
        (data: FormData) => addProfessional(data),
        {
            onSuccess: () => {
                queryClient.invalidateQueries();
                !errorMessage.length && setIsModalOpen(false);
            },
            onError: (err: AxiosError) => {
                setErrorMessage(
                    err.response?.data?.non_field_errors[0] ?? err.message
                );
            }
        }
    );

    const AddProfessionalLanguageMutation = useMutation(
        (formdata: FormCreateLanguage) => addProfessionalLenguage(formdata),
        {
            onSuccess: () => {
                queryClient.invalidateQueries();
                !errorMessage.length && setIsModalOpen(false);
            },
            onError: (err: AxiosError) => {
                setErrorMessage(err.message);
            }
        }
    );

    const submitAction = async (formValues: FormValues) => {
        // Datos Profesional

        let formDataProfessional = new FormData();
        if (formValues.profile_image) {
            formDataProfessional.append(
                'profile_image',
                formValues.profile_image
            );
        }

        formDataProfessional.append('last_name', formValues.last_name);
        formDataProfessional.append('email', formValues.email);
        formDataProfessional.append('first_name', formValues.first_name);

        const dataProfessional = await AddProffessionalMutate(
            formDataProfessional
        );

        // Idiomas del profesional
        if (formValues.professionalLanguages) {
            if (dataProfessional.id) {
                let lenguages = buildCreateLanguage(
                    dataProfessional.id,
                    formValues.professionalLanguages
                );

                lenguages.forEach((element) => {
                    AddProfessionalLanguageMutation.mutate(element);
                });
            }
        }
    };

    const handleOk = () => {
        setErrorMessage('');
        setIsModalOpen(false);
    };

    const handleCancel = () => {
        setErrorMessage('');
        setIsModalOpen(false);
    };

    return (
        <div>
            {status === 'error' && <div> {error?.message}</div>}
            {status === 'loading' && <div> Cargando...</div>}
            {status === 'success' && (
                <>
                    <Modal
                        visible={isModalOpen}
                        onOk={handleOk}
                        onCancel={handleCancel}
                        title={'Crear Profesional'}
                        footer={false}
                    >
                        <UserForm
                            dataLenguage={data}
                            submitAction={submitAction}
                        />
                    </Modal>
                </>
            )}
        </div>
    );
};
