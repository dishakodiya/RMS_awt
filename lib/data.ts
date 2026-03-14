export interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  createdAt: string;
}

export interface ResourceType {
  id: string;
  name: string;
  description: string;
}

export interface Building {
  id: string;
  name: string;
  buildingNumber: string;
  totalFloors: number;
}

export interface Resource {
  id: string;
  name: string;
  resourceTypeId: string;
  buildingId: string;
  floorNumber: number;
  description: string;
}

export interface Facility {
  id: string;
  name: string;
  details: string;
  resourceId: string;
}

export interface Booking {
  id: string;
  resourceId: string;
  userId: string;
  startDateTime: string;
  endDateTime: string;
  status: 'Pending' | 'Approved' | 'Rejected';
  approverId: string | null;
  createdAt: string;
}

export interface Maintenance {
  id: string;
  resourceId: string;
  maintenanceType: string;
  scheduledDate: string;
  status: 'Scheduled' | 'In Progress' | 'Completed';
  // status:string;
  notes: string;
}

export interface Cupboard {
  id: string;
  name: string;
  resourceLocation: string;
  totalShelves: number;
}

export interface Shelf {
  id: string;
  shelfNumber: number;
  capacity: number;
  description: string;
  cupboardId: string;
}
