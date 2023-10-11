import React from 'react'

interface IFormTitle {
    title: string
}

const FormTitle: React.FC<IFormTitle> = ({title}) => {
  return (
    <h1 className="@apply font-medium text-2xl mb-3 mt-5">
      {title}
    </h1>
  );
};

export default FormTitle
