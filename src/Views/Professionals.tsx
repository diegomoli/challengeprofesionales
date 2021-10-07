import { useContext, useState } from 'react';
import { useQuery } from 'react-query';
import { IProfessionals } from '../interfaces/professionals.interface';
import { getNextPageProffesionals } from '../services/professionals.service';
import 'antd/dist/antd.css';
import { Table, Button } from 'antd';
import { columnTable, dataTable } from '../helpers/table.config';
import { ModalCrud } from '../components/ModalCrud';
import { action } from '../types/types';
import { UserContext } from '../context/UserContext';
export const Professionals = () => {
    const [idTable, setIdTable] = useState(0);
    const [action, setAction] = useState<action>('');

    const onChangePage = (page: number) => {
        setCurrentPage(page);
    };

    const handleEdit = (id: number) => {
        setAction('EDIT');
        setIdTable(id);
        setIsModalOpen(true);
    };

    const handleCreate = () => {
        setIsModalOpen(true);
        setAction('ADD');
    };

    const handleDelete = (id: number) => {
        setIsModalOpen(true);
        setIdTable(id);
        setAction('DELETE');
    };

    const { isModalOpen, setIsModalOpen } = useContext(UserContext);

    const [currentPage, setCurrentPage] = useState(1);
    const { status, data, error } = useQuery<IProfessionals, Error>(
        ['professionals', currentPage],
        () => getNextPageProffesionals(currentPage),
        { keepPreviousData: true }
    );

    return (
        <div
            style={{
                margin: '4em'
            }}
        >
            <h1>Buen Doc Challenge</h1>
            <h2>Profesionales </h2>
            <Button onClick={handleCreate} type="primary">
                {' '}
                Crear Profesional
            </Button>
            {status === 'error' && <div> {error?.message}</div>}
            {status === 'loading' && <div> Cargando...</div>}
            {data && (
                <Table
                    style={{
                        margin: '4em',
                        boxShadow: '0px 0px 5px 1px black',
                        textAlignLast: 'center'
                    }}
                    pagination={{
                        total: data?.count,
                        current: currentPage,
                        onChange: (page) => onChangePage(page)
                    }}
                    dataSource={dataTable(data.results)}
                    columns={columnTable(handleEdit, handleDelete)}
                />
            )}

            {isModalOpen && <ModalCrud action={action} id={idTable} />}
        </div>
    );
};
