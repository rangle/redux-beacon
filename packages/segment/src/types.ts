export interface Traits {
  address?: {
    city?: string;
    country?: string;
    postalCode?: string;
    state?: string;
    street?: string;
  };
  age?: number;
  avatar?: string;
  birthday?: string;
  company?: {
    name?: string;
    id?: string | number;
    industry?: string;
    employee_count?: number;
    plan?: string;
  };
  createdAt?: string;
  description?: string;
  email?: string;
  firstName?: string;
  gender?: string;
  id?: string;
  lastName?: string;
  name?: string;
  phone?: string;
  title?: string;
  username?: string;
  website?: string;
}
