import React, { FunctionComponent } from 'react';

type errorMessageProps = {
    errorMessage: string;
};
export const ErrorMessage: FunctionComponent<errorMessageProps> = ({
    errorMessage
}) => {
    return (
        <div>
            <p
                style={{
                    marginTop: '1em',
                    textAlign: 'center',
                    color: 'red'
                }}
            >
                {errorMessage}
            </p>
        </div>
    );
};
