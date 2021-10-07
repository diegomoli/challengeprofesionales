import { FunctionComponent, useContext } from 'react';
import { Modal } from 'antd';
import { UserContext } from '../context/UserContext';
import { useQuery, useMutation, useQueryClient } from 'react-query';
import { IProfesssional } from '../interfaces/professionals.interface';
import {
    getProffesionalById,
    deleteProfessional
} from '../services/professionals.service';
import { AxiosError } from 'axios';
import { ErrorMessage } from './ErrorMessage';

type DeleteUserProps = {
    id: number;
};
export const DeleteUser: FunctionComponent<DeleteUserProps> = ({
    id
}: DeleteUserProps) => {
    const queryClient = useQueryClient();
    const { isModalOpen, setIsModalOpen, setErrorMessage, errorMessage } =
        useContext(UserContext);

    const { status, data, error } = useQuery<IProfesssional, Error>(
        ['deleteProfessional', { id }],
        () => getProffesionalById(id)
    );

    const DeleteProfessionalMutation = useMutation(
        (id: number) => deleteProfessional(id),
        {
            onSuccess: () => {
                queryClient.invalidateQueries('professionals');
                !errorMessage.length && setIsModalOpen(false);
            },
            onError: (err: AxiosError) => {
                setErrorMessage(err.message);
            }
        }
    );

    const handleOk = () => {
        DeleteProfessionalMutation.mutate(id);
    };

    const handleCancel = () => {
        setErrorMessage('');
        setIsModalOpen(false);
    };

    return (
        <>
            {status === 'error' && <div> {error?.message}</div>}
            {status === 'loading' && <div> Cargando...</div>}
            {status === 'success' && (
                <Modal
                    visible={isModalOpen}
                    onOk={handleOk}
                    onCancel={handleCancel}
                    title={'Eliminar Profesional'}
                >
                    <h2>
                        ¿Está seguro que desea eliminar el profesional{' '}
                        <span style={{ color: 'red' }}>
                            {data?.first_name} {data?.last_name}
                        </span>
                        ?
                    </h2>
                    {errorMessage && (
                        <ErrorMessage errorMessage={errorMessage} />
                    )}
                </Modal>
            )}
        </>
    );
};
