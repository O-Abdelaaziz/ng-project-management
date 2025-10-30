export interface Project<T> {
  id: string;
  index?: number;
  uid: string;
  title: string;
  description: string;
  startDate: string;
  endDate: string;
  status: string;
  priority: string;
  budget: number;
  contributors?: string[];
  createdAt: T;
  updatedAt: T;
}
