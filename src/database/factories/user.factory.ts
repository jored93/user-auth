import { faker } from '@faker-js/faker';
import { define } from 'typeorm-seeding';
import { User } from '@entities/user.entity';

define(User, () => {
  const firstName = faker.name.firstName();
  const lastName = faker.name.lastName();
  const username = faker.random.word();
  const email = faker.internet.email(firstName, lastName);
  const password = faker.internet.password(8);

  const user = new User();
  user.firstName = firstName;
  user.lastName = lastName;
  user.username = username;
  user.email = email;
  user.password = password;

  return user;
});
