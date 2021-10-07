import { createContext, useState } from 'react';

export type UserContextProps = {
    isModalOpen: boolean;
    setIsModalOpen: (state: boolean) => void;
    errorMessage: string;
    setErrorMessage: (message: string) => void;
};

export const UserContext = createContext({} as UserContextProps);

export const UserContextProvider = ({ children }: any) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    return (
        <UserContext.Provider
            value={{
                isModalOpen,
                setIsModalOpen,
                errorMessage,
                setErrorMessage
            }}
        >
            {children}
        </UserContext.Provider>
    );
};
