
import { prisma } from '@/lib/prisma'
import { updateBuilding } from '../../actions'
import { redirect } from 'next/navigation'
import Link from 'next/link'

export default async function EditBuildingPage({ params }: { params: { id: string } }) {
    const { id } = await params

    const building = await prisma.buildings.findUnique({
        where: { building_id: Number(id) },
    })

    if (!building) {
        redirect('/buildings')
    }

    const updateAction = updateBuilding.bind(null, building.building_id)

    return (
        <div className="container py-4" style={{ maxWidth: '600px' }}>
            <div className="page-header">
                <h1>Edit Building</h1>
            </div>

            <form action={updateAction} className="card">
                <div className="card-body">
                    <div className="mb-3">
                        <label className="form-label">Building Name</label>
                        <input
                            name="building_name"
                            defaultValue={building.building_name}
                            className="form-control"
                            required
                        />
                    </div>

                    <div className="mb-3">
                        <label className="form-label">Building Number</label>
                        <input
                            name="building_number"
                            defaultValue={building.building_number || ''}
                            className="form-control"
                        />
                    </div>

                    <div className="mb-3">
                        <label className="form-label">Total Floors</label>
                        <input
                            name="total_floors"
                            type="number"
                            defaultValue={building.total_floors || ''}
                            className="form-control"
                        />
                    </div>

                    <div className="d-flex justify-content-end gap-2">
                        <Link href="/buildings" className="btn btn-secondary">
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
