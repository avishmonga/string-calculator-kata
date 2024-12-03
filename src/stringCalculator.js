const add = (numbers) => {
  if (numbers === '') return 0;

  let delimiter = ','; // Default delimiter

  let numberString = numbers; // Original numbers string

  // Check for custom delimiter syntax at the beginning
  if (numbers.startsWith('//')) {
    const parts = numbers.split('\n', 2); // Split into delimiter part and the rest
    delimiter = parts[0].substring(2); // Extract delimiter after "//"
    numberString = parts[1]; // Rest of the numbers string
  }
  const normalizedNumbers = numberString.replace(/\n/g, delimiter); // Replace newlines with delimiter

  const nums = normalizedNumbers
    .split(delimiter)
    .map((num) => parseInt(num, 10)); // Convert to integers

  // Check for negatives
  const negatives = nums.filter((num) => num < 0);

  if (negatives.length > 0) {
    throw new Error(`negative numbers not allowed: ${negatives.join(', ')}`);
  }

  return nums.reduce((sum, num) => sum + num, 0); // Add all numbers
};

module.exports = add;
