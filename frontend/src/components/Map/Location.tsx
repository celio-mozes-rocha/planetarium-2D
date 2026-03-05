import Maps from "./Maps";
import Modal from "../Modal";
import SearchLocation from "../SearchLocation";

type LocationProps = {
  onClose: () => void;
};

export default function Location({ onClose }: LocationProps) {

  return (

    <Modal onClose={onClose} title="Choisir le lieu d'observation">
      <SearchLocation />
      <div className="h-96">
        <Maps />
      </div>
    </Modal>
  )
}