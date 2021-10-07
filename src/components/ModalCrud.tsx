import { FunctionComponent } from 'react';
import { action } from '../types/types';
import { CreateUser } from './CreateUser';
import { EditUser } from './EditUser';
import { DeleteUser } from './DeleteUser';

type ModalCrudProps = {
    id: number;
    action: action;
};

export const ModalCrud: FunctionComponent<ModalCrudProps> = ({
    id,
    action
}) => {
    return (
        <div>
            {action === 'EDIT' && <EditUser id={id} />}
            {action === 'ADD' && <CreateUser />}
            {action === 'DELETE' && <DeleteUser id={id} />}
        </div>
    );
};
