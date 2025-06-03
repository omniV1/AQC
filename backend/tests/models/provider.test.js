const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');
const Provider = require('../../models/Provider');
const User = require('../../models/User');

describe('Provider Model', () => {
  let mongoServer;

  beforeAll(async () => {
    mongoServer = await MongoMemoryServer.create();
    const mongoUri = mongoServer.getUri();
    await mongoose.connect(mongoUri);
  });

  afterAll(async () => {
    await mongoose.disconnect();
    await mongoServer.stop();
  });

  beforeEach(async () => {
    await Provider.deleteMany({});
    await User.deleteMany({});
  });

  describe('Provider Creation', () => {
    it('should create a provider with valid data', async () => {
      // First create a user
      const user = new User({
        firstName: 'Jane',
        lastName: 'Doe',
        email: 'jane@example.com',
        password: 'password123',
        role: 'doula'
      });
      await user.save();

      const providerData = {
        userId: user._id,
        professionalInfo: {
          certifications: ['DONA_Postpartum_Doula'],
          yearsExperience: 5,
          specialties: ['first_time_parents', 'breastfeeding_support'],
          bio: 'Experienced postpartum doula specializing in breastfeeding support.'
        },
        serviceAreas: ['Phoenix', 'Scottsdale'],
        services: ['postpartum_support', 'breastfeeding_support']
      };

      const provider = new Provider(providerData);
      const savedProvider = await provider.save();

      expect(savedProvider.userId.toString()).toBe(user._id.toString());
      expect(savedProvider.professionalInfo.certifications).toContain('DONA_Postpartum_Doula');
      expect(savedProvider.serviceAreas).toContain('Phoenix');
      expect(savedProvider.status).toBe('pending_approval');
    });

    it('should fail to create provider without required fields', async () => {
      const provider = new Provider({});
      
      await expect(provider.save()).rejects.toThrow();
    });
  });

  describe('Provider Methods', () => {
    let provider;
    let user;
    let clientUser;

    beforeEach(async () => {
      // Create doula user
      user = new User({
        firstName: 'Jane',
        lastName: 'Doe',
        email: 'jane@example.com',
        password: 'password123',
        role: 'doula'
      });
      await user.save();

      // Create client user
      clientUser = new User({
        firstName: 'Client',
        lastName: 'User',
        email: 'client@example.com',
        password: 'password123',
        role: 'client'
      });
      await clientUser.save();

      // Create provider
      provider = new Provider({
        userId: user._id,
        serviceAreas: ['Phoenix'],
        availability: {
          isAcceptingClients: true,
          maxClients: 5
        },
        status: 'active'
      });
      await provider.save();
    });

    it('should add client successfully', async () => {
      await provider.addClient(clientUser._id, 'postpartum');
      
      expect(provider.clients).toHaveLength(1);
      expect(provider.clients[0].clientId.toString()).toBe(clientUser._id.toString());
      expect(provider.clients[0].serviceType).toBe('postpartum');
    });

    it('should not add duplicate clients', async () => {
      await provider.addClient(clientUser._id, 'postpartum');
      
      await expect(provider.addClient(clientUser._id, 'postpartum'))
        .rejects.toThrow('Client already assigned to this provider');
    });

    it('should update client status', async () => {
      await provider.addClient(clientUser._id, 'postpartum');
      await provider.updateClientStatus(clientUser._id, 'completed');
      
      const updatedClient = provider.clients.find(
        client => client.clientId.toString() === clientUser._id.toString()
      );
      expect(updatedClient.status).toBe('completed');
    });

    it('should check if can accept new client', async () => {
      expect(provider.canAcceptNewClient()).toBe(true);
      
      // Set to not accepting
      provider.availability.isAcceptingClients = false;
      expect(provider.canAcceptNewClient()).toBe(false);
      
      // Set back to accepting but max clients reached
      provider.availability.isAcceptingClients = true;
      provider.availability.maxClients = 0;
      expect(provider.canAcceptNewClient()).toBe(false);
    });
  });

  describe('Provider Virtuals', () => {
    it('should calculate current client count correctly', async () => {
      const user = new User({
        firstName: 'Jane',
        lastName: 'Doe',
        email: 'jane@example.com',
        password: 'password123',
        role: 'doula'
      });
      await user.save();

      const provider = new Provider({
        userId: user._id,
        serviceAreas: ['Phoenix'],
        clients: [
          { clientId: new mongoose.Types.ObjectId(), status: 'active' },
          { clientId: new mongoose.Types.ObjectId(), status: 'active' },
          { clientId: new mongoose.Types.ObjectId(), status: 'completed' }
        ]
      });

      expect(provider.currentClientCount).toBe(2);
    });

    it('should determine availability status correctly', async () => {
      const user = new User({
        firstName: 'Jane',
        lastName: 'Doe',
        email: 'jane@example.com',
        password: 'password123',
        role: 'doula'
      });
      await user.save();

      const provider = new Provider({
        userId: user._id,
        serviceAreas: ['Phoenix'],
        availability: {
          isAcceptingClients: true,
          maxClients: 2
        },
        clients: [
          { clientId: new mongoose.Types.ObjectId(), status: 'active' },
          { clientId: new mongoose.Types.ObjectId(), status: 'active' }
        ]
      });

      expect(provider.availabilityStatus).toBe('full');

      provider.availability.isAcceptingClients = false;
      expect(provider.availabilityStatus).toBe('not_accepting');
    });
  });

  describe('Provider Static Methods', () => {
    beforeEach(async () => {
      // Create test providers
      const user1 = new User({
        firstName: 'Provider',
        lastName: 'One',
        email: 'provider1@example.com',
        password: 'password123',
        role: 'doula'
      });
      await user1.save();

      const user2 = new User({
        firstName: 'Provider',
        lastName: 'Two',
        email: 'provider2@example.com',
        password: 'password123',
        role: 'doula'
      });
      await user2.save();

      const provider1 = new Provider({
        userId: user1._id,
        serviceAreas: ['Phoenix'],
        availability: { isAcceptingClients: true },
        status: 'active',
        professionalInfo: {
          specialties: ['first_time_parents']
        }
      });
      await provider1.save();

      const provider2 = new Provider({
        userId: user2._id,
        serviceAreas: ['Scottsdale'],
        availability: { isAcceptingClients: false },
        status: 'active',
        professionalInfo: {
          specialties: ['breastfeeding_support']
        }
      });
      await provider2.save();
    });

    it('should find available providers in area', async () => {
      const providers = await Provider.findAvailableInArea('Phoenix');
      expect(providers).toHaveLength(1);
      expect(providers[0].serviceAreas).toContain('Phoenix');
      expect(providers[0].availability.isAcceptingClients).toBe(true);
    });

    it('should find providers by specialty', async () => {
      const providers = await Provider.findBySpecialty('first_time_parents');
      expect(providers).toHaveLength(1);
      expect(providers[0].professionalInfo.specialties).toContain('first_time_parents');
    });
  });
}); 