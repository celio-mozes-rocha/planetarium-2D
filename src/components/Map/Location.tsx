import Maps from "./Maps";
import Modal from "../Modal";

type LocationProps = {
  onClose: () => void;
};

export default function Location({ onClose }: LocationProps) {

  return (

    <Modal onClose={onClose} title="Choisir le lieu d'observation">
      <div className="h-96">
        <Maps />
      </div>
    </Modal>
  )
}