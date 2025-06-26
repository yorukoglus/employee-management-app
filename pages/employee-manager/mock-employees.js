// 200 mock employees for demo purposes
export const mockEmployees = Array.from({ length: 200 }, (_, i) => {
  const id = i + 1;
  const firstNames = ['Alice', 'Bob', 'Carol', 'David', 'Eva', 'Frank', 'Grace', 'Helen', 'Ivan', 'Julia', 'Ken', 'Lara', 'Mike', 'Nina', 'Oscar', 'Paula', 'Quinn', 'Rita', 'Sam', 'Tina'];
  const lastNames = ['Smith', 'Johnson', 'Lee', 'Kim', 'Brown', 'Williams', 'Jones', 'Garcia', 'Martinez', 'Davis', 'Clark', 'Lewis', 'Walker', 'Hall', 'Allen', 'Young', 'King', 'Wright', 'Scott', 'Green'];
  const departments = ['Analytics', 'Tech'];
  const positions = ['Junior', 'Medior', 'Senior'];
  const firstName = firstNames[i % firstNames.length];
  const lastName = lastNames[Math.floor(i / firstNames.length) % lastNames.length];
  const department = departments[i % departments.length];
  const position = positions[i % positions.length];
  const email = `${firstName.toLowerCase()}.${lastName.toLowerCase()}${id}@company.com`;
  const dateOfEmployment = `2022-${String((i % 12) + 1).padStart(2, '0')}-${String((i % 28) + 1).padStart(2, '0')}`;
  const dateOfBirth = `199${i % 10}-0${(i % 9) + 1}-1${i % 9}`;
  const phoneNumber = `+90 532 123 ${String(4500 + i).padStart(4, '0')}`;
  return {
    id,
    name: `${firstName} ${lastName}`,
    firstName,
    lastName,
    department,
    email,
    dateOfEmployment,
    dateOfBirth,
    phoneNumber,
    position,
  };
}); 