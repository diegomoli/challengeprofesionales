import { FunctionComponent, useContext } from 'react';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import {
    IProfesssional,
    IProfessionalLenguage,
    FormCreateLanguage
} from '../interfaces/professionals.interface';
import {
    addProfessionalLenguage,
    deleteProfessionalLenguage,
    editProfessional,
    getDataProfessional
} from '../services/professionals.service';
import { UserForm } from './UserForm';
import { Modal } from 'antd';
import { UserContext } from '../context/UserContext';
import { FormValues, LanguageOption } from '../interfaces/form.interface';
import {
    buildCreateLanguage,
    buildDefaultValues,
    buildDeleteLanguage
} from '../helpers/build-language';
import { AxiosError } from 'axios';

type createUserProps = {
    id: number;
};
export const EditUser: FunctionComponent<createUserProps> = ({ id }) => {
    const queryClient = useQueryClient();

    const { isModalOpen, setIsModalOpen, setErrorMessage, errorMessage } =
        useContext(UserContext);

    const { status, data, error } = useQuery<
        [IProfesssional, IProfessionalLenguage[], LanguageOption[]],
        Error
    >(['Dataprofessional', { id }], () => getDataProfessional(id));

    const EditProfessionalMutation = useMutation(
        (data: FormData) => editProfessional(id, data),
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

    const DeleteProfessionalMutation = useMutation(
        (idProfessionalLanguage: number) =>
            deleteProfessionalLenguage(idProfessionalLanguage),
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

    const AddProfessionalLanguageMutation = useMutation(
        (data: FormCreateLanguage) => addProfessionalLenguage(data),
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

    const submitAction = (formValues: FormValues) => {
        // Datos principales del profesional

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

        EditProfessionalMutation.mutate(formDataProfessional);

        // Idiomas del profesional

        if (formValues.professionalLanguages) {
            let eliminar = buildDeleteLanguage(
                data?.[1].filter(
                    (x) =>
                        !formValues.professionalLanguages.includes(
                            x.language.id
                        )
                ) ?? []
            );

            let agregar = buildCreateLanguage(
                id,
                formValues.professionalLanguages.filter(
                    (x) => !buildDefaultValues(data?.[1] ?? []).includes(x)
                )
            );

            console.log('eliminar:', eliminar);
            console.log('agregar:', agregar);

            if (agregar.length) {
                agregar.forEach((language) => {
                    AddProfessionalLanguageMutation.mutate(language);
                });
            }

            if (eliminar.length) {
                eliminar.forEach((element) => {
                    DeleteProfessionalMutation.mutate(element);
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
                        title={'Editar Profesional'}
                        footer={false}
                    >
                        <UserForm
                            dataProfessional={data?.[0]}
                            defaultValues={buildDefaultValues(data?.[1] ?? [])}
                            dataLenguage={data?.[2]}
                            submitAction={submitAction}
                        />
                    </Modal>
                </>
            )}
        </div>
    );
};
