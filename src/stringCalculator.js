const add = (numbers) => {
  if (numbers === '') return 0;

  const normalizedNumbers = numbers.replace(/\n/g, ','); // Replace newlines with commas

  const nums = normalizedNumbers.split(',').map((num) => parseInt(num, 10)); // Convert to integers

  return nums.reduce((sum, num) => sum + num, 0); // Add all numbers
};

module.exports = add;
