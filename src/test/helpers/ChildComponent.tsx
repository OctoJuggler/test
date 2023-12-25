import React, { FC } from 'react';

export interface Props {
    value: string;
}

export const ChildComponent: FC<Props> = ({ value }) => {
    return <div>{value}</div>;
};
