import React, { FC } from 'react';
import ReactLoading from 'react-loading';

export const Loading: FC = () => {
    return (
        <div className="loading-container">
            <ReactLoading className="loading" type={'cubes'} color={'grey'} />
        </div>
    );
};
