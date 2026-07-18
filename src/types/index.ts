export type UserRole = 'patient' | 'receptionist' | 'doctor' | 'hospital_admin' | 'super_admin';

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
}
