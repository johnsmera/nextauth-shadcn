export class AuthError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'AuthError';
  }
}

export const signIn = jest.fn();

const mockNextAuth = jest.fn(() => ({
  providers: [],
}));

export default mockNextAuth;

// Mock do módulo providers/google
const mockGoogleProvider = {
  id: 'google',
  name: 'Google',
  type: 'oauth',
  authorization: {
    params: {
      prompt: "consent",
      access_type: "offline",
      response_type: "code",
    },
  },
};

// Mock da função do provedor do Google
const GoogleProvider = jest.fn(() => mockGoogleProvider);

// Exportar o mock do provedor do Google
module.exports = {
  __esModule: true,
  default: GoogleProvider,
}; 