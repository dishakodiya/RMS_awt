import { prisma } from '@/lib/prisma'
import { redirect } from 'next/navigation'

async function updateUser(id: string, formData: FormData) {
  'use server'

  await prisma.users.update({
    where: { user_id: Number(id) },
    data: {
      name: String(formData.get('name')),
      role: String(formData.get('role')),
    },
  })

  redirect('/users') // ✅ back to list
}

export default async function EditUserPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params

  const user = await prisma.users.findUnique({
    where: { user_id: Number(id) },
  })

  if (!user) return <div>User not found</div>

  return (
    <div className="container py-4">
      <h3>Edit User</h3>

      <form action={updateUser.bind(null, id)} className="card mt-3">
        <div className="card-body">

          <div className="mb-3">
            <label className="form-label">Name</label>
            <input
              name="name"
              className="form-control"
              defaultValue={user.name}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Email</label>
            <input
              className="form-control"
              value={user.email}
              disabled
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Role</label>
            <select
              name="role"
              className="form-select"
              defaultValue={user.role}
            >
              <option>User</option>
              <option>Approver</option>
              <option>Admin</option>
            </select>
          </div>

          <button type="submit" className="btn btn-primary me-2">
            Update
          </button>

          <a href="/users" className="btn btn-secondary">
            Cancel
          </a>

        </div>
      </form>
    </div>
  )
}
