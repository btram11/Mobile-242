import bcrypt from 'bcrypt';
async function test(password) {
  const hash = await bcrypt.hash(password, 12);
  console.log(hash);
}

test('111111');
