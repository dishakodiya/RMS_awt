'use client'

type Props = {
  show: boolean
  mode: 'add' | 'edit'
  onClose: () => void
}

export default function UserFormModal({ show, mode, onClose }: Props) {
  if (!show) return null

  return (
    <div className="modal fade show d-block" style={{ backgroundColor: 'rgba(0,0,0,.5)' }}>
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">

          <div className="modal-header">
            <h5 className="modal-title">
              {mode === 'add' ? 'Add User' : 'Edit User'}
            </h5>
            <button className="btn-close" onClick={onClose}></button>
          </div>

          <div className="modal-body">
            <div className="mb-3">
              <label className="form-label">Name</label>
              <input className="form-control" placeholder="Enter name" />
            </div>

            <div className="mb-3">
              <label className="form-label">Email</label>
              <input className="form-control" type="email" placeholder="Enter email" />
            </div>

            <div className="mb-3">
              <label className="form-label">Role</label>
              <select className="form-select">
                <option>Select role</option>
                <option>Admin</option>
                <option>Approver</option>
                <option>User</option>
              </select>
            </div>
          </div>

          <div className="modal-footer">
            <button className="btn btn-secondary" onClick={onClose}>
              Cancel
            </button>
            <button className="btn btn-primary">
              {mode === 'add' ? 'Add' : 'Save'}
            </button>
          </div>

        </div>
      </div>
    </div>
  )
}



