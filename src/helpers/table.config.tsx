import { Avatar, Space } from 'antd';
import { Result } from '../interfaces/professionals.interface';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';

export const dataTable = (data: Result[]) => {
    return data.map((prefesional) => ({
        key: prefesional.id,
        ...prefesional
    }));
};

export const columnTable = (handleEdit: Function, handleDelete: Function) => {
    return [
        {
            title: '',
            dataIndex: 'profile_image',
            key: 'profile_image',
            render: (_: any, record: Result) => (
                <Avatar src={record.profile_image} alt={record.profile_image} />
            )
        },

        {
            title: 'NOMBRE',
            dataIndex: 'first_name',
            key: 'first_name'
        },
        {
            title: 'APELLIDO',
            dataIndex: 'last_name',
            key: 'last_name'
        },
        {
            title: 'EMAIL',
            dataIndex: 'email',
            key: 'email'
        },
        {
            title: 'ID',
            dataIndex: 'id',
            key: 'id'
        },

        {
            title: 'ACCIONES',
            dataIndex: 'id',
            key: 'id',
            render: (_: any, record: Result) => (
                <Space size="middle">
                    <EditOutlined
                        style={{ color: 'green' }}
                        onClick={() => handleEdit(record.id)}
                    />
                    <DeleteOutlined
                        style={{ color: 'red' }}
                        onClick={() => handleDelete(record.id)}
                    />
                </Space>
            )
        }
    ];
};
