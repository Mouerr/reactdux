import React from 'react';
import {Breadcrumb, BreadcrumbItem} from 'reactstrap';

const BreadcrumbC = () => {
    const bc = window.location.pathname.split("/");
    return <>
        {window.location.pathname !== '/login' ?
            <Breadcrumb className='my-3'>
                {bc.map((value, index) => {
                    if (bc.length === index + 1) {
                        return <BreadcrumbItem key={index}>{value.toUpperCase()}</BreadcrumbItem>
                    }
                    return <BreadcrumbItem key={index} tag="a" href="#">{value.toUpperCase()}</BreadcrumbItem>
                })}
            </Breadcrumb> : null}
    </>
};

export default BreadcrumbC;