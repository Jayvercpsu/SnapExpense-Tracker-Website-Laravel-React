import Modal from "./Modal";

export default function LogoutModal({ show, onClose, onConfirm }) {
    return (
        <Modal show={show} onClose={onClose} maxWidth="sm">
            <div className="p-6">
                <h2 className="text-lg font-semibold text-gray-800">Logout Confirmation</h2>
                <p className="mt-2 text-gray-600">Are you sure you want to logout?</p>
                <div className="mt-4 flex justify-end space-x-2">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 bg-gray-500 hover:bg-gray-600 text-white rounded"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={onConfirm}
                        className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded"
                    >
                        Logout
                    </button>
                </div>
            </div>
        </Modal>
    );
}
