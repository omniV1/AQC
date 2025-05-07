interface SupportSessionDTO {
  id: number;
  providerId: number;
  providerFirstName: string;
  providerLastName: string;
  startTime: string;
  endTime: string;
  status: string;
  notes: string;
  location: string;
}

interface CreateSupportSessionRequest {
  providerId: number;
  startTime: string;
  endTime: string;
  notes: string;
  location: string;
}

interface SupportSession {
  id: number;
  provider: {
    id: number;
    firstName: string;
    lastName: string;
  };
  startTime: string;
  endTime: string;
  status: string;
  notes: string;
  location: string;
}

const BASE_URL = '/api/v1/appointments';

const convertDTOToSupportSession = (dto: SupportSessionDTO): SupportSession => ({
  id: dto.id,
  provider: {
    id: dto.providerId,
    firstName: dto.providerFirstName,
    lastName: dto.providerLastName
  },
  startTime: dto.startTime,
  endTime: dto.endTime,
  status: dto.status,
  notes: dto.notes,
  location: dto.location
});

export const appointmentService = {
  async getAll(): Promise<SupportSession[]> {
    const response = await fetch(BASE_URL, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    });

    if (!response.ok) {
      throw new Error('Failed to fetch support sessions');
    }

    const data = await response.json();
    return data.map(convertDTOToSupportSession);
  },

  async create(sessionData: CreateSupportSessionRequest): Promise<SupportSession> {
    const response = await fetch(BASE_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      },
      body: JSON.stringify(sessionData)
    });

    if (!response.ok) {
      throw new Error('Failed to create support session');
    }

    const data = await response.json();
    return convertDTOToSupportSession(data);
  },

  async updateStatus(id: number, status: string): Promise<SupportSession> {
    const response = await fetch(`${BASE_URL}/${id}/status`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      },
      body: JSON.stringify({ status })
    });

    if (!response.ok) {
      throw new Error('Failed to update support session status');
    }

    const data = await response.json();
    return convertDTOToSupportSession(data);
  },

  async getByDateRange(start: Date, end: Date): Promise<SupportSession[]> {
    const response = await fetch(
      `${BASE_URL}/range?start=${start.toISOString()}&end=${end.toISOString()}`,
      {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      }
    );

    if (!response.ok) {
      throw new Error('Failed to fetch support sessions by date range');
    }

    const data = await response.json();
    return data.map(convertDTOToSupportSession);
  }
}; 