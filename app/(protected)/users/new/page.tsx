import { redirect } from 'next/navigation'
import { prisma } from '@/lib/prisma'

async function createUser(formData: FormData) {
  'use server'

  await prisma.users.create({
    data: {
      name: String(formData.get('name')),
      email: String(formData.get('email')),
      role: String(formData.get('role')),
      password: 'temp123', // example
    },
  })

  redirect('/users') // ✅ go back to list
}

export default function AddUserPage() {
  return (
    <div className="container py-4">
      <h3>Add User</h3>

      <form action={createUser} className="card mt-3">
        <div className="card-body">

          <div className="mb-3">
            <label className="form-label">Name</label>
            <input name="name" className="form-control" required />
          </div>

          <div className="mb-3">
            <label className="form-label">Email</label>
            <input name="email" type="email" className="form-control" required />
          </div>

          <div className="mb-3">
            <label className="form-label">Role</label>
            <select name="role" className="form-select">
              <option>User</option>
              <option>Approver</option>
              <option>Admin</option>
            </select>
          </div>

          <button type="submit" className="btn btn-primary me-2">
            Save
          </button>

          <a href="/users" className="btn btn-secondary">
            Cancel
          </a>

        </div>
      </form>
    </div>
  )
}
