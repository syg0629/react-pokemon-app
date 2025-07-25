import { useRef } from "react";
import DamageRelations from "./DamageRelations";
import { useOneClickOutside } from "../hooks/useOneClickOutside";
import type { DamageRelations as DamageRelationsProps } from "../types/DamageRelationOfPokemonType";

interface DamageModalProps {
  damages: DamageRelationsProps[];
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const DamageModal = ({ setIsModalOpen, damages }: DamageModalProps) => {
  const ref = useRef<HTMLDivElement>(null);
  useOneClickOutside(ref, () => setIsModalOpen(false));

  return (
    <div className="flex items-center justify-center z-40 fixed left-0 bottom-0 w-full h-full bg-gray-800">
      <div ref={ref} className="modal bg-white rounded-lg w-1/2">
        <div className="flex flex-col p-4">
          <div className="flex items-center w-full justify-between">
            <div className="text-gray-900 font-medium text-lg">데미지 관계</div>
            <span
              onClick={() => setIsModalOpen(false)}
              className=" text-gray-900 font-medium text-lg cursor-pointer"
            >
              X
            </span>
          </div>

          <DamageRelations damages={damages} />
        </div>
      </div>
    </div>
  );
};

export default DamageModal;
