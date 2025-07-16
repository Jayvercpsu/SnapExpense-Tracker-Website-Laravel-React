import Modal from "./Modal";
import PrimaryButton from "./PrimaryButton";
import SecondaryButton from "./SecondaryButton";

export default function DeleteModal({ show, onClose, onConfirm }) {
    return (
        <Modal show={show} onClose={onClose} maxWidth="sm">
            <div className="p-6">
                <h2 className="text-lg font-semibold text-gray-800">Confirm Deletion</h2>
                <p className="mt-2 text-gray-600">
                    Are you sure you want to delete this item? This action cannot be undone.
                </p>
                <div className="mt-4 flex justify-end space-x-2">
                    <PrimaryButton
                        onClick={onClose}
                        className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
                    >
                        Cancel
                    </PrimaryButton>
                    <PrimaryButton
                        onClick={onConfirm}
                        className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
                    >
                        Delete
                    </PrimaryButton>
                </div>
            </div>
        </Modal>
    );
}
