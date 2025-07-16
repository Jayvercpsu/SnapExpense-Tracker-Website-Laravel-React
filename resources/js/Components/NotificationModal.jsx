import Modal from "./Modal";

export default function NotificationModal({ show, onClose, title, message }) {
    return (
        <Modal show={show} onClose={onClose} maxWidth="sm">
            <div className="p-6">
                <h2 className="text-lg font-semibold text-gray-800">{title}</h2>
                <p className="mt-2 text-gray-600">{message}</p>
                <div className="mt-4 flex justify-end">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                    >
                        OK
                    </button>
                </div>
            </div>
        </Modal>
    );
}
