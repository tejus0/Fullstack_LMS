import React, { useState } from 'react';
import { Link } from 'react-router-dom';



// Recursive component to display each folder/file
const FolderTree = ({ data }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleOpen = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div style={{ marginLeft: 20 }} className='mt-4'>
      {data.type === 'folder' ? (
        <>
          <div onClick={toggleOpen} style={{ cursor: 'pointer', fontWeight: 'bold' }} className='hover:bg-gray-300 p-2 rounded-md text-xl'>
            {isOpen ? '📂' : '📁'} {data.name}
          </div>
          {isOpen && data.children && (
            <div style={{ marginLeft: 20 }}>
              {data.children.map((child, index) => (
                <FolderTree key={index} data={child} />
              ))}
            </div>
          )}
        </>
      ) : (
        <Link to={`/officeDashboard?url='${data.link}'`}>
          <p className='cursor-pointer hover:underline  text-xl'>
            🏫 {data.name}
          </p>
        </Link>
      )}
    </div>
  );
};

// Main component to render the entire tree
const FolderTreeView = ({ data }) => {
  return (
    <div className='flex flex-col gap-4'>
      {data.map((item, index) => (
        <FolderTree key={index} data={item} />
      ))}
    </div>
  );
};

export default FolderTreeView;
