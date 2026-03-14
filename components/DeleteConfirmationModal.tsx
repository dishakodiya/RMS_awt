
'use client'

type Props = {
    show: boolean
    title: string
    message: string
    onClose: () => void
    onConfirm: () => void
}

export default function DeleteConfirmationModal({ show, title, message, onClose, onConfirm }: Props) {
    if (!show) return null

    return (
        <>
            <div className="modal fade show d-block" style={{ backgroundColor: 'rgba(0,0,0,.5)' }} tabIndex={-1}>
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title text-danger">
                                <i className="bi bi-exclamation-triangle-fill me-2"></i>
                                {title}
                            </h5>
                            <button type="button" className="btn-close" onClick={onClose}></button>
                        </div>
                        <div className="modal-body">
                            <p>{message}</p>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" onClick={onClose}>
                                Cancel
                            </button>
                            <button type="button" className="btn btn-danger" onClick={onConfirm}>
                                Delete
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
