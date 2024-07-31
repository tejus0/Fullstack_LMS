import React from 'react'

const OfficeWiseTopPerformer = ({ name, data }) => {
    // console.log(data);
    console.log(name);
    const prefix = name === 'Noida' ? 'ckn' : 'ckk';
    const a = data.filter(item => item.id.toLowerCase().startsWith(prefix));
    console.log(a);
    return a
}

export default OfficeWiseTopPerformer