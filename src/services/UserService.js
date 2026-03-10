
const UserRepository = require('../repositories/UserRepository');
const { hashPassword } = require('../utils/hash');

class UserService {
  static async createUser(data) {
    const existing = await UserRepository.findByEmail(data.email);
    if (existing) throw { status: 409, message: 'Email ya registrado' };
    data.password = await hashPassword(data.password);
    const user = await UserRepository.create(data);
    return user;
  }

  static async getAllUsers() {
    const users = await UserRepository.findAll();
    return users.map(u => {
      const obj = u.toObject ? u.toObject() : u;
      delete obj.password;
      return obj;
    });
  }
}

module.exports = UserService;
