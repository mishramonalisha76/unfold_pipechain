import selectedAction from '@/public/types/selectedAction';
import React from 'react';
import {MdOutlineRemoveCircleOutline,MdOutlineCancel} from 'react-icons/md';

interface ContextMenuProps {
  // visible: boolean;
  // x: number;
  // y: number;
  action:selectedAction | null
  onDrop: () => void;
  onCancel: () => void;
}

const ContextMenu: React.FC<ContextMenuProps> = ({  onDrop, onCancel }) => {
  // if (!visible || !action) {
  //   return null; // Do not render the context menu if it's not visible
  // }

  // const style: React.CSSProperties = {
  //   position: 'fixed',
  //   top: `${y}px`,
  //   left: `${x}px`,
  // };

  return (
    <div
      // style={style}
      className=" border flex flex-col  border-gray-300 shadow-md py-3 px-3 bg-indigo-900 gap-1 text-white  rounded absolute top-4 left-4 z-50"
    >
      <div className="cursor-pointer gap-2 flex items-center" onClick={onDrop}>
       <MdOutlineRemoveCircleOutline/> <span >Drop</span>
      </div>
      <div className="cursor-pointer gap-2 flex items-center" onClick={onCancel}>
       <MdOutlineCancel/> <span >Cancel</span>
      </div>
    </div>
  );
};

export default ContextMenu;
