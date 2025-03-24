import { useModal } from "@/context/ModalContext";
import { ErrorModal } from "./ErrorModal";

const ModalLookup: Record<string, React.FC<any>> = {
  ErrorModal: ErrorModal,
  //   UpdatePrinterModal: UpdatePrinterModal,
  //   ConfirmPrintModal: ConfirmPrintModal,
  //   InsufficientPagesModal: InsufficientPagesModal,
  //   AddPrinterModal: AddPrinterModal,
  //   ConfirmBuyModal: ConfirmBuyModal,
};

const ModalManager = () => {
  const { modal, closeModal } = useModal();

  if (!modal) return null;
  const Modal = ModalLookup[modal.name];

  return <Modal onClose={closeModal} {...modal.props} />;
};

export default ModalManager;
