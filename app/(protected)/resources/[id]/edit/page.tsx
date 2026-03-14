
import { prisma } from '@/lib/prisma'
import { updateResource } from '../../actions'
import { redirect } from 'next/navigation'
import Link from 'next/link'

export default async function EditResourcePage({ params }: { params: { id: string } }) {
    const { id } = await params

    const resource = await prisma.resources.findUnique({
        where: { resource_id: Number(id) },
    })

    if (!resource) {
        redirect('/resources')
    }

    const types = await prisma.resource_types.findMany()
    const buildings = await prisma.buildings.findMany()

    const updateAction = updateResource.bind(null, resource.resource_id)

    return (
        <div className="container py-4" style={{ maxWidth: '600px' }}>
            <div className="page-header">
                <h1>Edit Resource</h1>
            </div>

            <form action={updateAction} className="card">
                <div className="card-body">
                    <div className="mb-3">
                        <label className="form-label">Resource Name</label>
                        <input
                            name="resource_name"
                            defaultValue={resource.resource_name}
                            className="form-control"
                            required
                        />
                    </div>

                    <div className="mb-3">
                        <label className="form-label">Resource Type</label>
                        <select
                            name="resource_type_id"
                            defaultValue={resource.resource_type_id}
                            className="form-select"
                            required
                        >
                            <option value="">Select Type</option>
                            {types.map(t => (
                                <option key={t.resource_type_id} value={t.resource_type_id}>
                                    {t.type_name}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="mb-3">
                        <label className="form-label">Building</label>
                        <select
                            name="building_id"
                            defaultValue={resource.building_id}
                            className="form-select"
                            required
                        >
                            <option value="">Select Building</option>
                            {buildings.map(b => (
                                <option key={b.building_id} value={b.building_id}>
                                    {b.building_name} {b.building_number ? `(${b.building_number})` : ''}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="mb-3">
                        <label className="form-label">Floor Number</label>
                        <input
                            name="floor_number"
                            type="number"
                            defaultValue={resource.floor_number ?? ''}
                            className="form-control"
                        />
                    </div>

                    <div className="mb-3">
                        <label className="form-label">Description</label>
                        <textarea
                            name="description"
                            defaultValue={resource.description || ''}
                            className="form-control"
                            rows={3}
                        ></textarea>
                    </div>

                    <div className="d-flex justify-content-end gap-2">
                        <Link href="/resources" className="btn btn-secondary">
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
