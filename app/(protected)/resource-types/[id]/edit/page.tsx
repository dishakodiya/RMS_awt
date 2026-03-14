
import { prisma } from '@/lib/prisma'
import { updateResourceType } from '../../actions'
import { redirect } from 'next/navigation'
import Link from 'next/link'

export default async function EditResourceTypePage({ params }: { params: { id: string } }) {
    const { id } = await params

    const resourceType = await prisma.resource_types.findUnique({
        where: { resource_type_id: Number(id) },
    })

    if (!resourceType) {
        redirect('/resource-types')
    }

    const updateAction = updateResourceType.bind(null, resourceType.resource_type_id)

    return (
        <div className="container py-4" style={{ maxWidth: '600px' }}>
            <div className="page-header">
                <h1>Edit Resource Type</h1>
            </div>

            <form action={updateAction} className="card">
                <div className="card-body">
                    <div className="mb-3">
                        <label className="form-label">Type Name</label>
                        <input
                            name="type_name"
                            defaultValue={resourceType.type_name}
                            className="form-control"
                            required
                        />
                    </div>

                    <div className="d-flex justify-content-end gap-2">
                        <Link href="/resource-types" className="btn btn-secondary">
                            Cancel
                        </Link>
                        <button type="submit" className="btn btn-primary">
                            Update
                        </button>
                    </div>
                </div>
            </form>
        </div>
    )
}
